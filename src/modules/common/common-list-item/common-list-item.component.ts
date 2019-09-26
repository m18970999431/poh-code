import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ParseDataSource } from '../common-list/common-list-page';

@Component({
  selector: '[common-list-item]',
  templateUrl: './common-list-item.component.html',
  styleUrls: ['./common-list-item.component.scss']
})
export class CommonListItemComponent implements OnInit {
  @Input() data:any
  @Input() dataSource:ParseDataSource
  @Input() detailTitle:any
  @Input() fields:any
  @Input() type:any
  @Input() displayedColumns:any
  @Input() displayedOperators:any
  @Output() operate: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  isFirstColumn(key){
    if(key == this.displayedColumns[0]){
      return true
    }else{
      return false
    }
  }

  getOptsLabel(key,value){
    let option = this.fields[key].options.find(item=> item.value == value)
    if(option&&option.label){
      return option.label
    }else{
      return ""
    }
  }

  // Inline Edit Funcion, 列表行内编辑函数
  toggleSwitch(ev,obj,key){
    obj.set(key, ev) // ev即switch组件切换后的值
    obj.save()
  }

  getLevelPadding(key){ // 已实现无限级递归
    // 排除首列
    if(!this.isFirstColumn(key)) return "5px"
    // 计算缩进
    let paddingValue = 0
    let isShow = this.getShowExpand(key)
    if(!isShow){
      paddingValue += 20
    }

    if(this.data.get("parent")){
      paddingValue = this.retriveParentPadding(this.data,paddingValue)
    }
    
    return String(paddingValue)+"px"
  }

  retriveParentPadding(obj,paddingValue):number{
    if(obj&&obj.get("parent")){
      paddingValue += 20
      return this.retriveParentPadding(obj.get("parent"),paddingValue)
    }else{
      return paddingValue
    }
  }

  getShowExpand(key){
    return this.isFirstColumn(key)?this.dataSource.mapOfChildrenNode[this.data.id]:false
  }
  getExpand(key){
    return this.isFirstColumn(key)?this.dataSource.mapOfChildrenExpanded[this.data.id]:false
  }
  // 操作菜单功能属性及方法
  operatorChange(data,operator){
    this.operate.emit(operator)
  }
  isOperatorEnabled(op){
    let operators = this.displayedOperators
    if(!operators) return false
    let isEnabled = operators.find(item=>item==op)
    if(isEnabled){
      return true
    }else{
      return false
    }
  }
}
