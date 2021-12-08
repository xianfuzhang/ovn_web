import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopoComponent } from './topo.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    TopoComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class TopoModule { }
