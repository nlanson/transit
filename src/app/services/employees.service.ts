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
  
    add(employee) { //add employee
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

    getEmployees(){ //get all employees into an array
      return this.fdb.list('employees').valueChanges();
    }

    deleteEmployee(id) { //delete employee
      this.fdb.object("employees/" + id).remove()
        .then((ref) => {
          console.log("success");
        }, (error) => {
          console.error(error);
        })
    }

    editEmployee(id: string, employee) { //edit employee
      this.fdb.list("employees").update(id, { fname: employee.fname, lname: employee.lname, department: employee.department, address: employee.address});
      this.navroute.navigate(['/home']);
    }
  
}
