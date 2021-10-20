import { Injectable } from '@angular/core';
import { StorageDriver } from 'src/app/utilities/storage.driver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private prefix = 'mango_'

  constructor() { }

  set(key: string, value: any) {
    const _self = this;
    if (value instanceof Object || Array.isArray(value)) {
      _self.save(key, JSON.stringify(value));
    } else _self.save(key, value);
  }

  save(key: string, value: string): void {
    const _self = this;
    StorageDriver.set(`${_self.prefix}${key}`, value);
  }

  get(key: string) {
    const _self = this;
    let value = null;
    value = StorageDriver.get(`${_self.prefix}${key}`);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (err) { }
    }
    return value;
  }

  remove(key: string) {
    const _self = this;
    StorageDriver.remove(`${_self.prefix}${key}`);
  }

  clear() {
    let r = null;
    try { StorageDriver.clear(); } catch (err) { }
    return r;
  }

}
