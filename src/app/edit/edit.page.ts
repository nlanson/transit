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
  employee: any;
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

    this.StartForm(this.id);
  }//end init


  StartForm(id: string){
    const itemPath =  `employees/${id}`; 
    this.employee = this.fdb.list(itemPath).valueChanges().subscribe((emp) => { //get single employee and put into form
      this.editForm = this.fb.group({
        fname: [emp[2]],
        lname: [emp[10]],
        address: [emp[0]],
        department: [emp[1]],
        licencenumber: [emp[9]],
        licencecardnumber: [emp[5]],
        licenceexpiry: [emp[8]],
        licencebacknumber: [emp[4]],
        licenceclass: [emp[6]],
        licencecondition: [emp[7]], 
      });
      console.log(emp);
    });
  }


  submit(){
    const form = this.editForm.value;
    
    if(form.fname == null || form.lname == null || form.department == null){  //Validation
      this.errorMessage = "Please fill all fields"
    } else{
      this.es.editEmployee(this.id, form);
    }
  }


  ngOnDestroy() {
    this.employee.unsubscribe();
  }

}