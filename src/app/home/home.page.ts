import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  employees: Observable<any[]>;

  id: string;

  constructor(
    private menuCtrl: MenuController,
    private es: EmployeesService,
  ) { 
    this.employees = es.getEmployees()
  }

  ngOnInit() {
      this.menuCtrl.enable(true);
     
    }//end init

  delete(id){
    this.es.deleteEmployee(id);
  }
  



}//end class
