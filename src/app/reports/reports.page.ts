import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  selDep: boolean;
  selLic: boolean;
  departmentForm: FormGroup;
  licenceForm: FormGroup;
  showDept: boolean;
  selectedDepartment: string;
  showLic: boolean;
  selectedClass: string;
  selectedCondition: string;

  employees: Observable<any[]>;

  constructor(
    private es: EmployeesService,
    private navroute: Router,
    private fb: FormBuilder
  ) {
    this.employees = es.getEmployees()
   }

  ngOnInit() {
    this.selDep = false;
    this.selLic = false;
    this.showDept = false;
    this.showLic = false;

    this.departmentForm = this.fb.group(
      {
        department: [null]
      }
    )

    this.licenceForm = this.fb.group(
      {
        licenceclass: [null],
        licencecondition: [null]
      }
    )
  }

  selectDept(){
    console.log("Showing Dept Selection...");
    this.selDep = true;
    this.selLic = false;
    this.showLic = false;
    
  }

  selectLic(){
    console.log("Showing Licence Selection...");
    this.selLic = true;
    this.selDep = false;
    this.showDept = false;
    
  }

  submitDepartment(){
    console.log(this.departmentForm.value.department);
    this.showDept = true;
    this.showLic = false;
    this.selectedDepartment = this.departmentForm.value.department;
    
  }

  submitLicence(){
    console.log(this.licenceForm.value.licenceclass);
    console.log(this.licenceForm.value.licencecondition);
    this.showLic = true;
    this.showDept = false;
    this.selectedClass = this.licenceForm.value.licenceclass;
    this.selectedCondition = this.licenceForm.value.licencecondition;

  }

  close(){
    this.showDept = false;
    this.showLic = false;
  }

  closeForm(){
    this.departmentForm.reset();
    this.selDep = false;
    this.licenceForm.reset();
    this.selLic = false;
  }



}
