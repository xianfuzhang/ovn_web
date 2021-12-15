import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
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
  @Input('data') data: any[];
  selectedTabIndex: number = 0;
  portTableModel: DataTableModel;
  natTableModel: DataTableModel;

  constructor(private topoHelper: TopoHelper) {
    this.portTableModel = this.topoHelper.getDevicePortListTableModel();
    this.natTableModel = this.topoHelper.getDeviceNatListTableModel();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
  }
}