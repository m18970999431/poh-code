import { Component, OnInit } from '@angular/core';
import { routes } from './app-routing.module';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  triggerTemplate: any;
  isCollapsed: any;
  routing = routes;
  href: any;
  origin: any;
  constructor(
    private router: Router,
    public appServ: AppService
  ) {
    this.href = location.href;
    this.origin = location.origin;
  }

  getRouterLink(m, r):string {
    if (r.pageUrl) {
      return r.pageUrl;
    } else {
      return '/' + m.path + '/' + r.path;
    }
  }
  navToRoute(m,r){
    let extras:NavigationExtras={}
    if(r.data){
      extras.queryParams = r.data
    }
    // extras.queryParamsHandling = "preserve" // 禁止不同路由参数合并

    console.log(this.getRouterLink(m,r))
    this.router.navigate([this.getRouterLink(m,r)],extras);
  }

  ngOnInit(): void {
    // 重置系统标题
      document.title = this.appServ.title;
      // document.getElementById("login-title").innerHTML = this.appServ.title
  }
}
