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
          id: 'ipAddress',
          displayName: 'IP地址'
        },
        {
          id: 'network',
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
          displayName: '类型'
        },
        {
          id: 'logicalIP',
          displayName: '逻辑IP'
        },
        {
          id: 'externalIP',
          displayName: '外部IP'
        },
        {
          id: 'logicalPort',
          displayName: '逻辑端口'
        },
        {
          id: 'externalMac',
          displayName: '外部MAC'
        }
      ]
    }
  }
}