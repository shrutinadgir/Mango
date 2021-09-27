import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData={email:'',password:''}
  loginDisplay = false;
  userData: any;
  constructor(private router: Router,private authService: MsalService) { }

  ngOnInit() {
  }
  login(){
    console.log("form Data",this.formData)
    this.router.navigate(['/dashboard'])
  }

  loginWithSSO() {
    this.authService.loginPopup().subscribe({ 
      next: (result) => {
        console.log(result, JSON.stringify(result));
        this.userData = result.account;
        this.setLoginDisplay();
      },
      error: (error) => console.log(error),
    });

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log('setLoginDisplay', this.loginDisplay, this.userData.name);
    let silentRequest = {
      scopes:['Mail.Read'],
      account:this.userData.username,
      forceRefresh:false
    }
    console.log('silentRequest',silentRequest);

    this.authService.acquireTokenSilent(silentRequest).subscribe((res:any)=>{
      console.log('res',res);
    },err=>console.log('error',err)
    )
    this.router.navigate(['/dashboard'])
    // this.router.navigate(['/dashboard'], {
    //   queryParams: { userName: this.userData.name }
    // });
  }
}
