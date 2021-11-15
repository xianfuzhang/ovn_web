import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BasicModalComponent, ApplicationModalComponent } from './components/modal/modal.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    LoginComponent,
    TopNavComponent,
    MenuListItemComponent,
    BasicModalComponent,
    ApplicationModalComponent
  ],
  declarations: [
    LoginComponent,
    TopNavComponent,
    MenuListItemComponent,
    BasicModalComponent,
    ApplicationModalComponent
  ],
  providers: []
})
export class CoreModule {
}