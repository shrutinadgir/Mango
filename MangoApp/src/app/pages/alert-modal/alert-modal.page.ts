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

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if (this.isDashboardCustomize) this.isDefaultAlert = false;
  }

  close() {
    const _self = this;
    if (_self.isDefaultAlert && !_self.isDashboardCustomize && _self.shouldResetDashboard) {
      _self.isDefaultAlert = !_self.isDefaultAlert;
      _self.isDashboardCustomize = !_self.isDashboardCustomize;
      _self.alertContent = null;
    } else {
      _self.modalController.dismiss({
        dismissed: true
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

}