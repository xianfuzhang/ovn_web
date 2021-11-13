import { InjectionToken } from '@angular/core';
import { ApplicationModal } from '../../models/modal';

export const MODAL_DATA = new InjectionToken<ApplicationModal>('MODAL_DATA');
export const PARENT_FORM = 'parentForm'
export const CHILD_FORM = 'childForm';