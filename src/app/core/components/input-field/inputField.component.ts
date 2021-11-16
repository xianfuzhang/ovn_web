import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './inputField.html',
  styleUrls: ['./inputField.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent implements OnInit {

  @Input() label: string;
  @Input() noFormField: boolean = false;
  @Input() isRequired: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
