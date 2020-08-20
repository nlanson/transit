import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'

;
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  AddForm: FormGroup;
  errorMessage: string;
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.AddForm = this.fb.group(
      {
        fname: [null],
        lname: [null],
        address: [null],
        department: [null],
        licencenumber: [null],
        licencecardnumber: [null],
        licenceexpiry: [null],
        licencebacknumber: [null],
        licenceclass: [null],
        licencecondition: [null],
      }
    );
  }// end init

  submit(){
    console.log("submit");
    if(this.AddForm.value.fname == null || this.AddForm.value.lname == null || this.AddForm.value.department == null){
      this.errorMessage = "Please fill all fields"
    } else{
      this.es.add(this.AddForm.value);
    this.AddForm.reset();
    }
  }

}

