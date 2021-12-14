import {
  Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange,
  AfterViewInit, ViewChild, ElementRef, TemplateRef, OnDestroy
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelfDataSource } from './dataSource';
import { DataTableModel, Column } from '../../models/data-table';
import { InputModel } from '../../models/input';
import { TableAnimations } from './table-animations';
import { Observable } from 'rxjs';
import { AuthService } from "../../services/auth.service";

const DISPLAY_COLUMN_EXPAND = 'expand';
const DISPLAY_COLUMN_SELECT = 'select';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    TableAnimations.expendSwitch,
    // TableAnimations.detailExpand,
    TableAnimations.detailContent,
    TableAnimations.actionExpand
  ],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('matTable', {static: true}) matTable: ElementRef;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() model: DataTableModel;
  @Input('data') originData$: Observable<any> | any[];
  @Input('loadingStatus') loadingStatus$: Observable<boolean>;
  @Input() showPaginator: boolean;
  @Input() customPageSize: number;
  @Output() deleteEmmiter = new EventEmitter<any>();
  @Output() refreshEmmiter = new EventEmitter<any>();
  @Output() paginationEmmiter = new EventEmitter<any>();
  tableModel: DataTableModel = {
    columns: []
  };
  columnsToDisplay: string[] = [];
  dataSource = new SelfDataSource([]);

  toggleFilterFlag: boolean = false;
  toggleCustomizeFlag: boolean = false;
  initialSelection = [];
  allowMultiSelect: boolean = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  paginationParams = {
    filter: '',
    sort: {},
    pageIndex: 0,
    pageSize: 10
  };
  filteredDataLength: number = 0;

  search: InputModel = {
    type: 'search',
    placeholder: '搜索'
  };
  expandedElement = null;
  loading: boolean = true;
  // isGuest: boolean = false;

  // for column Cell Filter Selector using
  searchResult: string = '';
  columnFilterStorage: any = {};
  columnFilterSelectorOpened: string = 'no-one-opened';
  columnCellFilterFormCheckBoxAllCompleted: any = { };
  originFilterPredicate = this.dataSource.filterPredicate;

  constructor(
              private authService: AuthService,
              private elementRef: ElementRef) {
    // this.isGuest = this.authService.isGuestUser();
  }

  ngOnInit(): void {
    if (!this.model) return;
    this.tableModel.sortSupport = this.model.sortSupport === undefined ? true : this.model.sortSupport;
    this.tableModel.hiddenHeaderActions = this.model.hiddenHeaderActions || false;
    this.tableModel.hiddenSearch = this.model.hiddenSearch || false;
    this.tableModel.hiddenRefresh = this.model.hiddenRefresh || false;
    this.tableModel.expandRowSupport = this.model.expandRowSupport || false;
    this.tableModel.selectionSupport = this.model.selectionSupport || false;
    // if(this.isGuest) this.tableModel.selectionSupport = false;
    this.tableModel.backendPagination = this.model.backendPagination || false;
    this.dataSource.backendPagination = this.tableModel.backendPagination;

    this.initTableColumns(this.model.columns);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.originData$ instanceof Array) {
      this.dataSource.data = this.originData$;
      this.getColumnCellFilterOpionList(this.dataSource.data);
      this.filteredDataLength = this.dataSource.filteredData.length;
    } else {
      this.originData$ && this.originData$.subscribe((data) => {
        if (this.dataSource.fromBackendData) {
          this.dataSource.data = data.data;
          this.filteredDataLength = data.count;
        } else {
          this.dataSource.data = data;
          this.filteredDataLength = this.dataSource.filteredData.length;
        }
        this.getColumnCellFilterOpionList(this.dataSource.data);
      });
    }

    if (this.loadingStatus$) {
      this.loadingStatus$.subscribe((value) => {
        this.loading = value;
      });
    } else {
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    // if user clicks out of Column Filter Selector feild, close Column Filter Selector
    document.addEventListener('click', this.closeColumnFilterSelector.bind(this));
    // when window is resized, close Column Filter Selector
    window.addEventListener('resize', () => {this.columnFilterSelectorOpened = 'no-one-opened'});
    // stop Propagation when filter Icon is clicked
    this.filterIconEventListener();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.originData$ && this.originData$ instanceof Array) {
      if (this.dataSource.fromBackendData) {
        this.dataSource.data = changes.originData$.currentValue.data;
        this.filteredDataLength = changes.originData$.currentValue.count;
      } else {
        this.dataSource.data = changes.originData$.currentValue || [];
        this.filteredDataLength = this.dataSource.data.length;
      }
      this.getColumnCellFilterOpionList(this.dataSource.data);
    }
    if (changes.model) {
      this.tableModel.expandRowSupport = changes.model.currentValue && changes.model.currentValue.expandRowSupport || false;
      this.initTableColumns(changes.model.currentValue && changes.model.currentValue.columns || []);
    }
  }

  ngOnDestroy(): void {
    this.onDestroyFilterToolSetting();
  }

  initTableColumns(columns: Column[]): void {
    this.columnsToDisplay = [];
    this.tableModel.columns = [];
    columns.forEach((item: Column) => {
      item.sort = item.sort || 'asc';
      item.visible = item.visible === undefined ? true : item.visible;
      // if((item.id.toLowerCase() == 'actions' && !this.isGuest) || item.id.toLowerCase() != 'actions'){
      this.tableModel.columns.push(item);
      if (item.visible) this.columnsToDisplay.push(item.id);
      // }
      // initial for Column Cell Filter Opion List -- start
      if (item.filterTool == true) {
        this.columnFilterStorage[item.id] = [];
        this.columnCellFilterFormCheckBoxAllCompleted[item.id] = false;
      }
      // initial for Column Cell Filter Opion List -- end
    });
    if (this.tableModel.selectionSupport) this.columnsToDisplay.unshift(DISPLAY_COLUMN_SELECT);
    if (this.tableModel.expandRowSupport) this.columnsToDisplay.push(DISPLAY_COLUMN_EXPAND);
  }

  columnVisibleChange(item: Column): void {
    if (item.visible) {
      this.columnsToDisplay = this.refreshDisplayColumns();
    } else {
      const index = this.columnsToDisplay.indexOf(item.id);
      if (index > -1) {
        this.columnsToDisplay.splice(index, 1);
      }
    }
  }

  refreshDisplayColumns() {
    const temp: string[] = [];
    this.tableModel.columns.forEach((item) => {
      if (item.visible) {
        temp.push(item.id);
      }
    })
    if (this.tableModel.selectionSupport) temp.unshift(DISPLAY_COLUMN_SELECT);
    if (this.tableModel.expandRowSupport) temp.push(DISPLAY_COLUMN_EXPAND);
    return temp;
  }

  toggleFilter(): void {
    this.toggleFilterFlag = !this.toggleFilterFlag;
    this.toggleCustomizeFlag = false;
  }

  toggleCustomize(): void {
    this.toggleCustomizeFlag = !this.toggleCustomizeFlag;
    this.toggleFilterFlag = false;
  }

  getSearchResult(event: any): void {
    this.searchResult = event;
    // If Column-Cell-Filter used, FromBackendData won't sent paginationParamsinfo, and paginationParamsinfo would be wrong //
    if (Object.keys(this.columnFilterStorage).length !== 0) {
      if (event == null || event === '') {
        this.dataSource.filter = '◬'; // Because this.dataSource.filter ='' would not go through Filter Predicate Function
      } else {
        this.dataSource.filter = event;
      }
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.filteredDataLength = this.dataSource.filteredData.length;
      return;
    }

    if (this.dataSource.fromBackendData) {  
      if (event == null || event === '') {
        this.paginationParams['filter'] = '';
      } else {
        this.paginationParams['filter'] = event;
      }
      this.paginationEmmiter.emit(this.paginationParams);
    } else {
      this.dataSource.filter = event;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.filteredDataLength = this.dataSource.filteredData.length;
    }
  }

  getPagination() {
    return this.paginationParams;
  }

  updateColumnTemplateRef(id: string, ref: TemplateRef<any>) {
    this.tableModel.columns.forEach(col => {
      if(col.id == id){
        col.customCellTemplate = ref;
      }
    })
  }

  sortData(sort: Sort): void {
    if (this.dataSource.fromBackendData) {
      if (sort.active && sort.direction !== '') {
        this.paginationParams['sort'] = {
          name: sort.active,
          direction: sort.direction
        }
      } else {
        this.paginationParams['sort'] = {}
      }
      this.paginationEmmiter.emit(this.paginationParams);
    } else {
      const col = this.tableModel.columns.find(col => col.id === sort.active);
      if (col && col.customSort) {
        this.dataSource.customSortColumn = true;
      } else {
        this.dataSource.customSortColumn = false;
      }
    }
  }

  pagination(event: any): void {
    if (this.dataSource.fromBackendData) {
      this.paginationParams['pageIndex'] = event.pageIndex;
      this.paginationParams['pageSize'] = event.pageSize;
      this.paginationEmmiter.emit(this.paginationParams);
    }
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator.pageSize;//this.dataSource.data.length;
    return numSelected == numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const sliceData = this.dataSource.data.slice(startIndex, startIndex + this.paginator.pageSize);
    this.isAllSelected() ?
      this.selection.clear() :
      sliceData.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any | null): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  clickRow(rowElement: any): void {
    if (!this.tableModel.expandRowSupport) return;
    this.expandedElement = this.expandedElement === rowElement ? null : rowElement;
  }

  // pageChange(event): void {
  //   console.log(event);
  // }

  // renderRows(): void {
  //   console.log('table will not automatically check for changes to the data array.when objects are added, removed, or moved on the data array, you can trigger an update to the tables rendered rows')
  // }

  batchRemove(): void {
    if (!this.selection.hasValue()) return;
    this.deleteEmmiter.emit(this.selection.selected);
    this.selection.clear();
  }

  refresh(): void {
    this.selection.clear();
    if (this.dataSource.fromBackendData) {
      this.refreshEmmiter.emit(this.paginationParams);
    } else {
      this.refreshEmmiter.emit();
    }
  }

  // set Column Filter Icon Event Listener
  filterIconEventListener() {
    setTimeout( () => {
      this.tableModel.columns.forEach((item) => {
        if (item.filterTool && item.filterTool === true) {
          document.getElementById(item.id)?.addEventListener('click', (e) => { e.stopPropagation(); }, false); // 阻止冒泡事件傳遞
        }
      });
    }, 0);
  }

  // open Column Filter Selector
  openColumnFilterSelector($columnId: string) {
    if (this.columnFilterSelectorOpened === $columnId) {
      this.columnFilterSelectorOpened = 'no-one-opened';
    } else {
      // open column Id
      this.columnFilterSelectorOpened = $columnId;
      setTimeout( () => {
      //set filter Option List position
      let filterOptionListElement = document.getElementById(`${$columnId}FilterList`);
      const element = document.getElementById($columnId);
      const elementPosition = this.getElementPosition(element);
      let tableElement = this.getElementBelongsToClass(element, 'mat-data-table');
      tableElement.style.position = 'relative';
      const tableElementPosition = this.getElementPosition(tableElement);
      // set style to filterOptionListElement
      // let adjustHeightByHeaderActions = 0;
      // if (this.tableModel.hiddenHeaderActions == true ) {
      //   adjustHeightByHeaderActions = 0;
      // }
      if (filterOptionListElement) {
        filterOptionListElement.style.display = 'block';
        filterOptionListElement.style.top = `${elementPosition.y - tableElementPosition.y + 30}px`;
        filterOptionListElement.style.left = `${elementPosition.x - tableElementPosition.x - 20}px`;
      }
      }, 0);
    }
  }

  // close Column Filter Selector  *only used by addEventListener
  closeColumnFilterSelector($eventElement: MouseEvent) {
    if (this.columnFilterSelectorOpened === 'no-one-opened') { return; }
    // if class of the selected elememt is 'columnCellFilterForm', keep Column Filter Selector open.
    // otherwise, check if the selected elememt belongs to target elememt(Opened-Filter-List), if false, close Column Filter Selector
    const element: Element = $eventElement.target as HTMLElement;
    let classList: string[] = [];
    if (element) {
      classList = Array.from(element.classList);
    } else {
      classList = [];
    }
    if (!classList.includes('columnCellFilterForm')){
      const filterOptionListElement = document.getElementById(`${this.columnFilterSelectorOpened}FilterList`);
      let selectedElememt = $eventElement.srcElement ;
      let isInTarget = false;
      if (filterOptionListElement) {
        isInTarget = this.isInTargetNode(selectedElememt, filterOptionListElement)
      }
      if (isInTarget === false) { 
        this.columnFilterSelectorOpened = 'no-one-opened'; 
      }
    }
  }

  // check if the selected elememt belongs to target elememt
  isInTargetNode(element: any, targetElement: HTMLElement): boolean{ //elemet是被點選元素，判斷是否在目標targetElement中
    if(!element || element === document) { return false; }
    return element === targetElement ? true : this.isInTargetNode(element.parentNode, targetElement);
  }

  // get parent element of speciy elememt and that should belong to Specified class
  getElementBelongsToClass(_element: any, SpecifiedClass: string): HTMLElement{ 
    let element = _element;
    if(!element || element === document) { return document.getElementsByClassName(SpecifiedClass)[0] as HTMLElement; }
    let classList = Array.from(element.classList) || [];
    if (classList.includes(SpecifiedClass)){
      return element;
    } else {
      return this.getElementBelongsToClass(element.parentElement, SpecifiedClass);
    }
  }

  // generate column Filter List Id
  getColumnFilterListId($columnId: string): string {
    return `${$columnId}FilterList`;
  }

  //display Column Filter Form
  displayColumnCellFilterForm($columnId: string) {
    return this.columnFilterSelectorOpened == $columnId;
  }

  getElementPosition (element: any) {
    var x = 0;
    var y = 0;
    while ( element ) {
      x += element.offsetLeft - element.scrollLeft + element.clientLeft;
      y += element.offsetTop - element.scrollLeft + element.clientTop;
      element = element.offsetParent;
    }
    return { x: x, y: y };
  }

  getColumnCellFilterOpionList(data) {
    if(!data) { return; }
    if (Object.keys(this.columnFilterStorage).length === 0) { return; }
    const filterToolColumnList = Object.keys(this.columnFilterStorage);
    for ( let columnIndex = 0; columnIndex < filterToolColumnList.length; columnIndex++ ) {

      let _opionList = [];
      for ( let i = 0; i < data.length; i++) {
        _opionList.push(data[i][filterToolColumnList[columnIndex]]);
      }
      const opionList = [...new Set(_opionList)];
      for ( let i = 0; i < opionList.length; i++) {
        if(!opionList[i] && opionList[i] != 0) {
          opionList[i] = {
            'name': ' ',
            'completed': true 
          };
        } else {
          opionList[i] = {
            'name': opionList[i].toString(),
            'completed': true 
          };
        }
      }
      this.columnFilterStorage[filterToolColumnList[columnIndex]] = opionList;
      this.columnCellFilterFormCheckBoxAllCompleted[filterToolColumnList[columnIndex]] = true;
    }
    this.dataSource.filterPredicate = this.updateFilterPredicateFunction().bind(this);
    this.updateDataWithColumnCellFilter();
  }

  updateColumnCellFilterFormCheckBoxAllComplete(columnId: string) {
    this.columnCellFilterFormCheckBoxAllCompleted[columnId] = this.columnFilterStorage[columnId] != null && this.columnFilterStorage[columnId].every(option => option.completed);
    this.updateDataWithColumnCellFilter();
  }

  someColumnCellFilterFormCheckBoxComplete(columnId: string): boolean {
    if (this.columnFilterStorage[columnId] == null) {
      return false;
    }
    return this.columnFilterStorage[columnId].filter(option => option.completed).length > 0 && !this.columnCellFilterFormCheckBoxAllCompleted[columnId];
  }

  setAllColumnCellFilterFormCheckBoxComplete(isCompleted: boolean, columnId: string) {
    if (this.columnFilterStorage[columnId] == null) {
      return;
    }
    this.columnFilterStorage[columnId].forEach(option => option.completed = isCompleted);
    //update data first, then update status and refresh filtered data
    this.columnCellFilterFormCheckBoxAllCompleted[columnId] = isCompleted;
    this.updateDataWithColumnCellFilter();
  }

  updateDataWithColumnCellFilter() {
    if(this.searchResult === '') {
      this.getSearchResult('◬'); // angular official used '◬'; Because '' would not go through Filter Predicate Function
    } else {
      this.getSearchResult(this.searchResult);
    }
  }

  updateFilterPredicateFunction() {
    const updatedFilterPredicate = function(data, filter: string) :boolean {
      let isPicked: boolean;
      // handle filter Tool Column -- start
      let isPickedBetweenColumn: boolean = true; // if true, this data should be in the INTERSECTION between columns
      const filterToolColumnList = Object.keys(this.columnFilterStorage) || [];
      if (filterToolColumnList.length > 0) {
        for ( let columnIndex = 0; columnIndex < filterToolColumnList.length; columnIndex++ ) {
          const columnName = filterToolColumnList[columnIndex];          
          let isPickedWithinColumn: boolean = false; // if true, this data should be in the UNION of options selected
          let dataValue = (!data[columnName] &&  (data[columnName] != 0)) ? ' ' : data[columnName].toString();
          for ( let optionIndex = 0; optionIndex < this.columnFilterStorage[columnName].length; optionIndex++ ) {
            if (this.columnFilterStorage[columnName][optionIndex].completed === true && this.columnFilterStorage[columnName][optionIndex].name) {
              isPickedWithinColumn = isPickedWithinColumn || dataValue.toString().toLowerCase() === this.columnFilterStorage[columnName][optionIndex].name.toString().toLowerCase();
            }
          } // now, already gotten updated 'isPickedWithinColumn'
          isPickedBetweenColumn = isPickedBetweenColumn && isPickedWithinColumn;
        }
      }
      // handle filter Tool Column -- end

      // handle searching Filter -- start
      let isPickedBySearching: boolean = true;
      const dataStr = // Transform the data into a lowercase string of all property values
        Object.keys(data)
          .reduce(( (currentTerm, key) => {
              return currentTerm + (data)[key] + '◬'; // angular official used '◬';
          } ), '').toLowerCase();

      const transformedFilter = filter.trim().toLowerCase();
      isPickedBySearching = dataStr.indexOf(transformedFilter) != -1;
      // handle searching Filter -- end

      isPicked = isPickedBetweenColumn && isPickedBySearching;
      return isPicked;
    }
    return updatedFilterPredicate;
  }

  onDestroyFilterToolSetting() {
    this.columnFilterStorage = {};
    this.dataSource.filterPredicate = this.originFilterPredicate;
  }

}
