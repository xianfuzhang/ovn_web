import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopoComponent } from './topo.component';
import { CoreModule } from '../../core/core.module';
import { TreeTopoComponent } from './treeTopo.component';

@NgModule({
  declarations: [
    TopoComponent,
    TreeTopoComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class TopoModule { }
