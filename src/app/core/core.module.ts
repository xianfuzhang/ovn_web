import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BasicModalComponent, ApplicationModalComponent } from './components/modal/modal.component';
import { GroupButtonComponent } from './components/button/button.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaxColumnWidthDirective, MinColumnWidthDirective } from './components/data-table/column-width.directive';
import { InputComponent } from './components/input/input.component';
import { MacAddressDirective } from './components/input/mac-address.directive';
import { InputFieldComponent } from './components/input-field/inputField.component';
import { LoadingDirective } from './components/loading/loading.directive';
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
    ApplicationModalComponent,
    GroupButtonComponent,
    DataTableComponent,
    MaxColumnWidthDirective,
    MinColumnWidthDirective,
    MacAddressDirective,
    InputComponent,
    InputFieldComponent,
    LoadingDirective
  ],
  declarations: [
    LoginComponent,
    TopNavComponent,
    MenuListItemComponent,
    BasicModalComponent,
    ApplicationModalComponent,
    GroupButtonComponent,
    DataTableComponent,
    MaxColumnWidthDirective,
    MinColumnWidthDirective,
    MacAddressDirective,
    InputComponent,
    InputFieldComponent,
    LoadingDirective
  ],
  providers: []
})
export class CoreModule {
}