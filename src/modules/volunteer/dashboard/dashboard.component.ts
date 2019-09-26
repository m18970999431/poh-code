import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';

import "dhtmlx-scheduler";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("scheduler_here",{static:true}) schedulerContainer: ElementRef;
  activities:Array<any>
  registers:Array<any>
  activity:any; // 当前事件相关活动
  period:any; // 当前事件时间段
  start_date:any; // 当前事件开始时间
  weekends= ["周日","周一","周二","周三","周四","周五","周六"];
  ampm= {
    8: "上午", 9: "上午", 10: "上午", 11: "上午", 12: "上午",
    13: "下午", 14: "下午", 15: "下午", 16: "下午", 17: "下午", 18: "下午"
  };
  eventsData = [
      // {id: 2, start_date: "2017-09-03 00:00", end_date: "2017-09-03 13:00", text: "Event 2"},
  ];
  today = new Date()
  periodDetailModal = false;

  constructor() { }

  ngOnInit() {
    this.getActivityRegister().then(()=>{

    })
    this.getActivityData().then(()=>{
      this.loadEventsData()
    })
  }
  getActivityRegister(){
    return new Promise((res,rej)=>{
      let query = new Parse.Query("ActivityRegister");
      query.notEqualTo("isDeleted",true)
      query.include("user")
      let today = new Date();
      let thismonday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-(today.getDay()==0?7:today.getDay())+1,0,0,0);
      console.log("thismonday")
      console.log(thismonday)
      query.greaterThanOrEqualTo("startDate", thismonday);
      query.include("activity")
      query.find().then(data=>{
        console.log("registers")
        console.log(data)
        this.registers = data.sort((a,b)=> (a.id > b.id)?-1:1 )
        res(data)
      }).catch(err=>{
        rej(err)
      })
    })
  }
  loadRegistersData(){
    return this.registers.filter(item=>{
      let sameActivity = item.get("activity").id == this.activity.id;
      let sameDate =  item.get("startDate").getDate() == this.start_date.getDate();
      let sameHours =  item.get("startDate").getHours() == this.start_date.getHours();
      if(sameActivity&&sameDate&&sameHours){
        return item
      }
    }) || []
  }
  loadEventsData(){
    // https://docs.dhtmlx.com/scheduler/
    // 设置每日时间段
    scheduler.config.first_hour =7;
    scheduler.config.last_hour = 20;


    // 设置事件内容区域
    scheduler.templates.event_text = function(start,end,ev){
      return `项目名称：${ev.activity?ev.activity.get("title"):ev.text} <br>
              人数限制：${ev.period?ev.period.peopleMax:""} <br>
      `;
    };

    // 隐藏事件操作区域
    // https://docs.dhtmlx.com/scheduler/customizing_edit_select_bars.html
    scheduler.config.icons_select = []

    // 拦截日历交互事件
    scheduler.config.edit_on_create = false; // 关闭编辑及创建事件
    scheduler.showLightbox = function(id) {
      return true;
      // scheduler.startLightbox(id, document.getElementById("my_form"));
  };

    // scheduler.attachEvent("onClick", this.openPeriodDetail);
    (<any>scheduler).rootComponent = this;
   
    scheduler.attachEvent("onClick", function (id, e){ // 自定义双击事件
      //any custom logic here
      (<any>scheduler).rootComponent.openPeriodDetail(id);
      return true;
});
    scheduler.attachEvent("onDblClick", function (id, e){ // 自定义双击事件
          //any custom logic here
          console.log("onDblClick")
          return true;
    });

    // 渲染日历事件
    scheduler.init(this.schedulerContainer.nativeElement, this.today, "week");
    scheduler.parse(this.eventsData, "json");
    
  }
  openPeriodDetail(id){
    console.log(id)
    let activity = scheduler.getEvent(id).activity
    let period = scheduler.getEvent(id).period
    let start_date = scheduler.getEvent(id).start_date
    this.activity = activity;
    this.period = period;
    this.start_date = start_date;
    this.periodDetailModal = true
 
  }
  closePeriodDetail(){
    this.periodDetailModal = false
  }
  getActivityData(){
    return new Promise((res,rej)=>{
      let query = new Parse.Query("Activity");
      query.equalTo("isEnabled",true)
      query.find().then(data=>{
        this.activities = data
        this.activities.forEach(act=>{
          // 获取周期性活动开展时段，封装成Event
          if(act.get("cycle") == "weekly"){
            act.get("servicePeriodArray").forEach(period=>{

              // 本周事件渲染
              let start_date = new Date(
                this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - (this.today.getDay()?this.today.getDay():7) + Number(period.day),
                new Date(period.timeFrom).getHours(), new Date(period.timeFrom).getMinutes(),0
              );
              let end_date = new Date(
                this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - (this.today.getDay()?this.today.getDay():7) + Number(period.day),
                new Date(period.timeTo).getHours(), new Date(period.timeTo).getMinutes(),0
              );

              let event = {
                id: act.id+period.day+new Date(period.timeFrom).getHours(),
                start_date: start_date,
                end_date: end_date,
                text:act.get("title"),
                activity: act,
                period: period,
                color:act.get("color")
              }

              this.eventsData.push(event)

              // 下周事件渲染
              let next_start_date = new Date(start_date.toString());next_start_date.setDate(next_start_date.getDate()+7);
              let next_end_date = new Date(end_date.toString());next_end_date.setDate(next_end_date.getDate()+7);

              let next_event = {
                id: "next"+act.id+period.day+new Date(period.timeFrom).getHours(),
                start_date: next_start_date,
                end_date: next_end_date,
                text:act.get("title"),
                activity: act,
                period: period,
                color:act.get("color")
              }

              this.eventsData.push(next_event)


            })
          }
        })
        res()
      }).catch(err=>{
        rej()
      })
    })
  }
  // Register编辑区域
  toggleSwitch(ev,obj,key){
    obj.set(key, ev) // ev即switch组件切换后的值
    obj.save()
  }
  startEdit(obj,key, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = obj.id+key;
    this.editKey = key
    this.editData = obj.get(key)
    this.editObj = obj
  }
  editId: string | null;
  editKey:any;
  editData: any;
  editObj: any;
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editObj.set(this.editKey,this.editData)
      this.editObj.save().then(()=>{
        this.loadRegistersData()
      })
      this.editId = null;
      this.editKey = null;
      this.editData = null;
      this.editObj = null;
    }
  }
  

}

