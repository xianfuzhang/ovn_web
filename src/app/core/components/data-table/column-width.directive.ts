import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[maxColumnWidth]'
})
export class MaxColumnWidthDirective implements OnInit {
  @Input('maxColumnWidth') maxWidth: string;
  private _element: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this._element = this.elementRef.nativeElement;
  
  }
  ngOnInit(): void {
    if (this.maxWidth) {
      this._element.style.maxWidth = this.maxWidth;
    }
  }
}

@Directive({
	selector: '[minColumnWidth]'
})
export class MinColumnWidthDirective implements OnInit {
  @Input('minColumnWidth') minWidth: string;
  private _element: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this._element = this.elementRef.nativeElement;
  
  }
  ngOnInit(): void {
    if (this.minWidth) {
      this._element.style.minWidth = this.minWidth;
    }
  }
}