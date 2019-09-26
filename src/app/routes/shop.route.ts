import { AuthGuard } from '../auth.guard';

export const ShopRoute = {
    path: 'shop', loadChildren: () => import('src/modules/shop/shop.module').then(mod => mod.ShopModule),
    canActivate: [AuthGuard],
    data: {
      title: '商城管理',
      icon: "shop",
      nzOpen: true,
      subRoutes:
        [
          // { path: 'dashboard', title:'工作台', icon:'dashboard' },
          { pageUrl: 'common/frame/shop/', title:'总览', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/app.page', title:'页面', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/goods', title:'商品', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/member.list', title:'会员', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/order', title:'订单', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/store', title:'门店', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/sale.enough', title:'营销', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/finance.log.recharge', title:'财务', icon:'ordered-list' },
          { pageUrl: 'common/frame/shop/statistics.sale', title:'数据', icon:'ordered-list' },
        ]
    }
  }

// export const ShopSettingRoute = {
//   path: 'project-setting', loadChildren: () => import('src/modules/project/project.module').then(mod => mod.ShopModule),
//   canActivate: [AuthGuard],
//   data: {
//     title: '项目管理设置',
//     icon: "setting",
//     nzOpen: false,
//     subRoutes:
//       [
//         // { path: 'dashboard', title:'工作台', icon:'dashboard' },
//         { pageUrl: 'common/manage/Category', title:'项目分类', icon:'project',data:{equalTo:"type:project"} },
//         { pageUrl: 'common/manage/Category', title:"需求分类", icon:'book',data:{equalTo:"type:project-require"} },
//         { pageUrl: 'common/manage/Category', title:'任务分类', icon:'ordered-list',data:{equalTo:"type:project-task"} },
//       ]
//   }
// }