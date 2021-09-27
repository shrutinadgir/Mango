import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertModalPage } from '../alert-modal/alert-modal.page';
import { BackendCallService } from 'src/app/services/backend-call/backend-call.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedTabTitle: string = 'DashBoard';
  projectLists: Array<[]> = [];

  constructor(public modalController: ModalController, public backendService: BackendCallService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getProjects();
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

  getProjects() {
    const _self = this;
    _self.backendService.getProjectLists().then(data => {
      console.log("getting project lists data:", data);
      if (data && data.projects.length) {
        _self.projectLists = data.projects;
        if (_self.projectLists.length) {
          _self.projectLists.forEach(_p => {
            if (_p['Cost_dollars']) _p['Cost_dollars'] = _self.convertStringToNum(_p['Cost_dollars']);
            if (_p['Revenue_dollars']) _p['Revenue_dollars'] = _self.convertStringToNum(_p['Revenue_dollars']);
            if (_p['Time_hours']) _p['Time_hours'] = _self.convertStringToNum(_p['Time_hours']);
          });
        }
      }
    }).catch(err => {
      console.log("getting error for fetching projects lists:", err);
    })
  }
  convertStringToNum(value) {
    let num = value.split("%");
    return Number(num[0])
  }

}