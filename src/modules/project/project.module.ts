import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ProjectGanttComponent } from './project-gantt/project-gantt.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzPageHeaderModule } from 'ng-zorro-antd';

export const routes: Routes = [
  {
    path: 'gantt/:projectId', component: ProjectGanttComponent,
    runGuardsAndResolvers: 'always',
  }
]

@NgModule({
  declarations: [ProjectGanttComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    NzPageHeaderModule,
  ]
})
export class ProjectModule { }
