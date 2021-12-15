import { Injectable } from '@angular/core';
import { Column, DataTableModel } from '../../core/models/data-table';

@Injectable({
  providedIn: 'root'
})
export class TopoHelper {
  constructor() { }

  getDevicePortListTableModel(): DataTableModel {
    return {
      hiddenHeaderActions: true,
      columns: [
        {
          id: 'name',
          displayName: '名称'
        },
        {
          id: 'type',
          displayName: '类型'
        },
        {
          id: 'routerPort',
          displayName: '路由端口'
        },
        {
          id: 'macAddress',
          displayName: 'MAC地址'
        },
        {
          id: 'ipAddresses',
          displayName: 'IP地址'
        },
        {
          id: 'networks',
          displayName: '网络'
        }
      ]
    }
  }

  getDeviceNatListTableModel(): DataTableModel {
    return {
      hiddenHeaderActions: true,
      columns: [
        {
          id: 'type',
          displayName: '类型',
          maxWidth: '80px'
        },
        {
          id: 'logicalIp',
          displayName: '逻辑IP'
        },
        {
          id: 'externalIp',
          displayName: '外部IP'
        },
        {
          id: 'logicalPort',
          displayName: '逻辑端口',
          maxWidth: '80px'
        },
        {
          id: 'externalMac',
          displayName: '外部MAC',
          maxWidth: '80px'
        }
      ]
    }
  }
}