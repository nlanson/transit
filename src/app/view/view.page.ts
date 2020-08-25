import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs' 
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  sub: any;
  id: string;
  employee: any;

  fname: string;
  lname: string;
  address: string;
  department: string;
  licencenumber: number;
  licencecardnumber: number;
  licenceexpiry: any;
  licencebacknumber: number;
  licenceclass: string;
  licencecondition: string;
  
  constructor(
    private route: ActivatedRoute,
    private fdb: AngularFireDatabase,
  ) { }

  ngOnInit() {
    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.employee = this.setValues(this.id);

  }//end init

  setValues(id){ //uses snapshot to get data (no live reloading.)
    let i = 0;
    var employeeData = new Array();
    const itemPath =  `employees/${id}`;
    this.fdb.list(itemPath).snapshotChanges().forEach(snapshot => {
      snapshot.forEach(snapshot => { 
        employeeData[i] = snapshot.payload.val();
        console.log(employeeData[i]);
        i++
      });
    });
    return employeeData
  }//end setValues

  show(){
    console.log(this.employee);

  }

}//end class
