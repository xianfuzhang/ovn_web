import {
  Component, OnInit, ViewEncapsulation, ViewChild, ElementRef,
  Output, EventEmitter, Input, OnChanges, SimpleChange
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { InputModel } from '../../models/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit, OnChanges {
  @ViewChild('searchButton') searchButton: MatButton;
  @ViewChild('inputContent', { static: true }) inputContent: ElementRef;
  //todo change property disable
  @Input() property: InputModel;
  @Output() searchEmmiter = new EventEmitter<string>();

  visiableSwitch: boolean = true;  //密码可见开关
  isFocus: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initParams();
  }
  ngAfterViewInit(): void {
    this.initKeyUpAction();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    // console.log(changes);
  }

  initParams(): void {
    this.property.type = this.property.type || 'text';
    this.property.labelPosition = this.property.labelPosition || 'horizontal';
    this.property.disable = this.property.disable || false;
    this.property.required = this.property.required || false;
    // this.property.content = this.property.content || '';
  }

  initKeyUpAction(): void {
    fromEvent(this.inputContent.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          if (this.property.type === 'search') {
            this.searchButton.disabled = event.target.value.length === 0 ? true : false;
          }
          return event.target.value;
        })
        , debounceTime(1000)
        , distinctUntilChanged()
      ).subscribe((text: string) => {
        this.searchEmmiter.emit(text);
      })
  }

  search(): void {
    this.searchEmmiter.emit(this.property.content);
  }

  clear(): void {
    this.property.content = '';
    this.searchButton.disabled = true;
    this.searchEmmiter.emit(this.property.content);
    this.inputContent.nativeElement.focus();
  }

  onFocusEvent(): void {
    this.isFocus = true;
  }

  onBlurEvent(): void {
    this.isFocus = false;
  }

  changePasswordIcon(): void {
    this.visiableSwitch = !this.visiableSwitch;
    this.inputContent.nativeElement.type = this.visiableSwitch ? 'password' : 'text';
  }
}