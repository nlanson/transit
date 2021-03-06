import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute } from '@angular/router';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'
import {  MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  LoginForm: FormGroup;
  email: string;
  password: string;

  display: string;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private navroute: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.LoginForm = this.fb.group(
      {
        inputUsername: [null],
        inputPassword: [null]
      }
    );
  }//end onInit

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }


   gotoReg(){
    this.navroute.navigate(['/register'])
  }


  submit(){
    console.log("login");
    this.email = this.LoginForm.value.inputUsername;
    this.password = this.LoginForm.value.inputPassword;
    this.errorMessage = '';

    if(this.email ==  null || this.password == null){
      this.errorMessage = "Username or password cannot be empty!";
    } else{
      this.authService.login(this.email, this.password);
      
      setTimeout(() => //time delay to clear password field
        {
          this.LoginForm.controls['inputPassword'].reset();
        },
        1500);

    }
  }//end submit

  quickLogin(){
    this.email = "fast-login@transit.com"
    this.password = "admin1234"
    this.authService.login(this.email, this.password);
  }

 

}
