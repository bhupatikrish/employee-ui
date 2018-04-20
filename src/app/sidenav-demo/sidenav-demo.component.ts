import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatIconRegistry, MatSnackBar } from '@angular/material';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../employee/model/employee.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Mode } from '../employee/model/mode.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sidenav-demo',
  templateUrl: './sidenav-demo.component.html',
  styleUrls: ['./sidenav-demo.component.css']
})
export class SidenavDemoComponent implements OnInit, OnDestroy {

  public employees: Array<Employee>;
  public selectedEmployee = new Employee();
  mode = Mode.START;
  search: string;
  defaultIcon = 'https://cdn4.iconfinder.com/data/icons/standard-free-icons/139/Profile01-256.png';

  searchFormControl = new FormControl('', [
    Validators.required
    ]);

  matcher = new MyErrorStateMatcher();

  deleteSubscription: Subscription;
  addSubscription: Subscription;
  viewSubscription: Subscription;
  editSubscription: Subscription;

  constructor(private employeeService: EmployeeService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, public snackBar: MatSnackBar) {

    iconRegistry.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/avatars.svg'));

    this.deleteSubscription = employeeService.employeeDeleted$.subscribe((id) => {
      this.getAllEmployees();
      this.mode = Mode.START;
    });

    this.viewSubscription = employeeService.employeeView$.subscribe((id) => {
      if (id) {
        this.getAllEmployees();
        this.employeeDetails(id);
      } else {
        this.mode = Mode.START;
      }
    });

    this.editSubscription = employeeService.employeeEdit$.subscribe((id) => {
      if (id) {
        this.mode = Mode.EDIT;
      }
    });
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data.responseData;
    }, (error) => {
      this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
    });
  }

  addEmployee() {
    this.mode = Mode.ADD;
    this.employeeService.employeeEdit(null);
  }

  employeeDetails(id: number) {
    this.mode = Mode.VIEW;
    this.employeeService.employeeDetails(id);
  }

  searchEmployees() {
    if (this.search) {
      this.employeeService.searchEmployees(this.search).subscribe((data) => {
        this.employees = data.responseData;
        this.mode = Mode.START;
      }, (error) => {
        this.snackBar.open(error.error.metadata.message, 'Undo', { duration: 1000 });
      });
    } else {
      this.getAllEmployees();
    }

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.editSubscription.unsubscribe();
    // this.addSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.viewSubscription.unsubscribe();

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
