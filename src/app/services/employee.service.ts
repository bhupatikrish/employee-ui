import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee/model/employee.model';

@Injectable()
export class EmployeeService {

  // private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://employee-service.us-east-1.elasticbeanstalk.com';
  private employeesUrl = this.baseUrl + '/api/employees';

  constructor(private http: HttpClient) { }

  public getEmployeeList(): Observable<any> {
    return this.http.get(this.employeesUrl);
  }

  public getEmployee(id: number): Observable<any> {
    return this.http.get(this.employeesUrl + '/' + id);
  }

  public findEmployee(search: string): Observable<any> {
    const httpParams = new HttpParams().set('q', search);
    return this.http.get(this.employeesUrl, { params: httpParams });
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
