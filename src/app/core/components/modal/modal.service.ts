import { Injectable, TemplateRef, ComponentRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BasicModal } from '../../models/modal';
import { BasicModalComponent, ApplicationModalComponent } from './modal.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { ModalOverlayRef } from './overlay-ref.service';
import { MODAL_DATA, PARENT_FORM } from './modal.token';

@Injectable({
  providedIn: 'root'
})
export class BasicModalService {
  private dialogRef: MatDialogRef<BasicModalComponent>;
  constructor(public dialog: MatDialog) { }

  openBasicDialog(model: BasicModal, additionalDialogConfigData?: any)
    : MatDialogRef<BasicModalComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(BasicModalComponent, {
      panelClass: 'basic-modal',
      maxWidth: '90%',
      data: model,
      ...additionalDialogConfigData
    });
    this.dialogRef.addPanelClass(model.size || 'small')
    return this.dialogRef;
  }
}


@Injectable({
  providedIn: 'root'
})
export class ApplicationModalService {
  dialogComponentRef: ComponentRef<any>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private  componentFactoryResolver: ComponentFactoryResolver) {}

  open<R = any, T = any>(
    content: string | TemplateRef<any> | any,
    data: any
  ): ModalOverlayRef<R>  {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'modal-background',
      panelClass: 'application-overlay-wrapper'
    });
    const overlayRef = this.overlay.create(configs);
    const modalOverlayRef = new ModalOverlayRef<R, T>(overlayRef);
    const parentInjector = this.createInjector(modalOverlayRef, data);
    const parentComponent = new ComponentPortal(ApplicationModalComponent, null, parentInjector);
    const componentRef = overlayRef.attach(parentComponent);
    const parentForm = componentRef.instance.parentForm;
    data[PARENT_FORM] = parentForm;
    const childInjector = this.createInjector(modalOverlayRef, data);
    const childComponent = new ComponentPortal(content, null, childInjector);
    componentRef.instance.modalOutlet = childComponent;
    return modalOverlayRef;
  }

  private createInjector(ref: ModalOverlayRef, data: any) {
    const injectorTokens = new WeakMap();
    injectorTokens.set(MODAL_DATA, data);
    injectorTokens.set(ModalOverlayRef, ref);
    return new PortalInjector(this.injector, injectorTokens);
  }
}