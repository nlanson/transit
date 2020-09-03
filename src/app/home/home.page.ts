import { Component, OnInit, ViewChild } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { Router } from '@angular/router'
import { EmployeesService } from '../services/employees.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';

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
    private navroute: Router,
    private alertController: AlertController
  ) { 
    this.employees = es.getEmployees()
  }

  ngOnInit() {
     
  }//end init

  ionViewWillEnter() {
      this.menuCtrl.enable(true);
  }

  deleteConfirm(id){ //show alert
    this.presentAlertConfirm(id);

  }

  edit(id, slidingItem: IonItemSliding){ //navigates to edit page with id parameter
    this.navroute.navigate(['edit', id]);
    slidingItem.close();
  }

  gotoView(id){
    this.navroute.navigate(['view', id]);
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

  }

  gotoAdd(){
    this.navroute.navigate(['/add']);
  }

}//end class
