import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeService } from './services/employee.service';
import { MaterialUiModule } from './materialui.module';
import { SidenavDemoComponent } from './sidenav-demo/sidenav-demo.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { DeleteDialogComponent } from './employee/delete-dialog/delete-dialog.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { EmployeeStartComponent } from './employee/employee-start/employee-start.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    SidenavDemoComponent,
    EmployeeEditComponent,
    DeleteDialogComponent,
    GridDemoComponent,
    EmployeeStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    FlexLayoutModule
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [EmployeeService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
