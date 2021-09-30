import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertModalPage } from '../alert-modal/alert-modal.page';
import { BackendCallService } from 'src/app/services/backend-call/backend-call.service';
import { LoadingController } from '@ionic/angular';
import { isNotEmptyArray, toNumber } from 'src/app/utilities/utils';
import { SortingPipe } from 'src/app/pipes/sorting.pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedTabTitle: string = 'DashBoard';
  projectLists: Array<[]> = [];
  sorOrderStatus: boolean = false;
  constructor(
    public modalController: ModalController,
    public backendService: BackendCallService,
    public loadingController: LoadingController,
    public sortPipe: SortingPipe
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  sideNavSelectedTab(tab) {
    const _self = this;
    if (tab === 'dash') _self.selectedTabTitle = 'DashBoard';
    else if (tab === 'pm') _self.selectedTabTitle = 'Project Dashboard';
    else if (tab === 'ofm')
      _self.selectedTabTitle = 'Offer - Management Dashboard';
    else if (tab === 'om')
      _self.selectedTabTitle = 'Order - Management Dashboard';
    else if (tab === 'um') _self.selectedTabTitle = 'User Management Console';
    else if (tab === 'lm') _self.selectedTabTitle = 'Library Management';
  }

  async openAlertModal() {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: 'mango-alert-modal',
      backdropDismiss: false,
      componentProps: {
        alertContent: `Are You Sure You Want to Reset to default widgets?`,
      },
    });
    return await modal.present();
  }

  getProjects() {
    const _self = this;
    _self.backendService
      .getProjectLists()
      .then((data) => {
        const { projects } = data;
        if (isNotEmptyArray(projects)) {
          projects.forEach((_p) => {
            if (isNaN(_p.Cost_dollars))
              _p.Cost_dollars = _self.convertStringToNum(_p.Cost_dollars);
            if (isNaN(_p.Revenue_dollars))
              _p.Revenue_dollars = _self.convertStringToNum(_p.Revenue_dollars);
            if (isNaN(_p.Time_hours))
              _p.Time_hours = _self.convertStringToNum(_p.Time_hours);
          });
          return (_self.projectLists = projects);
        }
      })
      .catch((err) => {
        console.log('getting error for fetching projects lists:', err);
      });
  }
  convertStringToNum(value) {
    let num = value.split('%');
    return toNumber(num[0]);
  }

  sortData(data) {
    this.sorOrderStatus = !this.sorOrderStatus;
    this.sorOrderStatus == true
      ? this.sortPipe.transform(data, 'project_name', 'asc')
      : this.sortPipe.transform(data, 'project_name', 'dsc');
  }
}
