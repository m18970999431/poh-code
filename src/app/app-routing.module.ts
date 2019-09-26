import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routesArray: Routes = [
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  }
];

// 全局系统模块路由
import { UserRoute } from './routes/user.route';
import { CommonRoute } from './routes/common.route';
routesArray.push(CommonRoute)
routesArray.push(UserRoute)

// 客户定制功能路由
import { XiaofangRoute } from './routes/xiaofang.route';
routesArray.push(XiaofangRoute)
import { VolunteerRoute } from './routes/volunteer.route';
import { VolunteerShopRoute } from './routes/volunteer.route';
routesArray.push(VolunteerRoute)
routesArray.push(VolunteerShopRoute)

import { PipixiaRoute } from './routes/pipixia.route';
routesArray.push(PipixiaRoute)

// 更多功能应用路由
import { CmsRoute } from './routes/cms.route';
routesArray.push(CmsRoute)
import { ProjectRoute, ProjectSettingRoute } from './routes/project.route';
routesArray.push(ProjectRoute,ProjectSettingRoute);
import { SurveyRoute } from './routes/survey.route';
routesArray.push(SurveyRoute)
import { ShopRoute } from './routes/shop.route';
routesArray.push(ShopRoute)

// 开发者及超管专用路由
import { SystemRoute } from './routes/system.route';
routesArray.push(SystemRoute)
import { DevRoute } from './routes/dev.route';
routesArray.push(DevRoute)


// 导出路由常量
export const routes: Routes = routesArray;

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
