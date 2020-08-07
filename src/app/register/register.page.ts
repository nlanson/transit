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
    )
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

    
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

}
