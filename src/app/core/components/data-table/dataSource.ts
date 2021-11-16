import { MatTableDataSource } from '@angular/material/table';

export class SelfDataSource<T> extends MatTableDataSource<T> {
  private _backendPagination: boolean = false;
  private _isCustomSortColumn: boolean = false;

  get fromBackendData() {
    return this._backendPagination;
  }

  set backendPagination(is: boolean) {
    this._backendPagination = is;
  }

  get isCustomSortColumn () {
    return this._isCustomSortColumn;
  }
  set customSortColumn(bool: boolean) {
    this._isCustomSortColumn = bool;
  }
  constructor(initialData: T[] = []) {
    super(initialData);
  }

  override _filterData(data: T[]) {
    if (!this._backendPagination) {
      return super._filterData(data);
    } else {
      return this.data;
    }
  }

  override _orderData(data: T[]): T[] {
    if (!this._backendPagination) {
      if (this._isCustomSortColumn) {
        if (this.sort && this.sort.direction === '') return data;
        if (this.sort && this.sort.active === 'ip') {
          return this.sortDataByIP(data.slice());
        } else {
          return super._orderData(data);  
        }
      } else {
        return super._orderData(data);
      }
    } else {
      return this.data;
    }
  }

  override _pageData(data: T[]): T[] {
    if (!this._backendPagination) {
      return super._pageData(data);
    } else {
      return this.data;
    }
  }

  override _updatePaginator(filteredDataLength: number) {
    if (!this._backendPagination) {
      super._updatePaginator(filteredDataLength);
    }
  }

  sortDataByIP(data: any[]): T[] {
    const nanArr = data.filter(item => isNaN(parseInt(item['ip'])))
    const numberArr = data.filter(item => !isNaN(parseInt(item['ip'])))
    numberArr.sort((a, b) => {
      let aIP = this.getFirstIP(a['ip']);
      let bIP = this.getFirstIP(b['ip']);
      const aIPLen = aIP.split('.').length;
      const bIPLen = bIP.split('.').length;
      let comparatorResult = 0;
      if (aIPLen === 4 && bIPLen === 4) {
        const arr1 = aIP.split('.');
        const arr2 = bIP.split('.');
        for (let i = 0; i < 4; i++) {
          if (parseInt(arr1[i]) > parseInt(arr2[i])) {
            comparatorResult = 1;
            return comparatorResult;
          } else if (parseInt(arr1[i]) < parseInt(arr2[i])) {
            comparatorResult = -1;
            return comparatorResult;
          }
        }
      } else if (aIPLen === 4) {
        comparatorResult = 1;
      } else if (bIPLen === 4) {
        comparatorResult = -1;
      }
      return comparatorResult;
    });
    const totalArr = nanArr.concat(numberArr)
    if (this.sort && this.sort.direction === 'desc') {
      totalArr.reverse();
    }
    return totalArr;
  }

  getFirstIP(data: T) {
    if (typeof data === 'string') {
      return data.split(',')[0];
    }
    if (data instanceof Array) {
      return data[0];
    }
    // return data.toString();
  }
}