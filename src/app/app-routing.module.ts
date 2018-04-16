import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { SidenavDemoComponent } from './sidenav-demo/sidenav-demo.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/sidenav', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavDemoComponent },
  { path: 'grid', component: GridDemoComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: EmployeeDetailComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
