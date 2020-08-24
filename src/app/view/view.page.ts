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

  setValues(id){
    const itemPath =  `employees/${id}`;
    this.employee = this.fdb.list(itemPath).snapshotChanges().forEach(snapshot => {
       snapshot.forEach(snapshot => { //currently console logs each key and data in key but cant put the key data into array :(
        var key = snapshot.key; // from https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
        console.log("Key: " + key);
        var childData = snapshot.payload.val();
        console.log("Child: " + childData);

      });
    });

  }//end setValues

}//end class
