import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs' 
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

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
    private navroute: Router,
    private alertController: AlertController,
    private es: EmployeesService
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
    this.fname = employeeData[2];
    this.lname = employeeData[10];
    this.address = employeeData[0];
    this.department = employeeData[1];
    this.licencenumber = employeeData[9];
    this.licencecardnumber = employeeData[5];
    this.licenceexpiry = employeeData[8];
    this.licencebacknumber = employeeData[4];
    this.licenceclass = employeeData[6];
    this.licencecondition = employeeData[7];
    return employeeData
  }//end setValues

  edit(id){
    this.navroute.navigate(['edit', id]);
  }

  deleteConfirm(id){ //show alert
    this.presentAlertConfirm(id);

  }

  async presentAlertConfirm(id) { //present alert
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to  <strong>delete</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelled Delete');
          }
        }, {
          text: 'Delete',
          handler: (del) => {
            this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }

  delete(id){ //delete employee
    this.es.deleteEmployee(id);
    this.navroute.navigate(['home']);

  }


  ngOnDestroy(){
    this.employee = new Array();
    this.sub.unsubscribe();
  }

}//end class
