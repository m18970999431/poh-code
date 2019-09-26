import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService } from '../../../app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible
  username: string = ''
  password: string = ''

  constructor(
    public message: NzMessageService,
    public appServ: AppService,
    private router: Router
  ) { 
    localStorage.clear()

    this.appServ.hangout()

  }
  login() {
    localStorage.clear()

    this.appServ.hangout()

    this.appServ.login(this.username,this.password).then(data=> {
    }).catch(err=> {
      this.message.create('error', err.message)
    })
  }
  ngOnInit() {
  }
  enter(e) {
    if (e.keyCode == 13) {
      this.login()
    }
  }
}
