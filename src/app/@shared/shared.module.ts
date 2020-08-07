import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MatDialogWrapperComponent } from './mat-dialog-wrapper/mat-dialog-wrapper.component';

@NgModule({
  imports: [
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MatDialogWrapperComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MatDialogWrapperComponent
  ]
})
export class SharedModule { }
