let UserRoleSchemas: Schemas = {}
UserRoleSchemas.User = {
  className: "_User",
  name:"用户",
  desc: "平台用户信息",
  apps: ['common'],
  displayedOperators:[],
  displayedColumns:["name","nickname","username","sex"],
  fields: {
    name: {
      type: "String",
      name: "姓名"
    },
    mobile: {
      type: "String",
      name: "手机"
    },
    username: {
      type: "String",
      name: "账号"
    },
    password: {
      type: "String",
      view: "edit-password",
      name: "密码"
    },
    nickname: {
        type: "String",
        name: "昵称"
    },
    sex: {
      type: "String",
      name: "性别"
    }
  }
}

UserRoleSchemas._Role = {
  className: "_Role",
  name:"角色",
  desc: "平台角色信息",
  apps: ['common'],
  displayedOperators:["edit","delete"],
  displayedColumns:["title","modules"],
  fields: {
    title:{
      type: "String",
      name: "角色名称",
    },
    modules: {
      type: "Array",
      name:"授权模块"
    },
    users: {
      name: "授权用户",
      type: "Relation",
      className: "_User"
    },
    name: {
      type: "String",
      name: "角色编码",
      show:false,
      // disabled: true
    }
  }
}

export {UserRoleSchemas}
