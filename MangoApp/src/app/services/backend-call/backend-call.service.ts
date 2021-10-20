import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/app/utilities/api-urls';

@Injectable({
  providedIn: 'root',
})
export class BackendCallService {
  constructor(public http: HttpClient) {}

  getProjectLists() {
    const _self = this;
    let urlParams = new HttpParams();
    return _self.http
      .get<any>(`${ApiUrls.getProjects}`, { params: urlParams })
      .toPromise();
  }

  getTaskManagerData() {
    const _self = this;
    let urlParams = new HttpParams();
    return _self.http
      .get<any>(`${ApiUrls.getTaskManagers}`, { params: urlParams })
      .toPromise();
  }
}
