import { Component, Inject, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ComponentRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';
import { BasicModal } from '../../models/modal';
import { ModalOverlayRef } from './overlay-ref.service';
import { MODAL_DATA, CHILD_FORM } from './modal.token';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { BaseModal } from './modal.base';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss']
})
export class BasicModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public model: BasicModal,
    private dialogRef: MatDialogRef<BasicModalComponent>) {
  }

  ngOnInit(): void {
    // console.log(this.data);
  }
}

@Component({
  selector: 'app-application-modal',
  templateUrl: './application-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss']
})
export class ApplicationModalComponent implements AfterViewInit, OnDestroy {
  modalOutlet: ComponentPortal<any>;
  title: string;
  parentForm = new FormGroup({});
  formInvalid: boolean = true;

  private componentRef: ComponentRef<BaseModal>;

  constructor(
    @Inject(MODAL_DATA) public data: any,
    private ref: ModalOverlayRef) {
    this.title = data.title;
  }

  ngAfterViewInit(): void {
    // this.parentForm.statusChanges.subscribe((validity: string) => {
    //   this.formInvalid = validity === 'VALID' ? false : true;
    // });
    // this.parentForm.valueChanges.subscribe((result) => {
    //   console.log('value change ..' + JSON.stringify(result));
    // })
  }

  close() {
    this.ref.close(null);
  }


  validAllForm(formGroup: FormGroup | FormArray | FormControl) {
    if (formGroup instanceof FormArray) {
      for (let i in formGroup) {
        const group: FormGroup = formGroup.at(parseInt(i)) as FormGroup;
        this.validAllForm(group);
      }
    } else if (formGroup instanceof FormGroup) {
      for (let key in formGroup) {
        const control: FormControl = formGroup.get(key) as FormControl;
        this.validAllForm(control);
      }
    } else if (formGroup instanceof FormControl) {
      formGroup.markAsTouched();
      formGroup.updateValueAndValidity();
    }
    // for (let i in formGroup.controls) {
    //   const absControl = formGroup.at(i);//.controls[i];
    //   if (absControl instanceof FormControl) {
    //     const control: FormControl = formGroup.controls[i];
    //     control.markAsTouched();
    //     control.updateValueAndValidity();
    //   } else if (absControl instanceof FormGroup) {
    //     const group: FormGroup = formGroup.controls[i];
    //     this.validAllForm(group);
    //   } else if (absControl instanceof FormArray) {
    //     const formArray: FormArray = formGroup.controls[i];
    //     this.validAllForm(formArray);
    //   }
    // }
  }

  submit(): void {
    if (this.parentForm.status !== 'VALID') {
      this.validAllForm(<FormGroup>this.parentForm.get(CHILD_FORM));
      return;
    }

    if (this.componentRef && this.componentRef.instance && this.componentRef.instance.submit) {
      this.componentRef.instance.submit().subscribe(
        (res) => {
          this.ref.close(res);
        },
        (err) => {
          this.ref.error(err);
        }
      )
    } else {
      this.ref.error("No submit function.");
    }

  }

  receiveReference(ref: ComponentRef<any>) {
    this.componentRef = ref;
  }

  ngOnDestroy(): void {
    this.ref.close(null);
    // this.parentForm = null;
  }
}

