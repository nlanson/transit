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
  employees: any;
  id: string;
  item: any;
  errorMessage: string;
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
     // This code graps the "id" from the URL
     this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.item = this.es.getSingleEmployee(this.id);
    console.log(this.item); //returns strange object
    console.log(this.item.fname);// shows as undefined
    console.log(this.item.lname);//shows as undefined
    

    this.editForm = this.fb.group({
      fname: [null], //cant get this.item.fname (comes as undefined)
      lname: [null]  //cant get this.item.fname (comes as undefined)
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