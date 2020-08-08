import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {  MenuController } from '@ionic/angular';
import{ Router, ActivatedRoute } from '@angular/router';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  RegisterForm: FormGroup;
  email: string;
  password: string;

  display: string;
  errorMessage: string;

  constructor(
    private location: Location,
    private menuCtrl: MenuController,
    private navroute: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.RegisterForm = this.fb.group(
      {
        inputEmail: [null],
        inputPassword: [null]
      }
    );

    this.RegisterForm.valueChanges
      .subscribe((formData) => {
        //email validation
          if (formData.inputEmail !== null) {
            var i = 0;
            while (i < formData.inputEmail.length) {
             if (formData.inputEmail[i].charCodeAt() != 64) {
                this.errorMessage = "Email must be valid";
              } else {
                this.errorMessage = ""
                break
              }
              i++
            } // end while
          }
      })//end subscribe

    
  }//end init

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  back(){
    this.location.back();

  }

  gotoLogin(){
    this.navroute.navigate(['/login']);
  }

  submit(){
    this.email = this.RegisterForm.value.inputEmail;
    this.password = this.RegisterForm.value.inputPassword;

    if (this.email == null || this.password == null){
      this.errorMessage = "Registration fields cannot be empty"
    }
    else if(this.password.length < 7){
      this.errorMessage = "Password must be 7 or more characters";
    } 
    else {
      this.authService.signup(this.email, this.password);
      this.email = this.password = '';
    }//end if
    
    
  }

}
