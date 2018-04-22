import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Mode } from '../model/mode.enum';
import { MatSnackBar } from '@angular/material';
import { states } from '../model/states.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnDestroy {

  public employee = new Employee();
  editSubscription: Subscription;
  addSubscription: Subscription;
  mode = Mode.EDIT;

  email = new FormControl('', [Validators.required, Validators.email]);

  states = states;

  constructor(private employeeService: EmployeeService, fb: FormBuilder, public snackBar: MatSnackBar) {
    this.editSubscription = this.employeeService.employeeEdit$.subscribe((id) => {
      if (id) {
        this.mode = Mode.EDIT;
        this.getEmployeeDetails(id);
      } else {
        this.mode = Mode.ADD;
        this.employee = new Employee();
      }

      });
    /* this.addSubscription = this.employeeService.employeeAdd$.subscribe(() => {
      this.mode = Mode.ADD;
      this.employee = new Employee();
      }); */
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

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.editSubscription.unsubscribe();
    // this.addSubscription.unsubscribe();
  }

  cancel() {
    if (this.mode === Mode.EDIT) {
      this.employeeService.employeeView(this.employee.id);
    } else {
      this.employeeService.employeeView(null);
    }
  }

  submit() {
    if (this.mode === Mode.EDIT) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe((data) => {
        this.employeeService.employeeView(this.employee.id);
        // this.mode = Mode.ADD;
      }, (error) => {
        this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe((data) => {
        this.employeeService.employeeView(data.responseData.id);
        // this.mode = Mode.ADD;
      }, (error) => {
        this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
      });
    }
  }

}
