import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertModalPage } from '../alert-modal/alert-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedTabTitle: string = 'DashBoard';

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  sideNavSelectedTab(tab) {
    const _self = this;
    if (tab === 'dash') _self.selectedTabTitle = 'DashBoard'
    else if (tab === 'pm') _self.selectedTabTitle = 'Project Dashboard'
    else if (tab === 'ofm') _self.selectedTabTitle = 'Offer - Management Dashboard'
    else if (tab === 'om') _self.selectedTabTitle = 'Order - Management Dashboard'
    else if (tab === 'um') _self.selectedTabTitle = 'User Management Console'
    else if (tab === 'lm') _self.selectedTabTitle = 'Library Management'
  }

  async openAlertModal() {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: 'mango-alert-modal',
      backdropDismiss: false,
      componentProps: {
        'alertContent': `Are You Sure You Want to Reset to default widgets?`,
      }
    });
    return await modal.present();
  }

}