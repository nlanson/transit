import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs' 

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
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
     // This code graps the "id" from the URL
     this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
    });

    this.employees = this.es.getEmployees();

    this.item =  this.employees[this.id];

    this.editForm = this.fb.group({
      fname: [null], //cant get this.item.fname (comes as undefined)
      lname: [null]  //cant get this.item.fname (comes as undefined)
    });

    console.log(this.item); //returns an observable???

  }//end init

  submit(){
    const form = this.editForm.value;
    
    if(form.fname == null || form.lname == null){  //if form is empty, wont submit
      console.log("form cannot be empty");
    } else{
      this.es.editEmployee(this.id, form);
    }
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}