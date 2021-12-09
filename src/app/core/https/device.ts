import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getDeviceList() {
    return this.http.get(`/ovn/v1/devices`);
  }

  getLinkList() {
    return this.http.get(`/ovn/v1/links`);
  }

  getDevicePortList(deviceId: string) {
    return this.http.get(`/ovn/v1/devices${deviceId}/ports`);
  }

  getDeviceNatList(deviceId: string) {
    return this.http.get(`/ovn/v1/devices${deviceId}/nats`);
  }

}