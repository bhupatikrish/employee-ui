import { Component, OnInit, Input, SimpleChange, OnChanges, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnDestroy {

  public employee = new Employee();
  subscription: Subscription;
  // tslint:disable-next-line:max-line-length
  defaultImage = 'https://cdn4.iconfinder.com/data/icons/standard-free-icons/139/Profile01-512.png';
  defaultIcon = 'https://cdn4.iconfinder.com/data/icons/standard-free-icons/139/Profile01-256.png';

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.subscription = employeeService.employeeDetails$.subscribe((id) => {
        this.getEmployeeDetails(id);
      });
  }

  getEmployeeDetails(id) {
    if (id) {
      this.employeeService.getEmployee(id).subscribe((data) => {
        this.employee = data.responseData;
      }, (error) => {
        this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
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
    }, (error) => {
      this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
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
