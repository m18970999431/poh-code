import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  
  // countMap用法
  // 获得某个对象总数 countMap[className]
  // 获得某个对象某个字段总和 countMap[className:fieldName]
  // 按某字段分组后，获得某个对象某个字段总和 countMap[className:fieldName:groupId]
  countMap = {}

  // countMap用法
  // 获得某个对象数组 objectMap[className]
  objectMap = {}


  constructor() { 

  }

  ngOnInit() {
    this.loadCount("VolunteerProfile")
    this.loadCount("Activity") // 加载

     // 根据activity分组，加载所有ActivityRegister服务记录的serviceTime总和
    this.loadColumnSum("ActivityRegister",'serviceTime',"activity").then(()=>{
      this.loadObjectData("Activity").then(()=>{
        this.showActivityPie()
      })
    })
  }

  loadCount(className){
    let query = new Parse.Query(className)
    return query.count().then(data=>{
      this.countMap[className] = data
    })
  }
  loadColumnSum(className,fieldName,groupBy="objectId"){
    let that = this
    let querySum = new Parse.Query(className)

    let pipeline = [
      { group: { objectId: `$${groupBy}`, total: { $sum: `$${fieldName}` } } }
    ];

    querySum = new Parse.Query(className);
    return (<any>(querySum.aggregate(pipeline))).then(function(results) {
      let total = 0
      console.log("sum")
      console.log(results)
      results.forEach(data=>{
        total += data.total
        that.countMap[`${className}:${fieldName}:${data.objectId}`] = data.total
      })

      that.countMap[`${className}:${fieldName}`] = total
      })
  }
  
  @ViewChild('activityPie',{static:true}) activityPie: ElementRef;
  loadObjectData(className){
    let query = new Parse.Query(className)
    // return new Promise((res,rej)=>{
      return query.find().then(data=>{
      this.objectMap[className] = data
      // res(data)
    })
  //   .catch(err=>{rej(err)})
  // })
  }
  showActivityPie(){
    let activityPie = (<any>echarts).init(this.activityPie.nativeElement,'light');
    let data = this.objectMap["Activity"].map(item=>{return {
      name:item.get("title"),
      value:this.countMap["ActivityRegister:serviceTime:"+item.id],
      color: item.get("color")||"cyan"
    }
  })
    let legend = data.map(item=>item.title)
  console.log(data)
  console.log(legend)
    let option = {
          title : {
            text: '志愿活动总体情况概览',
            subtext: '2017-至今',
            x:'center'
          },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                bottom: '0%',
                data: legend
            },
            series: [
                {
                    name:'服务时长',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
        
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                      {name:"总时长",value:this.countMap["ActivityRegister:serviceTime"],selected:false}
                    ]
                },
                {
                    name:'服务时长',
                    type:'pie',
                    radius: ['40%', '65%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}小时  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data:data
                }
            ]
        };
        activityPie.setOption(option);
  }
}
