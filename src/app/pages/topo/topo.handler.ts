import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, throwError, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessageModel } from '../../core/models/message';
import { DeviceService } from '../../core/https/device';

@Injectable({
  providedIn: 'root'
})
export class TopoHandler implements OnDestroy {
  private _data = new BehaviorSubject<any>([]);
  private _detailData = new BehaviorSubject<any>([]);
  private _loading = new BehaviorSubject<boolean>(true);
  private _detailLoading = new BehaviorSubject<boolean>(true);
  private _message = new Subject<MessageModel>();
  readonly data$: Observable<any> = this._data.asObservable();
  readonly detailData$: Observable<any> = this._detailData.asObservable();
  readonly loading$: Observable<boolean> = this._loading.asObservable();
  readonly detailLoading$: Observable<boolean> = this._detailLoading.asObservable();
  readonly message$: Observable<MessageModel> = this._message.asObservable();
  private dataStore = { data: [] };

  constructor(private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this._data.unsubscribe();
    this._detailData.unsubscribe();
    this._message.unsubscribe();
    this._loading.unsubscribe();
  }

  getDeviceLinkData(): void {
    this._loading.next(true);
    const device = this.deviceService.getDeviceList()
      .pipe(
        map(res => res['devices']),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        })
      );
    const link = this.deviceService.getLinkList()
      .pipe(
        map(res => res['links']),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        })
      );
    combineLatest([device, link])
      .pipe(
        catchError((error) => {
          this._message.next({ level: 'error', content: error });
          return of([[], []])
        })
      )
      .subscribe(([devices, links]) => {
        this._loading.next(false);
        this.dataStore.data = [devices, links];
        this._data.next(JSON.parse(JSON.stringify(this.dataStore.data)));
      });
  }

  getDeviceDetail(device: object): void {
    this._detailLoading.next(true);
    const combine: Observable<any>[] = [];
    const port = this.deviceService.getDevicePortList(device['id'])
      .pipe(
        map(res => res['ports']),
        catchError((error) => {
          this._message.next({ level: 'error', content: error });
          return of([]);
        })
      );
    combine.push(port);
    if (device['type'] === 'router') {
      const nat = this.deviceService.getDeviceNatList(device['id'])
        .pipe(
          map(res => res['nats']),
          catchError((error) => {
            this._message.next({ level: 'error', content: error });
            return of([]);
          })
        );
      combine.push(nat);
    }
    combineLatest(combine)
      .subscribe((res) => {
        this._detailLoading.next(false);
        console.log(res);
        this._detailData.next(res);
      });
  }
}