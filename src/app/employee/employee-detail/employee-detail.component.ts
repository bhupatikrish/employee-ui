import { Component, OnInit, Input, SimpleChange, OnChanges, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnDestroy {

  public employee = new Employee();
  subscription: Subscription;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
    this.subscription = employeeService.employeeDetails$.subscribe((id) => {
        this.getEmployeeDetails(id);
      });
  }

  getEmployeeDetails(id) {
    if (id) {
      this.employeeService.getEmployee(id).subscribe((employee) => {
        this.employee = employee;
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { employee: this.employee}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteEmployee(result.employee.id);
      }
    });
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employee = new Employee();
      this.employeeService.employeeDeleted();
    });
  }

  editEmployee() {
    this.employeeService.employeeEdit(this.employee.id);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
