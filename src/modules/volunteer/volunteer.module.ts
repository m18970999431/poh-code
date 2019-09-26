import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerDetailComponent } from './volunteer-detail/volunteer-detail.component';

import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { DashboardOverviewComponent } from '../dashboard-overview/dashboard-overview.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard/overview', component: DashboardOverviewComponent, pathMatch: 'full' },
  { path: 'volunteer/detail', component: VolunteerDetailComponent, pathMatch: 'full' },
]


@NgModule({
  declarations: [VolunteerDetailComponent, DashboardComponent, DashboardOverviewComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NzDrawerModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class VolunteerModule { }
