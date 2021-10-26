import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalSettingsService } from 'src/app/services/local-settings/local-settings.service';
import { isNotEmptyArray } from 'src/app/utilities/utils';

@Component({
  selector: 'app-add-remove-column-selector',
  templateUrl: './add-remove-column-selector.component.html',
  styleUrls: ['./add-remove-column-selector.component.scss'],
})

export class AddRemoveColumnSelectorComponent implements OnInit {
  addRemoveColumnSelectorData = [];
  isAnyValueChanged: boolean = false;
  alertContent: string;
  shouldDisplayAlert: boolean = false;
  title: string;
  @Input() columnSelectorFor: string;

  constructor(public modalController: ModalController, public localSettingsSrv: LocalSettingsService) { }

  ngOnInit() {
    this.fetchColumnSelectorStroageValue();
  }

  fetchColumnSelectorStroageValue() {
    const _self = this;
    if (_self.columnSelectorFor === 'projectStatus') {
      _self.title = "Project Status Tracker";
      const data = _self.localSettingsSrv.getProjectStatusColumnSelectorWidgetStorageValue();
      if (isNotEmptyArray(data)) _self.addRemoveColumnSelectorData = data;
    }
  }

  changeWidgetCheckedValue(item) {
    const _self = this;
    _self.isAnyValueChanged = true;
    if (isNotEmptyArray(_self.addRemoveColumnSelectorData)) {
      let matchedVal = _self.addRemoveColumnSelectorData.find(_p => _p.val === item.val);
      if (matchedVal) matchedVal.isChecked = !matchedVal.isChecked;
    }
  }

  submitColumnSelectorData() {
    const _self = this;
    _self.changeColumnSelectorStoreData();
    _self.close(true);
  }

  changeColumnSelectorStoreData() {
    const _self = this;
    _self.localSettingsSrv.setColumnSelectorWidgetInfo(_self.columnSelectorFor, _self.addRemoveColumnSelectorData);
  }

  close(isDataSubmitted = false) {
    const _self = this;
    let body = {
      isDataChangedForColumnSelector: isDataSubmitted,
      columnSelectorWidgetFor: this.columnSelectorFor
    }
    _self.modalController.dismiss({
      columnSelectorSelectedValue: body
    });
  }

  resetAndCloseToDefaultSettigs() {
    const _self = this;
    _self.shouldDisplayAlert = !_self.shouldDisplayAlert;
    if (_self.shouldDisplayAlert) _self.alertContent = 'Are You Sure You Want to Reset to default columns ?';
    else _self.alertContent = null;
  }

  confirmColumnSelectorReset() {
    const _self = this;
    _self.localSettingsSrv.resetColumnSelectorWidget(_self.columnSelectorFor);
    _self.close(true);
  }

}