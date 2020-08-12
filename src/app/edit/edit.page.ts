import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs' 
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  editForm: FormGroup;
  sub: any;
  id: string;
  errorMessage: string;
  fname: string;
  lname: string;
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private menuCtrl: MenuController,
    private fdb: AngularFireDatabase
  ) { }
   

  ngOnInit() {
     // This code graps the "id" from the URL
     this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.fname = this.es.giveFVal(); //fill this.fname with service stored fname
    this.lname = this.es.giveLVal(); //fill this.lname with service stored lname
    

    this.editForm = this.fb.group({
      fname: [this.fname],
      lname: [this.lname]  
    });

  }//end init

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }


  submit(){
    const form = this.editForm.value;
    
    if(form.fname == null || form.lname == null){  //Validation
      this.errorMessage = "Please fill all fields"
    } else{
      this.es.editEmployee(this.id, form);
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.es.delVal();
  }

}