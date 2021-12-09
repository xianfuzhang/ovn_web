import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { MessageModel } from '../../core/models/message';
import { TopoHandler } from './topo.handler';
import { NotifyService } from '../../core/services/notify.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit, OnDestroy {
  messageSubscription: Subscription;
  loading$: Observable<boolean>;
  data$: Observable<any[]>;

  constructor(
    private topoHandler: TopoHandler,
    private toastr: NotifyService) { }

  ngOnInit(): void {
    this.topoHandler.getDeviceLinkData();
    this.loading$ = this.topoHandler.loading$;
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

}
