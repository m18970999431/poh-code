import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { StudentDetailComponent } from './student-detail/student-detail.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  // { path: 'student/:storeid', component: StudentComponent, pathMatch: 'full' },
  { path: 'student/detail', component: StudentDetailComponent, pathMatch: 'full' },
]


@NgModule({
  declarations: [DashboardComponent, StudentDetailComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class XiaofangModule { }
