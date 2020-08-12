import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Router } from '@angular/router'
import { AddPage } from '../add/add.page';
import { HomePage } from '../home/home.page';
import { Observable } from 'rxjs';


@Injectable()
export class EmployeesService {
  
  item: any;
  fname: string;
  lname: string;
  
  constructor(
    public fdb: AngularFireDatabase,
    private navroute: Router,
    ) {}
  
    add(employee) {
      this.fdb.list("employees").push(employee)
      .then((ref) => {
        console.log(ref);
        this.fdb.object('people/' + ref.key)
        ref.update({ id: ref.key })
      }, (error) => {
        console.error(error);
      })
      this.navroute.navigate(['/home']);
    } 

    getEmployees(){
      return this.fdb.list('employees').valueChanges();
    }

    storeVal(fname, lname){
      this.fname = fname;
      this.lname = lname;
      console.log(this.fname + " " + this.lname);
    }

    giveFVal() {
      return this.fname;
    }

    giveLVal() {
      return this.lname;
    }

    delVal(){
      this.fname = null;
      this.lname = null;
    }

    getSingleEmployee(id: string) { //Doesn't return single employee
    const itemPath =  `people/${id}`;  
    return this.fdb.list(itemPath); 
    }

    deleteEmployee(id) {
      this.fdb.object("employees/" + id).remove()
        .then((ref) => {
          console.log("success");
        }, (error) => {
          console.error(error);
        })
    }

    editEmployee(id: string, employee) {
      this.fdb.list("employees").update(id, { fname: employee.fname, lname: employee.lname});
      this.navroute.navigate(['/home']);
    }
  
}
