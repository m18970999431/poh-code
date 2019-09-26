import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// 云数据相关依赖
import { Cloud } from '../../../providers/cloud';

// Ant 相关依赖
import { NzNotificationService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

// CDK Table 相关依赖
// import { MatTableDataSource } from '@angular/material';
// import { MatPaginator } from '@angular/material';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { from } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import {Sort} from '@angular/material';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { StringifyOptions } from 'querystring';

// 全局服务
import { AppService } from '../../../app/app.service';
import { equal } from 'assert';

// Amap
import { AmapPlaceSearchService, AmapPlaceSearchWrapper } from 'ngx-amap';
@Component({
  selector: 'common-list',
  templateUrl: 'common-list-page.html',
  styleUrls: ['./common-list-page.scss']
})
export class CommonListPage implements OnInit {
  // 未处理方法
  alertCtrl:any
  modalCtrl:any
  nav:any
  navParams:any={}
  // 整体配置属性

  // 表格配置属性
  pageIndex:Number = 1
  pageIndexChanged(ev){
    if(ev != 1){
      let url = location.href.replace(/;{0,1}pageIndex=[0-9]{1,3};{0,1}/g,"")+";pageIndex="+ev
      history.pushState({},"",url)
    }
  }

  // 控制
  typeSelected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  keySelected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  // 删除deleteModal相关变量
  isVisibleDeleteModal = false;
  showDeleteModal(object){
    this.modalService.confirm({
      nzTitle: `删除${this.Schema?this.Schema.name:""}`,
      nzContent: `<b style="color: red;">你确定要删除该${this.Schema?this.Schema.name:""}及其相关信息吗？</b>`,
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => this.dataSource.destroy(object),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deleteModalCanceled(ev){
    this.isVisibleDeleteModal = false
  }
  deleteModalOK(ev){
    this.save()
  }

  // 地图Amap相关函数变量 https://xieziyu.github.io/ngx-amap/#/home
  isVisibleAmap = false;
  amapInput = "";
  poiData:any = {};
  private _subscription: Subscription;
  private plugin: Promise<AmapPlaceSearchWrapper>;

  onMapReady(map) {
    // 构造地点查询 wrapper promise:
    this.plugin = this.amapPlaceSearch.of({
      pageSize: 5,
      pageIndex: 1,
      // city: '010', // 城市
      // type:'餐饮服务',//类别，可以以|后面加其他类
      map: map,
      panel: "panel", // 结果列表将在此容器中进行展示。
      autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });

    this.plugin.then(placeSearch => {
      this._subscription = placeSearch.on('complete').subscribe(event => console.log('PlaceSearch event: "complete"', event));
      this._subscription.add(placeSearch.on('selectChanged').subscribe(event => {
        this.poiData = event.selected.data
        console.log('PlaceSearch event: "selectChanged"', this.poiData)
      }
        ));
    })

    // this.plugin.then(placeSearch => placeSearch.search('南昌 万达'))
    // .then(data => {
    //   console.log('南昌 万达');
    //   console.log('status:', data.status);
    //   console.log('result:', data.result);
    // });
  }
  searchAmap(){
    this.plugin.then(placeSearch => placeSearch.search(this.amapInput)).then(() => {});
  }
  showModalAmap(): void {
    if(this.object.location){
      this.amapInput = this.object.address;
      this.plugin.then(placeSearch => placeSearch.search(this.object.address)).then(() => {});
    }else{
      this.amapInput = ''
      this.poiData = {}
    }
    this.isVisibleAmap = true;
  }

  handleOkAmap(): void {
    console.log('click ok');
    if(this.poiData!={} && this.amapInput != ""){
      let point = new Parse.GeoPoint({latitude: this.poiData.location.lat, longitude: this.poiData.location.lng});
      this.object.location = point
      // this.object.address = this.poiData.address + this.poiData.name
      this.object.address = this.poiData.name
    }

    this.isVisibleAmap = false;
    this.amapInput = ''
    this.poiData = {}
  }

  handleCancelAmap(): void {
    this.isVisibleAmap = false;
    this.amapInput = ''
    this.poiData = {}
  }

  
  // 编辑editModal相关变量
  isVisibleEditModal = false;

  fileds:Array<any>
  object: any = {} // 当前对象的toJSON内容
  current: any; // 当前编辑的ParseObject实例对象

  hasCurrent: Boolean = false;
  now:Date;
  // @editModal when 
  selectedDateRange:any={} // key值为：<objectId.key>
  onDateRangePickerChange(ev,object,key){
    object[key] = {}
    object[key].from = ev[0]
    object[key].to = ev[1]
  }

  // @editModal when period-from-to
  weekdays = [{label:"周一",value:"1"},{label:"周二",value:"2"},{label:"周三",value:"3"},{label:"周四",value:"4"},{label:"周五",value:"5"},{label:"周六",value:"6"},{label:"周日",value:"7"}]
  addPeriod(object,key){
    if(!object[key]){ object[key] = []}
    // object[key].push({
    //   day:"1",
    //   timeFrom:new Date(),
    //   timeTo:new Date(),
    //   peopleMax:0
    // })
    object[key].push({
      day:null,
      timeFrom:null,
      timeTo:null,
      peopleMax:null
    })
  }

  // @editModal when type == Pointer 
  // selectedPointer:any = {} // 用于Pointer选项暂存，key为<objectId.key>
  selectPointerList:Array<any> = [] // 用于Pointer选项暂存，key为<objectId.key>
  getPobject(){
    let query = new Parse.Query(this.dataSource.PclassName)
    query.equalTo("objectId",this.dataSource.PobjectId)

    // 获得该指针对象所有需要include的字段
    let schema = this.cloud.schemas[this.dataSource.PclassName]
    if(schema.fields){
      Object.keys(schema.fields).forEach(key=>{
        let targetClass = schema.fields[key].targetClass
        if(targetClass){
          query.include(key)
        }
      })
    }

    query.first().then(data=>{
      this.dataSource.Pobject = data
    })
  }
  // Start of edit-survey-options
  setCheck(options, i, value:Boolean){
    options.forEach(opt=> opt.check = false)
    options[i].check = value
  }
  deleteOption(options, i){
    if(options.length > 1){
      options.splice(i,1)
    }
  }
  addOption(options){
    if(options.length <= 7){
      options.push({ check: false, value: "请填写内容" })
    }
  }
  getItemNum(i){
    let NumMap = ["A","B","C","D","E","F","G","H","I","J","K"]
    return NumMap[i]
  }
  // End of edit-survey-options
  searchPointer(key){
    let className = this.fields[key].targetClass
    let schema = this.cloud.schemas[className]

    let query = new Parse.Query(className)
    if(schema.fields){
      Object.keys(schema.fields).forEach(key=>{
        let targetClass = schema.fields[key].targetClass
        if(targetClass){
          query.include(key)
        }
      })
    }
    
    // 预设限定查询对象类型
    if(this.Schema.fields[key].targetType){
      query.equalTo("type",this.Schema.fields[key].targetType)
    }
    if (this.dataSource.type) {
      query.equalTo("type",this.dataSource.type)
    }

    // 所有对象限制为当前公司账套
    let company = this.appServ.company
    if(company){
      query.equalTo("company",{"__type":"Pointer","className":"Company","objectId":company})
    }

    query.find().then(data=>{
      this.selectPointerList = data
      console.log(data)
      console.log(this.selectPointerList)

    })
  }
  showEditModal(object?,parent?){
    console.log("object666",object)
    this.isVisibleEditModal = true;
    this.now = new Date()
    this.Class = Parse.Object.extend(this.Schema.className);

    /* 检测传递参数是否存在
    ** 若存在，设置编辑对象为已存在对象，进入编辑对象
    ** 若不存在，创建新对象，进入新建对象
    */
   if (object&&object.id) { //处理已有对象
      this.object = object.toJSON();
      this.current = object;
      this.hasCurrent = true
    
      this.selectedDateRange = {};
      this.fieldsKeys.forEach(key=>{
          if(this.current.get(key)){
            // 矫正参数携带的对象为Pointer指针形式
            if(this.Schema.fields[key].type == "Pointer"){
              this.object[key] = this.current.get(key)
            }
            // 矫正参数携带的对象为Date类型
            if(this.Schema.fields[key].type == "Date"){
              this.object[key] = new Date(this.current.get(key))
            }
            // 矫正参数为date-from-to的对象
            if(this.Schema.fields[key].view == "date-from-to"){
              let from = this.current.get(key).from || ""
              let to = this.current.get(key).to || ""
              this.selectedDateRange[key] = [from,to]
            }
            // 矫正参数为period-from-to的对象
            if(this.Schema.fields[key].view == "period-from-to"){
              this.object[key].forEach(period=>{
                if(period.timeFrom){
                  period.timeFrom = new Date(period.timeFrom.iso)
                }
                if(period.timeTo){
                  period.timeTo = new Date(period.timeTo.iso)
                }
              })
            }
          }
      })

    } else { //初始化新增对象
      this.current = new this.Class;
      this.object = this.current.toJSON()
      this.hasCurrent = false
    }

    // 设置同一个Schema的不同Type
    // if(this.params.get("type")){
    //       this.object["type"] = this.params.get("type");          
    // }

    this.fieldsKeys.filter(key => {
      // 如果筛选指针对象存在则赋值
      if(this.dataSource.Pobject){
        if(this.Schema.fields[key].targetClass == this.dataSource.PclassName){
          this.object[key] = this.dataSource.Pobject;
        }
      }

      // 当有父级参数则设置parent
      if(parent){
        if(key == "parent"){
          this.object[key] = parent;
        }
      }

      // 检查各列，若不存在值，则设置默认值
      if ((this.Schema.fields[key].default || this.Schema.fields[key].default == 0) && !this.object[key]) {
        this.object[key] = this.Schema.fields[key].default;
      }

      // 处理时间日期对象数值
      if (this.Schema.fields[key].view == "datetime") {
        if (this.object[key]) {
          this.object[key] = String(this.object[key].iso).substr(0, 19);
        }
      }
    });


  }

  editModalCanceled(){
    this.object = {}
    this.isVisibleEditModal = false
  }
  editModalOK(){
    this.save()
  }
  checkShow(show) {
    if (show!=false) {
      return true
    } else {
      return false
    }
  }
  checkView(view) {
    if (view) {
      return view
    } else {
      return "default"
    }
  }
  save(){
    let verified = true

    this.fieldsKeys.filter(key => {
      if (this.Schema.fields[key].required && this.Schema.fields[key].required == true) {
        if (this.object[key] == "" || this.object[key] == undefined) {
          console.log("Field not exists.")
          verified = false
        }
      }
      if (this.Schema.fields[key].type == "Number") {
        if (isNaN(this.object[key])) {
          this.object[key] = 0
        }
        this.object[key] = Number(this.object[key])
      }
      if (this.Schema.fields[key].view == "datetime") {
        if (this.object[key]) {
          this.object[key] = new Date(this.object[key]);
        }
      }
      if (this.object[key] && this.Schema.fields[key].type == "Pointer") {
        console.log("Pointer Fields:", this.object[key])
        let pid = this.object[key].id || this.object[key].objectId
        if (!(this.object[key].id || this.object[key].objectId)) {
          pid = this.current.get(key).id
        }
        this.object[key] = {
          "__type": "Pointer",
          "className": this.Schema.fields[key].targetClass,
          "objectId": pid
        }
        console.log(this.object[key])
      }
    });
    // 若存在公司，设置该对象所属公司字段指针值
    if(this.className != "Company"){
      let company = this.appServ.company
      if(company&&this.className!="User"){
        this.object["company"] = {"__type":"Pointer","className":"Company","objectId": company}
      }else{
        this.object["company"] = [{"__type":"Pointer","className":"Company","objectId": company}]
      }
    }

    // 添加对象预设限定条件
    if(this.dataSource.equalTo){
      Object.keys(this.dataSource.equalTo).forEach(key=>{
        this.object[key] = this.dataSource.equalTo[key]
      })
    }

    // 若有列表筛选指针，则默认字段为该指针值
    if(this.dataSource.PclassName){
      this.object[this.dataSource.PfiledsKey] = {
        "__type":"Pointer",
        "className":this.dataSource.PclassName,
        "objectId":this.dataSource.PobjectId
      }
    }
    // 当对象类为User去除密码字段
    if(this.className=="User"){
      delete this.object.password
    }

    // _Role Start: 当对象类为Role拼接角色编码
    if(this.className=="_Role"){
      // 拼接角色编码
      this.object["name"] = `${this.appServ.company}_${this.object["title"]}`
      // 设置角色ACL
      this.object["ACL"] = {}
      this.object["ACL"]["*"] = { // 公共可读
        "read": true
      }
      this.object["ACL"][`${this.appServ.company}_admin`] = { // 公司超管可写
        "read": true,
        "write": true
      }
    }
    // _Role End

    // 清除异常字段
    delete this.object["undefined"]

    // 设置对象参数并保存对象
    this.current.set(this.object)
    console.log(this.current)

    if (verified) {
      this.current.save().then(data => {
        data.fetch().then(data => {
          // console.log("OK save:", data)
          this.current = data
          this.isVisibleEditModal = false
          this.reset()
        })
      }).catch(err => {
        // console.log("Error save:", err)
        this.notification.create(
          "error",
          '保存出错',
          err.message?err.message:"保存出错"
        );
      })
    } else {
      this.notification.create(
        "warning",
        '信息填写不完整',
        "请检查填写字段是否符合要求。"
      );
    }
  }


  // 对象集合属性
  schemaName:string;
  className:string;
  Class: any;
  Schema: any;
  fields:Array<any>;
  fieldsKeys: Array<any>;
  objs: Array<any> = []; // 实例化对象列表
  typeName:any = {};
  displayedOperators:any = []; // List 页面显示操作功能按钮列表
  displayedColumns:any = []; // List 页面显示字段列表
  allColumns:any = []; // 包含第一列、最后一列

  // CDK Table 相关属性方法
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('filter',{static:true}) filter: ElementRef;

  dataSource: ParseDataSource | null;

  ngOnInit() {
    // 准备搜索框监测时间
    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(debounceTime(300))
    .pipe(distinctUntilChanged())
    .subscribe(() => {
      // console.log(this.filter.nativeElement.value)
      if (!this.dataSource) { return; }
      this.dataSource.searchText = this.filter.nativeElement.value;
      // this.dataSource.searchColName = this.searchColName;
      this.dataSource.refresh()
    });
  }

  // 分类及筛选属性及方法
  searchText:string
  searchColName:string=""
  typeChange(ev){
    // console.log(ev)
    this.dataSource.type = ev.value;
    this.dataSource.refresh()
  }

  currentBook:any // 所属书籍/章节，ArticleBook
  book:any
  chapter:any
  page:any
  classSelectComponent:any = "class-select"

  bookTypes:any = {
    book:"书籍",
    chapter:"章节",
    page:"小节"
  }

  search(){
    this.refreshList()
  }
  reset(){
    // 重置筛选信息
    this.book = undefined
    this.chapter = undefined
    this.page = undefined
    this.currentBook = undefined
    // this.type = undefined
    // 重置头部排序
    this.sortState = {}
    this.dataSource.sortState = {}
    // 重置输入框
    // this.searchColName = undefined
    this.searchText = ""
    // this.refreshList()
    this.dataSource.type = undefined
    this.dataSource.searchColName = undefined
    this.dataSource.searchText = undefined
    this.dataSource.refresh()
  }

  // 功能页面属性
  detailPage:any = "class-detail-page" // 对象查看/详情页面
  detailTitle:any = "详情" // 对象查看/详情页面
  editPage:any = "class-edit" // 对象编辑页面

  // 对象选择操作属性及方法
  selectList: any = {};
  selectObject(obj) {
    if (this.selectList[obj.id]) {
      delete this.selectList[obj.id]
    } else {
      this.selectList[obj.id] = obj
    }
  }

  selectAll(objs) {
    if (!this.isSelectedAll(objs)) {
      this.objs.forEach(data => {
        this.selectList[data.id] = data
      })
    } else {
      this.selectList = {}
    }
  }

  isSelectedAll(objs) {
    if (objs && this.selectList) {
      let l1 = objs.length
      let l2 = Object.keys(this.selectList).length
      if (l1 == l2) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  // 操作菜单功能属性及方法
  operatorChange(operator,obj){
    switch (operator){
      case "detail": 
        this.detail({
          PclassName:obj.className,
          PobjectId:obj.id,
        })
      break;
      case "edit": 
        this.showEditModal(obj)
        // this.presentEditModal(obj.get('type'),obj,false)
      break;
      case "delete": 
        this.showDeleteModal(obj)
        // this.presentDeleteConfirm(obj)
      break;
      case "newchild": 
        this.showEditModal(undefined,obj)
        // this.presentEditModal(obj.get('type'),obj,false)
      break;
    }
  }

  // 表头排序操作
  sortState:any = {}
  sortData(key, ev) {
    console.log(ev)
    if(this.sortState[key]=="descend"){
      this.sortState[key] = ""
      this.dataSource.sortState = this.sortState
      return
    }

    if(this.sortState[key]=="ascend"){
      this.sortState[key] = "descend"
    }

    if (!this.sortState[key] || this.sortState[key] == '') {
      this.sortState[key] = "ascend"
    }
    this.dataSource.sortState = this.sortState
    this.dataSource.refresh()
  }

  // 滚动加载属性
  isNeedInfiniteScroll:boolean = true
  limit:number = 15


  constructor(private cloud:Cloud, 
    public appServ: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private amapPlaceSearch: AmapPlaceSearchService
    ) {
    
      combineLatest(this.route.paramMap,this.route.queryParamMap).subscribe(data=>{
        let params = data[0]
        let queryParams = data[1]
        /* 路由可得参数详解
         ** 路由参数
         schemaName，当前操作类名
         PclassName，筛选条件，所属对象指针类名
         PobjectId，筛选条件，所属对象指针ID值
         ** 限定条件
         equalTo，限制所操作数据与字段相等，如equalTo:{type:"project"}表示所有type为project字段
         ** Schema参数
         detailPage，指定详情页面，不填则使用common-detail
         detailTitle，指定详情按钮名称
         editPage，指定编辑页面，不填则使用common-edit
        */
    
        // 0.1.初始化对象类，及Schema结构
        let className = params.get("schemaName")
        if(className){
          this.className = className;
          this.Class = Parse.Object.extend(this.className);
          this.Schema = this.cloud.schemas[this.className];
        }
    
        if(this.Schema){
          if(this.Schema.typeName){
          this.typeName = this.Schema.typeName
          }
          this.fields = this.Schema.fields;
          this.fieldsKeys = Object.keys(this.Schema.fields);
          this.displayedColumns = this.Schema.displayedColumns;
          this.displayedOperators = this.Schema.displayedOperators;
          this.allColumns = ['check'].concat(this.Schema.displayedColumns.concat(['operator']));
        }
    
        // 检测自定义的详情页/编辑页
        let detailPage = this.Schema.detailPage
        let detailTitle = this.Schema.detailTitle
        let editPage = this.Schema.editPage
        if(detailPage){
          this.detailPage = detailPage
        }
        if(detailTitle){
          this.detailTitle = detailTitle
        }
        if(editPage){
          this.editPage = editPage
        }
  
        // 加载Table数据源
        this.dataSource = new ParseDataSource(this.className,this.Schema,this.appServ);
  

        // 判断增加限定条件
        this.searchColName = this.displayedColumns[0] //搜索条件
        this.dataSource.searchColName = this.displayedColumns[0] //搜索条件

        let equalTo:any = queryParams.get("equalTo")
        if(equalTo){
          equalTo = equalTo.split(";")
          equalTo.forEach(e=>{
            e = e.split(":")
            this.dataSource.equalTo[e[0]] = e[1]
          })
        }
          
        // 当含P指针参数时，查找该指针所属字段名
        let PclassName = params.get("PclassName")
        let PobjectId = params.get("PobjectId")
        let pageIndex =  params.get("pageIndex")
        if(pageIndex){
          this.pageIndex = Number(pageIndex)
        }
        if(PclassName){
          this.dataSource.PclassName = PclassName;
          this.dataSource.PobjectId = PobjectId;
          this.fieldsKeys.forEach(key=>{
            if(this.fields[key].type == "Pointer" && this.fields[key].targetClass == PclassName){
              this.dataSource.PfiledsKey = key;
            }
          })
        this.getPobject()
        }
        this.dataSource.refresh()
  
      })
  }

  isOperatorEnabled(op){
    let isEnabled = this.displayedOperators.find(item=>item==op)
    if(isEnabled){
      return true
    }else{
      return false
    }
  }
  refreshList(type?) {
    console.log(type)
    this.dataSource.refresh()
    // this.objs = []
    // this.isNeedInfiniteScroll = true;
    // this.getClassQuery(type).find().then((data) => {
    //   this.objs = data;
    // });
  }
  getSchemaType():Array<string>{
    let keys:Array<string>
    if(this.typeName){
      keys = Object.keys(this.typeName)
    }else{
      keys = []
    }
    return keys
  }
  
  detail(params) {
    // 若对象为分类且类型是文章，则加载文章列表
    if(this.className == "Category" && this.dataSource.equalTo['type'] == "article"){
      this.detailPage = "/common/manage/Article"
    }
    
    // 其他情况：加载指定或默认详情页
    this.router.navigate([this.detailPage, params]);
  }

 
  // doInfinite(infiniteScroll) {
  //   //滚动加载 需要设置 绕过之前已经加载过的数据
  //   this.getClassQuery().skip(this.objs.length).find().then((data) => {
  //       if (data.length !== 0) {
  //        this.objs = this.objs.concat(data);
  //       } else {
  //         // console.log("没有数据了！");
  //         this.isNeedInfiniteScroll = false;
  //       }
  //       infiniteScroll.complete();
  //     }).catch(err=>{
  //       infiniteScroll.complete();
  //       // console.log(err)
  //   })
  // }
  printSurvey(obj){
    // window.print()
    // console.log(this.cloud.config)
    let url = this.cloud.config.homeURL+"/app/survey/paper/"+obj.id
    let name = obj.get("title")
    let feats = "height=768, width=1024, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
    window.open(url,name,feats)
  }
  batchImport(){
    this.nav.push("common-import");
  }



// start ant data

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;

  mapOfCheckedId: { [key: string]: boolean } = {};
  mapOfSort: { [key: string]: any } = {};
  numberOfChecked = 0;

  currentPageDataChange($event){
    console.log($event)
    if($event.length > 0 && this.dataSource.pageIndex != this.pageIndex){
      this.dataSource.pageIndex = this.pageIndex
      console.log(this.dataSource.pageIndex)
    }
  }
  // end ant data
}
























export class ParseDataSource {
// export class ParseDataSource extends MatTableDataSource<any> {
  listOfAllData: ParseObject[] = [];
  listOfDisplayData: ParseObject[] = [];
  loadDisplayData(){
    this.listOfChildData = {}
    this.listOfDisplayData = this.listOfAllData.filter(item=>{
      if(item.get("parent")&&item.get("parent").id) { // 标记有子节点的数据对象
        this.mapOfChildrenNode[item.get("parent").id]  = true
        if(this.listOfChildData[item.get("parent").id]){
          this.listOfChildData[item.get("parent").id].push(item)
        }else{
          this.listOfChildData[item.get("parent").id] = [].concat(item)
        }
      }
      return !item.get("parent");
    });
  }

  mapOfChildrenNode:any = {}
  mapOfChildrenExpanded:any = {}
  listOfChildData = {}

  type:string //同一Class的不同type
  sortState:any={}

  // 筛选指针对象属性
  PclassName:string
  PfiledsKey:string
  PobjectId:string
  Pobject:any

  // 预设限定条件
  pageIndex:Number = 1
  equalTo:any={}

  _searchColNameChange = new BehaviorSubject('');
  get searchColName(): string { return this._searchColNameChange.value; }
  set searchColName(value: string) {
    this._searchColNameChange.next(value); }

  _searchTextChange = new BehaviorSubject('');
  get searchText(): string { return this._searchTextChange.value; }
  set searchText(value: string) { this._searchTextChange.next(value); }

  dataChange: BehaviorSubject<Parse.Object[]> = new BehaviorSubject<Parse.Object[]>([]);

  constructor(private className: string,
    private schema:any,
    public appServ:AppService
    ) {
    // super();
  }


  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): BehaviorSubject<Parse.Object[]> {
    // const displayDataChanges = [
      // this.dataChange,
      // this._searchColNameChange,
      // this._searchTextChange,
    // ];
    return this.dataChange

    // return Observable.merge(...displayDataChanges).map(()=>{
    //     return this.dataChange.value
    //   })
  }

  disconnect() {}

  // For Parse
  getClassData():Observable<Parse.Object[]>{
    let promise:Promise<Parse.Object[]> = new Promise((resolve,reject)=>{
      this.getClassQuery().find().then(data=>{
        resolve(data)
      }).catch(()=>{
        reject(reject)
      })
    })
    return from(promise)
  }
  refresh(){
    this.getClassQuery().find().then(data=>{
      if(data){
        // this.dataChange.next(data)
        this.listOfAllData = data
        this.loadDisplayData()
      }
    })
  }
  destroy(obj){
    obj.destroy().then(() => {
      let list = this.dataChange.value
      list.forEach((el, i, arr) => {
        if (el.id == obj.id) {
          arr.splice(i, 1)
        }
      })
      this.refresh()
    })
  }
  getClassQuery() {
    let query = new Parse.Query(this.className);
    // 引入需要特殊包含的Pointer字段
    if(this.schema.include&&this.schema.include.length>0){
      this.schema.include.forEach(key=>{
        query.include(key)
      })
    }


    // 所有对象限制为当前公司账套
    if(this.className != "Company" && this.className != "Site" ){
    let company = this.appServ.company
    if(company&&this.className!="User"){ // 非用户的对象仅关联一个公司 company字段等于指针
      query.equalTo("company",{"__type":"Pointer","className":"Company","objectId":company})
    }else{ // 用户对象可存在与多个公司 company字段包含指针
      query.equalTo("company",{"__type":"Pointer","className":"Company","objectId":company})
    }
  }

    // 添加对象预设限定条件
    if(this.equalTo){
      Object.keys(this.equalTo).forEach(key=>{
        query.equalTo(key,this.equalTo[key])
      })
    }

    // include自为父级对象的三级关联
    query.include("parent")
    query.include("parent.parent")
    query.include("parent.parent.parent")

    // include所有Pointer字段
    if(this.schema.fields){
      Object.keys(this.schema.fields).forEach(key=>{
        let targetClass = this.schema.fields[key].targetClass
        if(targetClass){
          query.include(key)
        }
      })
    }

    // 表头有变动时，根据表头属性排序
    let sortKeys = Object.keys(this.sortState)
    if(sortKeys.length>0) {
      sortKeys.forEach(key=> {
        if(this.sortState[key]=="ascend") {
          query.addAscending(key);
        }
        if(this.sortState[key]=="descend") {
          query.addDescending(key);
        }
      })
    } else {  //表头无变动时，读取默认排序

      if(this.schema.order) {
        Object.keys(this.schema.order).forEach(key=> {
          if(this.schema.order[key]=="ascend") {
            query.addAscending(key);
          }
          if(this.schema.order[key]=="descend") {
            query.addDescending(key);
          }
        })
      } else {
        if(this.schema.fields['order']) query.addAscending('order');
        if(this.schema.fields['type']) query.addAscending('type');
        if(this.schema.fields['isEnabled']) query.addDescending('isEnabled');
        if(this.schema.fields['index']) query.addDescending('index');
        query.addDescending('updatedAt');
      }
    }

    // 添加对象不同类型条件
    if (this.type) {
      query.equalTo("type",this.type)
    }

    // 当筛选条件有所属对象指针时

    if (this.PclassName) {
      query.equalTo(this.PfiledsKey,{"__type":"Pointer","className":this.PclassName,"objectId":this.PobjectId})
    }

    // 添加搜索框查询条件
    if(this.searchText&&this.searchText.trim()!=""){
      this.searchText = this.searchText.replace(/(^\s+)|(\s+$)/g, "");
      // console.log(this.searchText)
      let key = this.searchColName
      if(!key||key==""){ //如果未选择，默认搜索title
        key = "title"
      }
      console.log("Search")
      console.log(key)
      console.log(this.searchText)
      query.contains(key,this.searchText)
    }
    return query;
  }
}
