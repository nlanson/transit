import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Router } from '@angular/router'
import { AddPage } from '../add/add.page';
import { Observable } from 'rxjs';


@Injectable()
export class EmployeesService {
  
  constructor(
    private fdb: AngularFireDatabase,
    private navroute: Router,
    ) {}
  
    add(employee) {
      this.fdb.list("employees").push(employee)
      .then((ref) => {
        console.log(ref);
        // this.afdb.object('people/' + ref.key)
        ref.update({ id: ref.key })
      }, (error) => {
        console.error(error);
      })
    } //As of now, This is adding the fname and lname to the realtime database.
      //There is no data reading or editing.
  
}
