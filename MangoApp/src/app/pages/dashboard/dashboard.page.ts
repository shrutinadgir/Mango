import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertModalPage } from '../alert-modal/alert-modal.page';
import { BackendCallService } from 'src/app/services/backend-call/backend-call.service';
import { LoadingController } from '@ionic/angular';
import { isNotEmptyArray, toNumber } from 'src/app/utilities/utils';
import { SortingPipe } from 'src/app/pipes/sorting.pipe';
import { StatusPopoverComponent } from 'src/app/components/status-popover/status-popover.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedTabTitle: string = 'DashBoard';
  projectLists: Array<[]> = [];
  sorOrderStatus: boolean = false;
  tasksManagersData: Array<[]> = [];
  taskManagerUsers: any = [];
  constructor(
    public modalController: ModalController,
    public backendService: BackendCallService,
    public loadingController: LoadingController,
    public sortPipe: SortingPipe,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.getProjects();
    this.getTaskManagerData();
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

  getTaskManagerData() {
    this.backendService
      .getTaskManagerData()
      .then((data) => {
        const tasks = data.tasks;
        if (isNotEmptyArray(tasks)) {
          return (this.tasksManagersData = tasks);
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

  openDashboardCustomization(isDashboardCustomize) {
    const msg = `Are You Sure You Want to Reset to default widgets?`;
    this.openAlertModal(msg, isDashboardCustomize);
  }

  async openAlertModal(msg, isDashboardCustomize = false) {
    let props = { isDashboardCustomize };
    if (!msg) msg = `Are You Sure You Want to Reset to default widgets?`;
    if (!isDashboardCustomize) props['alertContent'] = msg;
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: isDashboardCustomize
        ? 'mango-dashboard-customization-modal'
        : 'mango-alert-modal',
      backdropDismiss: false,
      componentProps: props,
    });
    await modal.present();
    const {
      data: { selectedDashboardWidgets },
    } = await modal.onWillDismiss();
  }

  async openStatusPopover(ev: any, type, task?) {
    let props = { type };
    const popover = await this.popoverController.create({
      component: StatusPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: props,
      showBackdrop: false,
    });
    await popover.present();
    await popover.onDidDismiss().then((result) => {
      if (task && result.data !== undefined) {
        typeof result.data === 'string'
          ? (task.status = result.data)
          : (task.taskManagerUsers = result.data);
      }
    });
  }
}
