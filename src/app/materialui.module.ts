import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule,
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule,
    MatListModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatTabsModule, MatRadioModule
    } from '@angular/material';
import { NgModule } from '@angular/core';

const uiComponents = [
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule];

@NgModule({
  imports: uiComponents,
  exports: uiComponents,
})
export class MaterialUiModule { }
