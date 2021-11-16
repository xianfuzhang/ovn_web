import { TemplateRef } from '@angular/core';
export interface Column  {
  id: string;
  displayName: string;
  maxWidth?: string; // eg. '180px'
  minWidth?: string; // eg. '300px'
  sort?: string; //default asc, desc, disabled,
  visible?: boolean; //default true, false
  style?: any; //default true, false
  customCellTemplate?: TemplateRef<any>; // custom cell template
  customSort?: boolean; //ip, date等不适于string排序，需要自己定义排序逻辑
  filterTool?: boolean; // default false.
}
export interface DataTableModel {
  columns: Column[],
  sortSupport?: boolean; //default true
  selectionSupport?: boolean; //default false
  expandRowSupport?: boolean; //default false
  backendPagination?: boolean; // default false
  expandRowTemplate?: TemplateRef<any>; // custom row template
  hiddenHeaderActions?: boolean; // table inline
  hiddenSearch?: boolean;
  hiddenRefresh?: boolean;
  actionsTemplate?: TemplateRef<any>; // custom self table action
}
