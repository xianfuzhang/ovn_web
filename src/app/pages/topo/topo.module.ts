import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopoComponent } from './topo.component';
import { CoreModule } from '../../core/core.module';
import { TreeTopoComponent } from './treeTopo.component';
import { TopoDetailComponent } from './topoDetail.component';
@NgModule({
  declarations: [
    TopoComponent,
    TreeTopoComponent,
    TopoDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class TopoModule { }
