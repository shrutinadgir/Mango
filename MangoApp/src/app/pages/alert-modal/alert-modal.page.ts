import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.page.html',
  styleUrls: ['./alert-modal.page.scss'],
})
export class AlertModalPage implements OnInit {
  isDefaultAlert: boolean = true;
  @Input() alertContent: string;
  @Input() isDashboardCustomize: boolean = false;
  shouldResetDashboard: boolean = false;
  private dashboardCustomizationValue = [
    { title: 'Project Tracker', val: 'pt', isChecked: true, icon: '../../../assets/icon/project-widget.svg' },
    { title: 'Task Manager', val: 'tm', isChecked: false, icon: '../../../assets/icon/task-widget.svg' },
    { title: 'Future Projects', val: 'fp', isChecked: false, icon: '../../../assets/icon/future-widget.svg' },
    { title: 'Offer Management', val: 'ofm', isChecked: false, icon: '../../../assets/icon/project-widget.svg' },
    { title: 'Order Management', val: 'om', isChecked: false, icon: '../../../assets/icon/project-widget.svg' },
    { title: 'Risk Assessment', val: 'rm', isChecked: false, icon: '../../../assets/icon/project-widget.svg' }
  ];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if (this.isDashboardCustomize) this.isDefaultAlert = false;
  }

  close(value?) {
    const _self = this;
    if (_self.isDefaultAlert && !_self.isDashboardCustomize && _self.shouldResetDashboard) {
      _self.isDefaultAlert = !_self.isDefaultAlert;
      _self.isDashboardCustomize = !_self.isDashboardCustomize;
      _self.alertContent = null;
    } else {
      _self.modalController.dismiss({
        dismissed: true,
        selectedDashboardWidgets: value
      });
    }
  }

  confirm() {
    this.close();
  }

  resetDashboard() {
    const _self = this;
    _self.shouldResetDashboard = true;
    _self.isDefaultAlert = !_self.isDefaultAlert;
    _self.isDashboardCustomize = !_self.isDashboardCustomize
    _self.alertContent = 'Are You Sure You Want to Reset to default widgets?';
  }

  submitDashboardWidgets() {
    const selectedValue = this.dashboardCustomizationValue.filter(_val => _val.isChecked);
    this.close(selectedValue);
  }

}