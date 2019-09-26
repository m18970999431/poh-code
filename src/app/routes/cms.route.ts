import { AuthGuard } from '../auth.guard';

export const CmsRoute = {
    path: 'cms', loadChildren: 'src/modules/cms/cms.module#CmsModule',
    canActivate: [AuthGuard],
    data: {
      title: 'CMS管理',
      icon: "file-text",
      nzOpen: true,
      subRoutes:
        [
          { pageUrl: 'common/manage/Article', title:'文章列表', icon:'book' },
          { pageUrl: 'common/manage/Category', title:'分类管理', icon:'book',data:{equalTo:"type:article"} },
          { pageUrl: 'common/manage/Banner', title:'首页轮播图', icon:'book' },

          // { path: 'article', title:'文章列表' },
          // { path: 'article/edit/:id' },
          // { path: 'article/category', title:'文章分类' },
          // { path: 'article/carousel', title:'轮播图管理' }
        ]
    }
  }