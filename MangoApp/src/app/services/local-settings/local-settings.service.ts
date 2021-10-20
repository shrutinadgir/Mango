import { Injectable } from '@angular/core';
import { StorageService } from './../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {

  private PROJECT_TRACKER_KEY = 'projecttracker_widget';
  private TASK_MANAGER_KEY = 'taskmanager_widget';
  private FUTURE_PROJECTS_KEY = 'futureprojects_widget';
  private OFFER_MANAGEMENT_KEY = 'offermanagement_widget';
  private ORDER_MANAGEMENT_KEY = 'ordermanagement_widget';
  private RISK_ASSESSMENT_KEY = 'riskassessment_widget';

  constructor(public storageSrv: StorageService) { }

  storeDashboardCustomizationChoice(key: string, value) {
    this.storageSrv.set(this.getDashboardWidgetStorageKey(key), value);
  }

  getDashboardCustomizationChoice(key: string) {
    return this.storageSrv.get(this.getDashboardWidgetStorageKey(key));
  }

  getDashboardWidgetStorageKey(value: string) {
    let key = '';
    if (value == 'pt') key = this.PROJECT_TRACKER_KEY;
    else if (value == 'tm') key = this.TASK_MANAGER_KEY
    else if (value == 'fp') key = this.FUTURE_PROJECTS_KEY
    else if (value == 'ofm') key = this.OFFER_MANAGEMENT_KEY
    else if (value == 'om') key = this.ORDER_MANAGEMENT_KEY
    else if (value == 'rm') key = this.RISK_ASSESSMENT_KEY
    return key;
  }

  getProjectTrackerWidgetPermissionValue() {
    let data = this.storageSrv.get(this.PROJECT_TRACKER_KEY);
    if (data == null) data = true
    return data;
  }

  getTaskManagerWidgetPermissionValue() {
    let data = this.storageSrv.get(this.TASK_MANAGER_KEY);
    if (data == null) data = false
    return data;
  }

  getFutureProjectsWidgetPermissionValue() {
    let data = this.storageSrv.get(this.FUTURE_PROJECTS_KEY);
    if (data == null) data = false
    return data;
  }

  getOfferManagementWidgetPermissionValue() {
    let data = this.storageSrv.get(this.OFFER_MANAGEMENT_KEY);
    if (data == null) data = false
    return data;
  }

  getOrderManagementWidgetPermissionValue() {
    let data = this.storageSrv.get(this.ORDER_MANAGEMENT_KEY);
    if (data == null) data = false
    return data;
  }

  getRiskAssessmentWidgetPermissionValue() {
    let data = this.storageSrv.get(this.RISK_ASSESSMENT_KEY);
    if (data == null) data = false
    return data;
  }

  resetDashboardWidget() {
    this.storageSrv.set(this.PROJECT_TRACKER_KEY, true);
    this.storageSrv.set(this.TASK_MANAGER_KEY, false);
    this.storageSrv.set(this.FUTURE_PROJECTS_KEY, false);
    this.storageSrv.set(this.OFFER_MANAGEMENT_KEY, false);
    this.storageSrv.set(this.ORDER_MANAGEMENT_KEY, false);
    this.storageSrv.set(this.RISK_ASSESSMENT_KEY, false);
  }
}
