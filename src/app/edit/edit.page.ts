import { Component, OnInit } from '@angular/core';
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
  employees: Observable<any[]>;
  id: string;
  employee: any;
  errorMessage: string;
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fdb: AngularFireDatabase
  ) { }
   

  ngOnInit() {
     // This code graps the "id" from the URL
     this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    
    this.employee = this.es.getSingleEmployee(this.id); //NOT RETURNING AN EMPLOYEE
    console.log(this.employee);
    

    this.editForm = this.fb.group({
      fname: [null], //cant get this.employee.fname (comes as undefined)
      lname: [null]  //cant get this.employee.fname (comes as undefined)
    });

  }//end init


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
  }

}