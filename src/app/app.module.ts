import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllMaterialModule } from './material';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AllMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [EditComponent, CreateComponent]
})
export class AppModule { }
