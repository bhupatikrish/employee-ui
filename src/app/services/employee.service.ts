import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee/model/employee.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class EmployeeService {

  private baseUrl = 'http://localhost:8080';
  // private baseUrl = 'http://employee-service.us-east-1.elasticbeanstalk.com';
  private employeesUrl = this.baseUrl + '/api/employees';
  private employeeDetailsSource = new BehaviorSubject<number>(null);
  private employeeDeletedSource = new Subject();
  // private employeeAddSource = new Subject();
  private employeeEditSource = new BehaviorSubject<number>(null);
  private employeeViewSource = new BehaviorSubject<number>(null);



  employeeDetails$ = this.employeeDetailsSource.asObservable();
  // employeeAdd$ = this.employeeAddSource.asObservable();
  employeeEdit$ = this.employeeEditSource.asObservable();
  employeeView$ = this.employeeViewSource.asObservable();
  employeeDeleted$ = this.employeeDeletedSource.asObservable();


  constructor(private http: HttpClient) { }

  employeeDetails(id: number) {
    this.employeeDetailsSource.next(id);
  }

  employeeDeleted() {
    this.employeeDeletedSource.next();
  }

  /* employeeAdd() {
    this.employeeAddSource.next();
  }*/

  employeeEdit(id: number) {
    this.employeeEditSource.next(id);
  }

  employeeView(id: number) {
    this.employeeViewSource.next(id);
  }

  public getEmployeeList(): Observable<any> {
    return this.http.get(this.employeesUrl);
  }

  public getEmployee(id: number): Observable<any> {
    return this.http.get(this.employeesUrl + '/' + id);
  }

  public searchEmployees(search: string): Observable<any> {
    const httpParams = new HttpParams().set('q', search);
    return this.http.get(this.employeesUrl + '/search', { params: httpParams });
  }

  public addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.employeesUrl, employee);
  }

  public updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl + '/' + id, employee);
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.employeesUrl + '/' + id);
  }


}
