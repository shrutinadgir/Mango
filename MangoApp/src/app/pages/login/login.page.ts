import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData={email:'',password:''}
  constructor() { }

  ngOnInit() {
  }
  login(){
    console.log("form Data",this.formData)
  }
}
