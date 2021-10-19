import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isNotEmptyArray } from 'src/app/utilities/utils';
import { LocalSettingsService } from './../../services/local-settings/local-settings.service';

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
  private dashboardCustomizationValue = [];

  constructor(public modalController: ModalController, public localSettingsSrv: LocalSettingsService) { }

  ngOnInit() {
    if (this.isDashboardCustomize) {
      this.isDefaultAlert = false;
      this.dashboardCustomizationValue = [
        { title: 'Project Tracker', val: 'pt', isChecked: true, icon: '../../../assets/icon/project-widget.svg' },
        { title: 'Task Manager', val: 'tm', isChecked: false, icon: '../../../assets/icon/task-widget.svg' },
        { title: 'Future Projects', val: 'fp', isChecked: false, icon: '../../../assets/icon/future-widget.svg' },
        { title: 'Offer Management', val: 'ofm', isChecked: false, icon: '../../../assets/icon/project-widget.svg' },
        { title: 'Order Management', val: 'om', isChecked: false, icon: '../../../assets/icon/project-widget.svg' },
        { title: 'Risk Assessment', val: 'rm', isChecked: false, icon: '../../../assets/icon/project-widget.svg' }
      ];
      this.changeWidgetSelectedValue();
    }
  }

  close(value?, shouldConfirmReset = false) {
    const _self = this;
    if (_self.isDefaultAlert && !_self.isDashboardCustomize && _self.shouldResetDashboard) {
      if (shouldConfirmReset) _self.resetDashboardWidget();
      else {
        _self.isDefaultAlert = !_self.isDefaultAlert;
        _self.isDashboardCustomize = !_self.isDashboardCustomize;
        _self.alertContent = null;
      }
    } else _self.dismissModal(value);
  }

  dismissModal(value?, shouldResetDashboardWidget = false) {
    const _self = this;
    _self.modalController.dismiss({
      dismissed: true,
      selectedDashboardWidgets: value,
      shouldResetDashboardWidgetPermission: shouldResetDashboardWidget
    });
  }

  confirm() {
    this.shouldResetDashboard ? this.close('', true) : this.close();
  }

  resetDashboard() {
    const _self = this;
    _self.shouldResetDashboard = true;
    _self.isDefaultAlert = !_self.isDefaultAlert;
    _self.isDashboardCustomize = !_self.isDashboardCustomize
    _self.alertContent = 'Are You Sure You Want to Reset to default widgets?';
  }

  submitDashboardWidgets() {
    const _self = this;
    const selectedValue = _self.dashboardCustomizationValue.filter(_val => _val.isChecked);
    _self.changeWidgetSelectedValue(true);
    _self.close(selectedValue);
  }

  changeWidgetSelectedValue(isSubmit = false) {
    const _self = this;
    if (isNotEmptyArray(_self.dashboardCustomizationValue)) {
      _self.dashboardCustomizationValue.forEach(_widget => {
        const { val, isChecked } = _widget;
        if (isSubmit) _self.localSettingsSrv.storeDashboardCustomizationChoice(val, isChecked);
        else {
          let data = _self.localSettingsSrv.getDashboardCustomizationChoice(val);
          if (val == 'pt' && data == null) _widget.isChecked = true;
          else _widget.isChecked = data;
        }
      })
    }
  }

  resetDashboardWidget() {
    const _self = this;
    _self.localSettingsSrv.resetDashboardWidget();
    _self.dismissModal('', true);
  }

}