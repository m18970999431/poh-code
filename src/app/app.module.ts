import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CommonModule, DatePipe } from '@angular/common';


// Component Module
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
// import { MaterialModule } from './app-material.module';

// Diy Shared Module
// import { ChamberSharedModule } from 'src/common/chamber-shared/chamber-shared.module';

// 组件
registerLocaleData(zh);

// let parsestring = JSON.parse(localStorage.getItem("ParseString"))
// if(parsestring){
//   console.log(parsestring)
//   Parse.initialize(parsestring.appId);
//   Parse.applicationId = parsestring.appId
//   Parse.serverURL = parsestring.serverURL
//   Parse.masterKey = parsestring.masterKey
//   console.log(Parse)
// }else{
//   Parse.initialize("nova");         // 数据库名字 (括号中是数据库名)
//   Parse.applicationId = "nova" //  数据库地址 即dashboard地址
//   Parse.serverURL = "https://server.futurestack.cn/parse" //  数据库地址 即dashboard地址
//   Parse.masterKey = "NovaTest666" //  数据库地址 即dashboard地址
// }
// 连接数据库
// Parse.initialize('future');         // 数据库名字 (括号中是数据库名)
// Parse.serverURL = 'http://server.hopecent.com:3337/parse' //  数据库地址 即dashboard地址
// Parse.initialize('nova');         // 数据库名字 (括号中是数据库名)
// Parse.serverURL = 'https://server.futurestack.cn/parse' //  数据库地址 即dashboard地址

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Components Module
    NgZorroAntdModule,
    // MaterialModule,
    // ChamberSharedModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
