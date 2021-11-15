import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface BasicModal {
  title: string;
  content?: string;
  template?: TemplateRef<any>;
  showSubmitBtn?: boolean;
  showConfirmBtn?: boolean;
  showCancelBtn?: boolean;
  size?: string; // default small, medium large
  data?: any;
  formGroup?: FormGroup;
}

export interface ApplicationModal {
  title: string;
  data?: any;
  parentForm?: FormGroup;
}
