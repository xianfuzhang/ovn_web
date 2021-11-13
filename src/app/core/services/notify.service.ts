import { Injectable, TemplateRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { IndividualConfig } from "ngx-toastr/toastr/toastr-config";
import { Observable } from "rxjs";
import { BasicModalService } from "../components/modal/modal.service";
import { BasicModal } from "../models/modal";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse, HttpResponseBase } from "@angular/common/http";

export interface CallBackModel {
  callback?: Function;
  thisObj?: any;
  arg?: any;
}

const WARNING_CONFIG = {
  closeButton: true,
  easeTime: 500,
  extendedTimeOut: 0,
  timeOut: 4000,
  tapToDismiss: false
}

const SUCCESS_CONFIG = {
  closeButton: true,
  easeTime: 500,
  extendedTimeOut: 500,
  timeOut: 1500,
  tapToDismiss: true
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(private toastr: ToastrService,
              private baseModal: BasicModalService) {
  }

  success(message?: string, title?: string, override: Partial<IndividualConfig> = SUCCESS_CONFIG) {
    return this.toastr.success(message, title, override);
  }

  clear(){
    this.toastr.clear();
  }

  error(message?: HttpErrorResponse | string, title?: string, override: Partial<IndividualConfig> = WARNING_CONFIG) {
    if (message instanceof HttpResponseBase) {
      if(message.status == 401){
        return null;
      }
      return this.toastr.error(message.error.message || message.message, title, override);
    } else {
      return this.toastr.error(message, title, override);
    }
  }

  warning(message?: string, title?: string, override: Partial<IndividualConfig> = WARNING_CONFIG): any {
    return this.toastr.warning(message, title, override);
  }

  simpleNotify(observable: Observable<any>,
               afterSuccessFunction?: Function,
               thisArg?: any,
               successInfo?: string,
               errorTitle?: string) {
    observable.subscribe(res => {
      if (successInfo) {
        this.toastr.success(successInfo);
      }
      if (afterSuccessFunction) {
        afterSuccessFunction.call(thisArg);
      }
    }, error => {
      this.error(error, errorTitle);
    })
  }

  /*
   * Error Message:
   *      Content come from backend.
   *      Title is set by user.
   * Callback:
   *      Only support one success callback and one fail callback.
   */
  simpleConfirmAndNotify(confirmTitle: string,
                         confirmContent: string,
                         observable: Observable<any>,
                         successCallBack: CallBackModel,
                         failedCallBack: CallBackModel,
                         successInfo?: string) {
    // this.baseModal.openBasicDialog()
    const model: BasicModal = {
      title: confirmTitle,
      content: confirmContent,
      showCancelBtn: true,
      showConfirmBtn: true
    }
    this.baseModal
      .openBasicDialog(model)
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          observable.subscribe(res => {
            if (successInfo) {
              this.toastr.success(successInfo);
            }
            if (successCallBack) {
              successCallBack.callback?.call(successCallBack.thisObj, successCallBack.arg);
            }
          }, error => {
            this.error(error, confirmTitle);
            if (failedCallBack) {
              failedCallBack.callback?.call(failedCallBack.thisObj, failedCallBack.arg);
            }
          })
        }
      });
  }


  simpleConfirmWithoutNotify(confirmTitle: string,
                             confirmContent: string,
                             callBack: CallBackModel) {
    const model: BasicModal = {
      title: confirmTitle,
      content: confirmContent,
      showCancelBtn: true,
      showConfirmBtn: true
    }
    this.baseModal
      .openBasicDialog(model)
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          callBack.callback?.call(callBack.thisObj, callBack.arg);
        }
      });
  }

// observable: Observable<any>,
  simpleModalWithNotify(title: string,
                        template: TemplateRef<any>,
                        formGroup: FormGroup,
                        observableCallback: CallBackModel,
                        successCallBack: CallBackModel,
                        failedCallBack: CallBackModel,
                        successInfo?: string) {
    let diagModel: BasicModal = {
      title: title,
      template: template,
      size: 'small',
      showCancelBtn: true,
      showSubmitBtn: true,
      formGroup: formGroup
    }
    this.baseModal
      .openBasicDialog(diagModel)
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          observableCallback.callback?.call(observableCallback.thisObj, formGroup.getRawValue())
            .subscribe(() => {
              if (successInfo) {
                this.toastr.success(successInfo);
              }
              if (successCallBack) {
                successCallBack.callback?.call(successCallBack.thisObj, successCallBack.arg);
              }
            }, () => {
              // this.error(error, title);
              if (failedCallBack) {
                failedCallBack.callback?.call(failedCallBack.thisObj, failedCallBack.arg);
              }
            })
        }
      });
  }
}
