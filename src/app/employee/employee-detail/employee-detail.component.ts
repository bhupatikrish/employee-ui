import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public employee = new Employee();
  public mode = 'edit';

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.employeeService.getEmployee(id).subscribe((employee) => {
        this.employee = employee;
      });
    } else {
      this.mode = 'add';
    }
  }

  submit() {
    if (this.mode === 'edit') {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe((data) => {
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe((data) => {
      });
    }
    this.router.navigate(['/employees']);
  }

}

