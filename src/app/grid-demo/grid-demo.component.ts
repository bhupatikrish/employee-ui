import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatIconRegistry, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../employee/model/employee.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Mode } from '../employee/model/mode.enum';

@Component({
  selector: 'app-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridDemoComponent implements OnInit, OnDestroy, AfterViewInit {

  public employees: Array<Employee>;
  public selectedEmployee = new Employee();
  mode = Mode.START;

  displayedColumns = ['id', 'firstName', 'lastName', 'salary'];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getAllEmployees() {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data.responseData;
      this.dataSource = new MatTableDataSource(data.responseData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.editSubscription.unsubscribe();
    // this.addSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.viewSubscription.unsubscribe();

  }

}

