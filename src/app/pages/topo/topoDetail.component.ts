import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataTableModel } from '../../core/models/data-table';
import { TopoDeviceNode } from '../../core/models/device';
import { TopoHelper } from './topoHelper';

@Component({
  selector: 'topo-detail',
  templateUrl: './topoDetail.component.html',
  styleUrls: ['./topo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopoDetailComponent implements OnInit, OnDestroy {
  @Input('device') device: TopoDeviceNode;
  @Input('loading') loading$: Observable<boolean>;
  selectedTabIndex: number = 0;
  _tableModel: BehaviorSubject<DataTableModel>;
  tableModel$: Observable<DataTableModel>;
  data: [] = [];

  constructor(private topoHelper: TopoHelper) { }

  ngOnInit(): void {
    const model = this.topoHelper.getDevicePortListTableModel();
    this._tableModel = new BehaviorSubject<DataTableModel>(model);
    this.tableModel$ = this._tableModel.asObservable();
  }

  ngOnDestroy(): void {
    this._tableModel.unsubscribe();
  }

  changeTab($event): void {
    this.selectedTabIndex = $event.index;
    let model;
    switch ($event.index) {
      case 0:
        model = this.topoHelper.getDevicePortListTableModel();
        break;
      case 1:
        model = this.topoHelper.getDeviceNatListTableModel();
        break;
    }
    this._tableModel.next(model);
  }
}