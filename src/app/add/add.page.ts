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
  
  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.AddForm = this.fb.group(
      {
        fname: [null],
        lname: [null]
      }
    );
  }// end init

  submit(){
    console.log("submit");
    this.es.add(this.AddForm.value);
    this.AddForm.reset();
  }

}

