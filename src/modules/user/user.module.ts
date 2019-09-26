import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent } from './login/login.component';
import { LoginAssociationComponent } from './login-association/login.component';
import { RegisterAssociationComponent } from './register-association/register.component';
import { ForestryLoginComponent } from './forestry-login/forestry-login.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'login-association', component: LoginAssociationComponent,
  },
  {
    path: 'register-association', component: RegisterAssociationComponent,
  },
  {
    path: 'forestry-login', component: ForestryLoginComponent,
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    LoginAssociationComponent,
    RegisterAssociationComponent,
    ForestryLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
  ]
})
export class UserModule { }
