import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[mac-address]'
})
export class MacAddressDirective implements OnInit, OnDestroy {
  // private _element: HTMLInputElement;
  valueSubscription: Subscription;
  private preValue: string;

	constructor(
    // protected _elementRef: ElementRef<HTMLInputElement>,
    public ngControl: NgControl) {
			// this._element = this._elementRef.nativeElement;
  }
  
  ngOnInit(): void {
    this.valueSubscription = this.ngControl.control.valueChanges.subscribe((value) => {
      if (this.preValue === value) return;
      if (/^([0-9A-Za-z:-]){1,}$/g.test(value)) {
        if (value.length > 17) {
          this.ngControl.control.patchValue(value.slice(0, 17));
          return;
        }
        const numbers = value.replace(/:|-/g, "");
        if (value.length > 0 && value.length % 3 === 0) {
          this.preValue = numbers.replace(/([0-9A-Za-z]{2})/g, "$1-");
          this.ngControl.control.patchValue(this.preValue);
        }
      }
    });
  }

	ngOnDestroy(): void {
    this.valueSubscription.unsubscribe();
	}
	
	// @HostListener('input')
  // _onInput() {
		// const value = this._element.value;
		// if (value.length > 17) {
		// 	// this._element.value = value.slice(0, 17);
    //   // this._element.dispatchEvent(new Event('input'));
    //   this.ngControl.control.patchValue(value.slice(0, 17));
    //   return;
    // }
    // var numbers = value.replace(/:|-/g, "");
    // if (value.length % 3 === 0) {
    //   this._element.value = numbers.replace(/([0-9A-Za-z]{2})/g, "$1-");
    // }
	// }

}
