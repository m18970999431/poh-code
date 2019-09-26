import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

import { APPCONFIG } from '../app/config'


@Injectable({
  providedIn: 'root'
})
export class AppService {
  server: string;
  boyaAdmin: string;
  college: string;

  config:any;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    // 加载基础服务器配置
    this.config = APPCONFIG
    if(this.config.appId){
      Parse.initialize(this.config.appId);
      if(this.config.serverURL){
            Parse.serverURL = this.config.serverURL;
      }
      if(this.config.masterKey){
        Parse.masterKey = this.config.masterKey;
      }
    }
  }

  get loginPath(): string {
    let loginPath = localStorage.getItem('loginPath');
    return loginPath ? loginPath : "/user/login";
  }
  set loginPath(v: string) {
    localStorage.setItem('loginPath', v)
  }

  get company(): string {
    let com = localStorage.getItem('company');
    if (com) {
      return com
    } else {
      this.company = "qvFWcjCvzH"
      return "qvFWcjCvzH"
    }
  }
  set company(v: string) {
    localStorage.setItem('company', v)
  }

  get department(): string {
    let depart = localStorage.getItem('department')
    if (depart) {
      return depart
    } else {
      this.department = "5BEdrX6FTk"
      return "5BEdrX6FTk"
    }
  }
  set department(v: string) {
    localStorage.setItem('department', v)
  }

  get departmentName(): string {
    let depart = localStorage.getItem('departmentName')
    if (depart) {
      return depart
    } else {
      this.departmentName = "电竞社"
      return this.departmentName
    }
  }
  set departmentName(v: string) {
    localStorage.setItem('departmentName', v)
  }

  get currentRole(): string {
    let role = localStorage.getItem('currentRole')
    if (role) {
      return role
    } else {
      this.currentRole = "public"
      return "public"
    }
  }
  set currentRole(v: string) {
    localStorage.setItem('currentRole', v)
  }

  get rootPage(): string {
    let root = localStorage.getItem('rootPage')
    if (root) {
      return root
    } else {
      this.rootPage = "/"
      return "/"
    }
  }
  set rootPage(v: string) {
    localStorage.setItem('rootPage', v)
  }

  get redirectUrl(): string {
    let url = localStorage.getItem('redirectUrl')
    if (url) {
      return url
    } else {
      this.redirectUrl = this.rootPage
      return this.rootPage
    }
  }
  set redirectUrl(v: string) {
    console.log(v)
    localStorage.setItem('redirectUrl', v)
  }

  configs = {
    adminccg: {
      username: "adminccg",
      password: "3007",
      uniacid: "6",
      title: "村村购数据中心",
      rootPage: "/order/dashboard",
      modules: ["cms", "order", "supply", "member", "purchase", "distribution",
      "hotel", "cashwithdrawal", "setup", "userdetails", "goodsdetails", "doubletrack",
      "association", "association-manage", "boya", "ccg","pipixia"]
    },
    adminxjk: {
      username: "adminxjk",
      password: "gongying",
      uniacid: "1",
      title: "享好菜数据中心",
      rootPage: "/order/dashboard",
      modules: ["order", "supply", "member", "purchase"]
    },
    hxcgy: {
      username: "hxcgy",
      password: "gy123456",
      uniacid: "1",
      title: "享好菜供应中心",
      rootPage: "/supply",
      modules: ["supply"]
    },
    dgqt: {
      username: "dgqt",
      password: "dgqt",
      uniacid: "1",
      title: "东莞情天酒店",
      rootPage: "/hotel/technician/dashboard",
      modules: ["hotel"]
    },
    xyxg: {
      username: "xyxg",
      password: "xyxg123",
      uniacid: "14",
      title: "西域鲜果",
      rootPage: "/doubletrack/gamesettings",
      modules: ["doubletrack"]
    },
    yianda: {
      username: "yianda",
      password: "adminyad",
      title: "后台管理系统",
      rootPage: "xiaofang/dashboard",
      // rootPage: "common/manage/Xiaofang_class",
      modules: ["xiaofang","cms"],
      company: 'mI7V3WayTu',
    },
    vbank: {
      username: "vbank",
      password: "vbank2019",
      title: "幸福V银行",
      rootPage: "volunteer/dashboard",
      modules: ["volunteer","volunteer-bank","survey"],
      company: 'pmAYN1NesE',
    },
    ncdx: {
      username: "ncdx",
      password: "ncdx123",
      uniacid: "5",
      title: "南昌大学学生社团信息管理系统",
      rootPage: "association-manage/appraisal",
      modules: ["association-manage"],
      company: 'qvFWcjCvzH'
    },
    project: {
      username: "project",
      password: "gogogo",
      title: "全栈项目开发云",
      rootPage: "common/manage/Project",
      modules: ["project","project-setting"],
      company: 'HPLN6rhdQP'
    },
    boya: {
      username: "boya",
      password: "boya123",
      uniacid: "5",
      title: "boya",
      rootPage: "boya/goods",
      modules: ["boya"]
    },
    lyj: {
      username: "lyj",
      password: "lyj123",
      uniacid: "5",
      title: "林业大赛管理系统",
      rootPage: "forestry/news-manage",
      modules: ["forestry"],
      company: "2D7H18tfjU"
    },
    college: {
      username: "college",
      password: "college123",
      uniacid: "5",
      title: "学员报名管理系统",
      rootPage: "college/carousel",
      modules: ["college"]
    },
    pipixia: {
      username: "pipixia",
      password: "pipixia123",
      uniacid: "20",
      title: "皮皮虾电动车",
      rootPage: "common/manage/ppx_merch",
      company: "nTFkj1GpWQ",
      modules: ["pipixia"]
    }
  }

  /*
  * 系统全局设置参数
  * title 标题
  */
  get title(): string {
    let title = localStorage.getItem("title")
    return title ? title : '后台管理系统'
  }
  set title(v: string) {
    localStorage.setItem('title', v)
    document.title = v
  }
  setTitle(t) {
    this.title = t
    document.title = this.title
  }

  /*
  * 用户登录相关函数
  * 记录登录状态
  * 记录角色信息
  * 通过localStorage持久化
  */
  get isLoggedIn() {
    let r = localStorage.getItem('isLoggedIn')
    console.log("lget:", r)
    return r
  }
  set isLoggedIn(v) {
    localStorage.setItem('isLoggedIn', v)
  }
  get uniacid() {
    return localStorage.getItem('uniacid')
  }
  set uniacid(v) {
    localStorage.setItem('uniacid', v)
  }
  get modules(): Array<string> {
    let modules = localStorage.getItem('modules')
    return modules ? modules.split(",") : []
  }
  set modules(v: Array<string>) {
    localStorage.setItem('modules', String(v))
  }
  login(username, password) {
    let that = this;
    return new Promise((res, rej) => {
      // 添加用户名密码登录(玉环中职小程序)
      let loginP = new Promise((resolve, reject) => {
        let collegeLoginUrl = this.college + "/collegeLogin";
        // this.http.post(collegeLoginUrl, { username: username, password: password }).subscribe(data => {
        //   resolve(data);
        //   console.log(data);
        // })
      })
      // loginP.then(function(e) {
      //   if (e[0]&&e[0]["id"]) {
      //     that.currentRole = "username"
      //     that.isLoggedIn = "1"
      //     that.modules = ["college"]
      //     that.setTitle("学员报名管理系统")
      //     that.rootPage = "college/carousel"
      //     that.router.navigate([that.rootPage]);
      //     res("Ok")
      //   } else {
      //     rej({ message: "账号或密码错误" })
      //   }
      // })
      //原始登录方法
      if (this.configs[username]) {
        if (this.configs[username].password === password) {
          this.currentRole = "admin"
          this.isLoggedIn = "1"
          this.uniacid = this.configs[username].uniacid
          this.modules = this.configs[username].modules
          // if(this.configs[username].parse){
          //   localStorage.setItem("ParseString",JSON.stringify(this.configs[username].parse))
          //   Parse.initialize(this.configs[username].parse.appId);         // 数据库名字 (括号中是数据库名)
          //   Parse.applicationId = this.configs[username].parse.appId //  数据库地址 即dashboard地址
          //   Parse.serverURL = this.configs[username].parse.serverURL //  数据库地址 即dashboard地址
          //   Parse.masterKey = this.configs[username].parse.masterKey //  数据库地址 即dashboard地址
          // }else{
          //   Parse.initialize("nova");         // 数据库名字 (括号中是数据库名)
          //   Parse.applicationId = "nova" //  数据库地址 即dashboard地址
          //   Parse.serverURL = "https://server.futurestack.cn/parse" //  数据库地址 即dashboard地址
          //   Parse.masterKey = "NovaTest666" //  数据库地址 即dashboard地址
          // }
          if(window.location.hostname.startsWith("127")||window.location.hostname.startsWith("local")){
            this.modules = this.modules.concat("developer")
            this.modules = this.modules.concat("system")
          }
          this.setTitle(this.configs[username].title)
          if (this.configs[username].company) {
            this.company = this.configs[username].company
          }
          if (this.configs[username].rootPage) {
            this.rootPage = this.configs[username].rootPage
          }

          this.router.navigate([this.redirectUrl]);
          res("OK")
        } else {
          rej({ message: "账号或密码错误" })
        }
      }
    })
  }
  hangout() { // 账号访问登录页时，暂时挂起，清除登陆和公司信息
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("currentRole");
    window.localStorage.removeItem("company");
  }
  logout() {
    // localStorage.removeItem("isLoggedIn")
    // localStorage.removeItem("uniacid")
    // localStorage.removeItem("modules")
    // localStorage.removeItem("title")
    // localStorage.removeItem("redirectUrl")

    // 登出不清除默认登录地址信息、不清楚站点名称信息
    let loginPath = this.loginPath
    let title = this.title
    let company = this.company
    console.log(loginPath, title)
    localStorage.clear()
    localStorage.setItem("loginPath", loginPath)
    localStorage.setItem("title", title)

    if (title == '南昌大学学生社团信息管理系统' || title == '社团协会信息管理系统') {
      this.router.navigate(['/user/login-association']);
    } else if (company == '2D7H18tfjU') {
      this.router.navigate(['/user/forestry-login']);
    } else {

      this.router.navigate([loginPath]);
    }
  }
  hasAccessAuth(module) {
    let modules = this.modules;
    if (modules.indexOf(module.path) !== -1) {
      return true
    } else {
      return false
    }
  }
}
