import { AuthGuard } from '../auth.guard';

export const SystemRoute = {
    path: 'system',  loadChildren: () => import('src/modules/system/system.module').then(mod => mod.SystemModule),
    canActivate: [AuthGuard],
    data: {
      title: '系统设置',
      icon: "setting",
      nzOpen: true,
      subRoutes:
        [
          { pageUrl: 'common/manage/User', title:'用户管理', icon:'user' },
          { pageUrl: 'common/manage/_Role', title:'角色管理', icon:'user' },
        ]
    }
  }