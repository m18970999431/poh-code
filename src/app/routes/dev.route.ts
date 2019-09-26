import { AuthGuard } from '../auth.guard';

export const DevRoute = {
    path: 'developer',  loadChildren: () => import('src/modules/developer/developer.module').then(mod => mod.DeveloperModule),
    canActivate: [AuthGuard],
    data: {
      title: '开发者管理',
      icon: "home",
      nzOpen: true,
      subRoutes:
        [
          // { path: 'dashboard', title:'工作台', icon:'dashboard' },
          { pageUrl: 'common/manage/Company', title:'公司账套管理', icon:'home' },
          { pageUrl: 'common/manage/Site', title:'CMS站点管理', icon:'home' },
          { path: 'schemas', title:'Schema模型范式', icon:'book' },
          // { pageUrl: 'common/manage/Schema', title:'Schema模型范式', icon:'book' },
        ]
    }
  }