import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { TreeTopoComponent } from './treeTopo.component';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { MessageModel } from '../../core/models/message';
import { TopoHandler } from './topo.handler';
import { NotifyService } from '../../core/services/notify.service';
import { TopoDeviceNode } from '../../core/models/device';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('treeTopo') treeTopo: TreeTopoComponent;
  messageSubscription: Subscription;
  loading$: Observable<boolean>;
  detailLoading$: Observable<boolean>;
  data$: Observable<any[]>;
  previousNode: TopoDeviceNode;

  constructor(
    private topoHandler: TopoHandler,
    private toastr: NotifyService) { }

  ngOnInit(): void {
    this.topoHandler.getDeviceLinkData();
    this.loading$ = this.topoHandler.loading$;
    this.detailLoading$ = this.topoHandler.detailLoading$;
    this.data$ = this.topoHandler.data$;
    this.messageSubscription = this.topoHandler.message$
      .subscribe((res: MessageModel) => {
        if (res.content) {
          switch (res.level) {
            case 'error':
              this.toastr.error(res.content['message'], res.title);
              break;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  showTopoDetail(data): void {
    if (this.previousNode && this.previousNode.id === data.id) {
      return;
    }
    this.previousNode = data;
    this.sidenav.open();
    setTimeout(() => {
      this.treeTopo.resize();
    }, 500);
    this.topoHandler.getDeviceDetail(data);
  }

  hiddenTopoDetail(): void {
    this.sidenav.close();
    setTimeout(() => {
      this.treeTopo.resize();
    }, 500);
  }

}
