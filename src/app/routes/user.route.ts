import { AuthGuard } from '../auth.guard';

export const UserRoute = {
    path: 'user', loadChildren: () => import('src/modules/user/user.module').then(mod => mod.UserModule),
    // path: 'user', loadChildren: 'src/pages/user/user.module#UserModule',
    data: {
      isShow: false,  // 用户相关页面，无需在导航显示，设置为false
      title: '用户中心',
      subRoutes:
        [
          {
            path: 'login', title: '登陆'
          }
        ]
    }
  }