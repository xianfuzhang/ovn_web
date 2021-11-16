export interface InputModel {
  id?: string; // used in the form
  type?: string;  // default text, password, search
  labelValue?: string;
  labelPosition?: string; // default horizontal, vertical
  placeholder?: string;
  disable?: boolean; // default false
  required?: boolean; //default false
  pattern?: string;
  hint?: string;
  errorHint?: string;
  content?: any;
}