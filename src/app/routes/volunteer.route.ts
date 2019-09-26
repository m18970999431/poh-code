import { AuthGuard } from '../auth.guard';

export const VolunteerRoute = {
    path: 'volunteer', loadChildren: () => import('src/modules/volunteer/volunteer.module').then(mod => mod.VolunteerModule),
    canActivate: [AuthGuard],
    data: {
      title: '志愿者管理',
      icon: "home",
      nzOpen: true,
      subRoutes:
        [
          { path: 'dashboard/overview', title:'数据分析', icon:'dashboard' },
          { path: 'dashboard', title:'项目看板', icon:'dashboard' },
          // { pageUrl: 'common/manage/VolunteerProfile', title:'志愿者管理', icon:'usergroup-add' },
          { pageUrl: 'common/manage/Activity', title:'志愿项目', icon:'usergroup-add' },
          { pageUrl: 'common/manage/ActivityRegister', title:'服务记录', icon:'usergroup-add' },
          { pageUrl: 'common/frame/shop/member.list', title:'志愿者审核', icon:'usergroup-add' },
          { pageUrl: 'common/manage/VolunteerProfile', title:'往届志愿者', icon:'usergroup-add' },

          // { pageUrl: 'common/manage/VolunteerGroup', title:'小组管理', icon:'bank' },
          // { pageUrl: 'common/manage/VolunteerCourse', title:'课程管理', icon:'book' },
        ]
    }
  }

  export const VolunteerShopRoute = {
    path: 'volunteer-bank', loadChildren: () => import('src/modules/volunteer/volunteer.module').then(mod => mod.VolunteerModule),
    canActivate: [AuthGuard],
    data: {
      title: '幸福V银行',
      icon: "home",
      nzOpen: true,
      subRoutes:
        [
          { pageUrl: 'common/frame/shop/goods', title:'商品管理', icon:'bank' },
          { pageUrl: 'common/frame/shop/order', title:'订单管理', icon:'bank' },
          { pageUrl: 'common/frame/shop/member.level', title:'志愿者等级', icon:'bank' },
          { pageUrl: 'common/frame/shop/member.list', title:'志愿者储蓄卡', icon:'usergroup-add' },
        ]
    }
  }