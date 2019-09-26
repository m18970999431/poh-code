let CommonSchemas: Schemas = {}
CommonSchemas.Company = {
  className: "Company",
  name:"公司账套",
  desc: "管理SaaS版，多公司账套账户",
  apps: ['common'],
  displayedOperators:["edit","delete"],
  displayedColumns:["name","modules"],
  fields: {
    name:{
      type: "String",
      name: "账套名称",
    },
    modules: {
      type: "Array",
      name:"授权模块"
    },
    website:{
      type: "String",
      name: "官方网站",
    },
    users: {
      name: "超级管理员",
      type: "Array",
      className: "_User"
    }
  }
}

CommonSchemas.Department = {
  //其中departid/manager/parentid为钉钉企业组织特有字段
  className: "Department",
  desc: "组织，系统中各类组织。depart为企业内部组织，school为学校，class为班级。",
  name: "组织",
  displayedOperators:["edit","delete"],
  displayedColumns:["name","parent","name"],
  apps: ['common'],
  fields: {
    type: {
      type: "String",
      name: "组织类型",
      default:"depart",
      view:"just-show"
    },
    name: {
      type: "String",
      name: "组织名称"
    },
    parent: {
      type: "Pointer",
      targetClass: "Department",
      name: "上级组织"
    },
    company: {
      type: "Pointer",
      targetClass: "Company",
      name: "所属公司"
    }
  }
}

CommonSchemas.Profile = {
  className: "Profile",
  name: "档案",
  displayedOperators:["edit","delete"],
  displayedColumns:["name","mobile","position"],
  desc: "档案，员工简历及档案信息。",
  apps: ['hr'],
  fields: {
    state: {
      type: "String",
      name: "在职状态",
      view: "anas-edit-radio",
      options: ["在岗", "待岗", "离职", "其他"]
    },
    name: {
      type: "String",
      name: "姓名"
    },
    tag: {
      type: "Array",
      name: "标签",
      view: "anas-edit-tag"
    },
    user: {
      type: "Pointer",
      targetClass: "_User",
      name: "所属用户",
      show: false
    },
    company: {
      type: "Pointer",
      targetClass: "Company",
      name: "所属公司",
    },
    department: {
      type: "Pointer",
      targetClass: "Department",
      name: "所属部门",
    },
    position: {
      type: "String",
      name: "职位",
    },
    mobile: {
      type: "String",
      name: "手机",
    },
    tel: {
      type: "String",
      name: "电话",
    },
    email: {
      type: "String",
      name: "邮箱",
    },
    address: {
      type: "String",
      name: "详细住址",
    },
    nation: {
      type: "String",
      name: "民族",
    },
    cardtype: {
      type: "String",
      name: "证件类型",
      view: "anas-edit-radio",
      options: ["身份证", "因私护照", "因公护照", "香港永久性居民身份证", "澳门永久性居民身份证", "港澳来往内地通行证", "台湾来往内地通行证", "外国人永久居留证", "其他证件"]
    },
    cardnum: {
      type: "String",
      name: "证件号码",
    },
    study: {
      type: "String",
      name: "学历",
      view: "anas-edit-radio",
      options: ["不限", "大专", "本科", "硕士及以上"]
    },
    marriage: {
      type: "String",
      name: "婚姻状态",
      view: "anas-edit-radio",
      options: ["未婚", "已婚", "离婚"]
    },
    sex: {
      type: "String",
      name: "性别",
      view: "anas-edit-radio",
      options: ["不限", "男", "女"]
    },
    polity: {
      type: "String",
      name: "政治面貌",
    },
    // workdate: {
    //   type: "Date",
    //   name: "参加工作日期",
    //   view: "datetime"
    // },
    entrydate: {
      type: "Date",
      name: "入职日期",
      view: "datetime"
    },
    attachment: {
      type: "Array",
      name: "附件",
      view: "anas-uploader"
    }
  }
}

CommonSchemas.Class = {
  //其中departid/manager/parentid为钉钉企业组织特有字段
  className: "Department",
  name: "班级",
  displayedOperators:["edit","delete"],
  displayedColumns:["name","parent","address"],
  desc: "班级，系统中各类组织。depart为企业内部组织，school为学校，class为班级。",
  apps: ['class'],
  fields: {
    type: {
      type: "String",
      name: "类型",
      default: "class",
      show: false
    },
    parent: {
      type: "Pointer",
      targetClass: "Department",
      name: "学校"
    },
    name: {
      type: "String",
      name: "班级"
    },
    book: {
      type: "Pointer",
      targetClass: "ArticleBook",
      name: "课程"
    },
    schedule: {
      type: "Array",
      name: "授课时间"
    },
    address: {
      type: "String",
      name: "授课地点"
    }
  }
}
// CommonSchemas.Timeline = {
//   className: "Timeline",
//   desc: "动态，用户操作及重要事件的动态记录。",
//   apps: ['common'],
//   fields: {
//     content_type: 12,
//     data_content_type: 39,
//     namespace: {
//       type: "String",
//       name: "相关域"
//       // "customer:6LaAMXS9"
//       // "profile:IzSxcSAA"
//     },
//     eventType: {
//       type: "String",
//       name: "事件类型"
//       // "hr.state.change"
//       // "crm.event.add"
//     },
//     assignedTo: {
//       type: "Pointer",
//       targetClass: "Profile",
//       name: "指派员工"
//     },
//     profile: {
//       type: "Pointer",
//       targetClass: "Profile",
//       name: "员工"
//     },
//     customer: {
//       type: "Pointer",
//       targetClass: "Customer",
//       name: "客户"
//     },
//     comment: {
//       type: "String",
//       name: "注释"
//     },
//     comment_html: {
//       type: "String",
//       name: "注释页面"
//     }
//   }
// }

export {CommonSchemas}
