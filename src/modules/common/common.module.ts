import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '@angular/material';
// import { IonicPageModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { Routes, RouterModule } from '@angular/router';

// Child Page Components
import { CommonListPage } from './common-list/common-list-page';

// Import Shared Module
import { PipesModule } from '../../pipes/pipes.module'

// Providers

// DataTable Depand CDK Table
// import {CdkTableModule} from '@angular/cdk/table';
// import {MatTableModule} from '@angular/material';
// End of DataTable

// Editor Components
import { EditorModule } from '@tinymce/tinymce-angular';

// AMap Components
import { NgxAmapModule } from 'ngx-amap';

// Ant Components
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzPageHeaderModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { CommonListItemComponent } from './common-list-item/common-list-item.component';
import { EditSurveyOptionsComponent } from './edit-survey-options/edit-survey-options.component';
import { FrameShopComponent } from './frame-shop/frame-shop.component';

// import { ClassDetailModule } from "../../components/class-detail/class-detail.module"
// import { SchemaStatusComponent } from '../schema-status/schema-status';

export const routes: Routes = [
  {
    path: 'manage/:schemaName', component: CommonListPage,
    runGuardsAndResolvers: 'always',
  },
  // IFRAME 接入商城管理后台相关组件
  {
    path: 'frame/shop/:shopRoute', component: FrameShopComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'frame/shop', component: FrameShopComponent,
    runGuardsAndResolvers: 'always',
  }
]

@NgModule({
  declarations: [
    CommonListPage,
    CommonListItemComponent,
    EditSurveyOptionsComponent,
    FrameShopComponent
  ],
  exports:[
    CommonListPage
  ],
  imports: [
    // Import Official Shared Module
    CommonModule,
    FormsModule,
    HttpClientModule,
    // Ant Module
    NgZorroAntdModule,
    NzPageHeaderModule,
    NzTableModule,
    NzTagModule,
    NzDrawerModule,
    // Editor Module
    EditorModule,
    // AMap Module
    NgxAmapModule.forRoot({
      apiKey: '8884994c8ccd064cd192fe3d04ab9d4e'
    }),
    // MaterialModule,
    // DataTable
    // CdkTableModule,
    // MatTableModule,
    // Import Custom Shared Module
    PipesModule,
    // ClassDetailModule,
    RouterModule.forChild(routes),
  ]
})
export class CommonPageModule { }
