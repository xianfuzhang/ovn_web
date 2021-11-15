import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { OverlayRef } from "@angular/cdk/overlay";

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

@Injectable({
  providedIn: 'root'
})
export class ModalOverlayRef<R = any, T = any> {
  afterClose$ = new Subject<OverlayCloseEvent<R>>();

  constructor(public overlay: OverlayRef) {
    // this.overlay.backdropClick().subscribe(() => {
    //   this._close('backdropClick', null);
    // });
  }

  public error(err: any) {
    this.afterClose$.error(err);
    this.afterClose$.complete();
    this.overlay.dispose();
  }

  public close(data?: R) {
    data = data ? data : {} as R;
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data: R) {
    this.afterClose$.next({type: type, data: data});
    this.afterClose$.complete();
    this.overlay.dispose();
  }

  public subscribe(next?: (value: OverlayCloseEvent<R>) => void,
                   error?: (error: any) => void): Subscription {
    let subscription = this.afterClose$.subscribe(
      (res) => next ? next(res) : () => {
      },
      err => error ? error(err) : () => {
      });
    return subscription;
  }
}
