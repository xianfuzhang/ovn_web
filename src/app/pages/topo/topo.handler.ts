import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, throwError, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Device, Link } from '../../core/models/device';
import { MessageModel } from '../../core/models/message';
import { DeviceService } from '../../core/https/device';

@Injectable({
  providedIn: 'root'
})
export class TopoHandler implements OnDestroy {
  private _data = new BehaviorSubject<any>([]);
  private _loading = new BehaviorSubject<boolean>(true);
  private _message = new Subject<MessageModel>();
  readonly data$: Observable<any> = this._data.asObservable();
  readonly loading$: Observable<boolean> = this._loading.asObservable();
  readonly message$: Observable<MessageModel> = this._message.asObservable();
  private dataStore = { data: [] };

  constructor(private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this._data.unsubscribe();
    this._message.unsubscribe();
    this._loading.unsubscribe();
  }

  getDeviceLinkData() {
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

}