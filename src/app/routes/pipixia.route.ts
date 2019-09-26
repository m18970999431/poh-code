import { AuthGuard } from '../auth.guard';

export const PipixiaRoute = {
    path: 'pipixia', loadChildren: 'src/modules/pipixia/pipixia.module#PipixiaRoute',
    data: {
      isShow: true,  // 用户相关页面，无需在导航显示，设置为false
      title: '皮皮虾电动车',
      nzOpen: true,
      subRoutes:
        [
        //   { path: 'adv', title:'编辑广告' },
        //   { path: 'distributor', title:'经销商' },
          { pageUrl: 'common/manage/ppx_merch', title:'商家列表', icon:'book' },
          { pageUrl: 'common/manage/ppx_coupon', title:'优惠卷列表', icon:'book' },
          { pageUrl: 'common/manage/ppx_couponUser', title:'优惠卷用户列表', icon:'book' },
          { pageUrl: 'common/manage/ppx_couponClert', title:'商家核销员列表', icon:'book' },
          { pageUrl: 'common/manage/ppx_propaganda', title:'商家宣传列表', icon:'book' },
          { pageUrl: 'common/manage/Category', title:'商家分类', icon:'book',data:{equalTo:"type:merch"} },
          { pageUrl: 'common/manage/Category', title:'优惠卷分类', icon:'book',data:{equalTo:"type:coupon"} },
        ]
    }
  }