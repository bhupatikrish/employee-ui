import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { SidenavDemoComponent } from './sidenav-demo/sidenav-demo.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/sidenav', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavDemoComponent },
  { path: 'grid', component: GridDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
