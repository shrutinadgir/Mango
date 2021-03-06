import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertModalPage } from 'src/app/components/alert-modal/alert-modal.page';
import { BackendCallService } from 'src/app/services/backend-call/backend-call.service';
import { LoadingController } from '@ionic/angular';
import { doubleDecimal, isEmptyArray, isNotEmptyArray, isNotNullAndUndefined, toNumber, } from 'src/app/utilities/utils';
import { SortingPipe } from 'src/app/pipes/sorting.pipe';
import { StatusPopoverComponent } from 'src/app/components/status-popover/status-popover.component';
import { LocalSettingsService } from './../../services/local-settings/local-settings.service';
import { AddRemoveColumnSelectorComponent } from 'src/app/components/add-remove-column-selector/add-remove-column-selector.component';

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
  projectTrackerColumnSelectorPermission: any = {};
  addRemoveColumnSelectorTypeFor = ["projectStatus"];
  isProjectTrackerWidgetPermission: boolean = true;
  isTaskManagerWidgetPermission: boolean = false;
  isFutureProjectsWidgetPermission: boolean = false;
  isOfferManagementWidgetPermission: boolean = false;
  isOrderManagementWidgetPermission: boolean = false;
  isRiskAssesssmentWidgetPermission: boolean = false;

  constructor(
    public modalController: ModalController,
    public backendService: BackendCallService,
    public loadingController: LoadingController,
    public sortPipe: SortingPipe,
    public popoverController: PopoverController,
    public localSettingsSrv: LocalSettingsService
  ) { }

  ngOnInit() {
    this.getProjects();
    this.getTaskManagerData();
    this.getDashboardWidgetPermission();
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
            if (_p.Actual_Time_hours && _p.Planned_Time_Hours)
              _p.timeHoursInPer = doubleDecimal(
                toNumber(
                  ((_p.Actual_Time_hours / _p.Planned_Time_Hours) * 100) / 10
                )
              );
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

  // convertStringToNum(value) {
  //   let num = value.split('%');
  //   return toNumber(num[0]);
  // }

  sortData(data, widgetName?) {
    this.sorOrderStatus = !this.sorOrderStatus;
    if (widgetName === 'TaskManager') {
      this.sorOrderStatus == true
        ? this.sortPipe.transform(data, 'Task_Title', 'asc')
        : this.sortPipe.transform(data, 'Task_Title', 'dsc');
    } else {
      this.sorOrderStatus == true
        ? this.sortPipe.transform(data, 'project_name', 'asc')
        : this.sortPipe.transform(data, 'project_name', 'dsc');
    }
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
      showBackdrop: false,
      componentProps: props,
    });
    await modal.present();
    const {
      data: { selectedDashboardWidgets, shouldResetDashboardWidgetPermission },
    } = await modal.onWillDismiss();
    if (
      shouldResetDashboardWidgetPermission ||
      (isNotNullAndUndefined(selectedDashboardWidgets) &&
        (isNotEmptyArray(selectedDashboardWidgets) ||
          isEmptyArray(selectedDashboardWidgets)))
    )
      this.getDashboardWidgetPermission();
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
      // mode: 'ios',
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

  addOrRemoveColumnSelectorWidgets(type) {
    this.openAddOrRemoveColumnSelectorAlertModal(type);
  }

  getDashboardWidgetPermission() {
    const _self = this;
    _self.isProjectTrackerWidgetPermission = _self.localSettingsSrv.getProjectTrackerWidgetPermissionValue();
    _self.isTaskManagerWidgetPermission = _self.localSettingsSrv.getTaskManagerWidgetPermissionValue();
    _self.isFutureProjectsWidgetPermission = _self.localSettingsSrv.getFutureProjectsWidgetPermissionValue();
    _self.isOfferManagementWidgetPermission = _self.localSettingsSrv.getOfferManagementWidgetPermissionValue();
    _self.isOrderManagementWidgetPermission = _self.localSettingsSrv.getOrderManagementWidgetPermissionValue();
    _self.isRiskAssesssmentWidgetPermission = _self.localSettingsSrv.getRiskAssessmentWidgetPermissionValue();
    _self.getColumnSelectorPermission(_self.addRemoveColumnSelectorTypeFor);
  }

  async openAddOrRemoveColumnSelectorAlertModal(type) {
    let props = { columnSelectorFor: type };
    const modal = await this.modalController.create({
      component: AddRemoveColumnSelectorComponent,
      cssClass: 'add-remove-widget-class',
      backdropDismiss: false,
      showBackdrop: false,
      componentProps: props,
    });
    await modal.present();
    const { data: { columnSelectorSelectedValue: { isDataChangedForColumnSelector, columnSelectorWidgetFor } } } = await modal.onWillDismiss();
    if (isDataChangedForColumnSelector && columnSelectorWidgetFor) this.getColumnSelectorPermission([columnSelectorWidgetFor])
  }

  getColumnSelectorPermission(types) {
    const _self = this;
    if (types.includes('projectStatus')) {
      const data = _self.localSettingsSrv.getProjectStatusColumnSelectorWidgetStorageValue();
      if (isNotEmptyArray(data)) _self.checkProjectTrackerColumnSelectorPermission(data);
    }
  }

  checkProjectTrackerColumnSelectorPermission(value) {
    const _self = this;
    value.forEach(_v => {
      if (_v.val === 'pid') _self.projectTrackerColumnSelectorPermission['projectId'] = _v.isChecked
      if (_v.val === 'nom') _self.projectTrackerColumnSelectorPermission['noOfMachine'] = _v.isChecked
      if (_v.val === 'cname') _self.projectTrackerColumnSelectorPermission['customerName'] = _v.isChecked
      if (_v.val === 'tih') _self.projectTrackerColumnSelectorPermission['timeInHours'] = _v.isChecked
      if (_v.val === 'aname') _self.projectTrackerColumnSelectorPermission['accountName'] = _v.isChecked
      if (_v.val === 'cid') _self.projectTrackerColumnSelectorPermission['costInDollar'] = _v.isChecked
      if (_v.val === 'pmname') _self.projectTrackerColumnSelectorPermission['projectManName'] = _v.isChecked
      if (_v.val === 'rgns') _self.projectTrackerColumnSelectorPermission['regions'] = _v.isChecked
      if (_v.val === 'pp') _self.projectTrackerColumnSelectorPermission['projectPhase'] = _v.isChecked
      if (_v.val === 'rid') _self.projectTrackerColumnSelectorPermission['revenueInDollar'] = _v.isChecked
      if (_v.val === 'std') _self.projectTrackerColumnSelectorPermission['startDate'] = _v.isChecked
      if (_v.val === 'etd') _self.projectTrackerColumnSelectorPermission['endDate'] = _v.isChecked
      if (_v.val === 'status') _self.projectTrackerColumnSelectorPermission['status'] = _v.isChecked
    });
  }
}
