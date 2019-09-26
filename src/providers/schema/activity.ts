let ActivitySchemas: Schemas = {}
ActivitySchemas.Activity = {
  className: "Activity",
  name:"活动",
  desc: "活动",
  apps: ['activity'],
  displayedOperators:["edit","delete"],
  displayedColumns:["title","cycle","desc","surveyRequired","isEnabled"],
  fields: {
    // 基础信息
    title: {
      type: "String",
      name: "标题",
      required:true
    },
    logo: {
      type: "String",
      name: "LOGO"
    },
    cycle: {
      "type": "String",
      "name": "周期",
      "desc": "设置单次活动或循环活动",
      "color": "blue",
      "view": "edit-select",
      default:"exam",
      "options": [{label:"单次",value:"onetime"},{label:"每周",value:"weekly"}],
      required:true,
    },
    // 报名要求
    // peopleMax: {
    //   type: "Number",
    //   name: "人数限制"
    // },
    desc: {
      type: "String",
      name: "活动描述"
    },
    surveyRequired: {
      type: "Pointer",
      targetClass: "Survey",
      name: "必修课程",
    },
    // 时间段（单次）
    signFromTo: {
      type: "Object",
      view: "date-from-to",
      name: "报名时段（单次）",
    },
    startFromTo: {
      type: "Object",
      view: "date-from-to",
      name: "开展时段（单次）",
    },
    // 时间段（每周） 
    signDayArray:{
      type: "Array",
      name: "报名日期（每周）",
      options: [{label:"周一",value:"1"},{label:"周二",value:"2"},{label:"周三",value:"3"},{label:"周四",value:"4"},{label:"周五",value:"5"},{label:"周六",value:"6"},{label:"周日",value:"0"}]
    },
    // signDayTime:{
    //   type: "Object",
    //   view: "date-from-to",
    //   options: [],
    //   name: "报名时间（每周）",
    // },
    servicePeriodArray: {
      type: "Array",
      view: "period-from-to",
      name: "开展时段（每周）",
      "col": 24,
    },
    // 活动信息
    location: {
      type: "GeoPoint",
      view: "edit-location",
      desc: "活动举办或签到位置",
      name: "活动位置"
    },
    address:{
      type:"String",
      name:"详细地址",
      show:false
    },
    tag: {
      type: "Array",
      name: "标签"
    },
    color: {
      type: "String",
      name: "主题色",
    },
    cover: {
      type: "Array",
      name: "封面",
      view: "edit-image",
    },
    category: {
      type: "Pointer",
      targetClass: "Category",
      targetType: "activity",
      name: "分类",
    },
    // 志愿服务条例
    rule: {
      "type": "String",
      "view": "editor-tinymce",
      "col": 24,
      "name": "志愿服务条例",
    },
    // 管理审核
    isEnabled: {
      type: "Boolean",
      name: "是否开启"
    },
    manager: {
      type: "Pointer",
      targetClass: "_User",
      name: "项目管理员",
    }
  }
}

ActivitySchemas.ActivityRegister = {
  className: "ActivityRegister",
  name:"参与记录",
  desc: "参与记录",
  apps: ['activity'],
  displayedOperators:["edit","delete"],
  displayedColumns:["activity","user","serviceTime","startDate","endDate","isComplete"],
  fields: {
    activity: {
      type: "Pointer",
      targetClass: "Activity",
      name: "报名活动",
    },
    user: {
      type: "Pointer",
      targetClass: "_User",
      name: "报名人",
    },
    startDate: {
      type: "Date",
      name: "服务时间"
    },
    endDate: {
      type: "Date",
      name: "结束时间"
    },
    we7uid:{
      type: "String",
      name: "系统UID",
      disabled: true
    },
    openid:{
      type: "String",
      name: "系统OPENID",
      disabled: true
    },
    serviceTime:{
      type: "Number",
      name: "服务时长（小时）"
    },
    isComplete:{
      type: "Boolean",
      name:"是否完成"
    },
    isAbsent:{
      type: "Boolean",
      name:"是否缺席"
    },
    isChecked:{
      type: "Boolean",
      name:"是否签到"
    },
    isDeleted:{
      type: "Boolean",
      name:"是否取消"
    },
    whyAbsent:{
      type: "String",
      name:"缺席原因"
    }
  }
}

export {ActivitySchemas}
