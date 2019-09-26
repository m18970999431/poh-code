import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { SchemaListComponent } from './schema-list/schema-list.component';

// import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

export const routes: Routes = [{
  path: 'schemas', component: SchemaListComponent,
  runGuardsAndResolvers: 'always',
}]

@NgModule({
  declarations: [SchemaListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzPageHeaderModule,
    NzTagModule,
    NzButtonModule,
    NzTabsModule,
    NzDrawerModule,
    NzInputModule,
    NzFormModule
  ]
})
export class DeveloperModule { }
