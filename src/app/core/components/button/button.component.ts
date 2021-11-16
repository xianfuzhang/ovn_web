import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { GroupButtonItem } from '../../models/group-button';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroupButtonComponent {
  @Input() items: GroupButtonItem[];
  @Output() eventEmmit = new EventEmitter<string>();

  onClick(buttonId: string) {
    this.eventEmmit.emit(buttonId);
  }
}