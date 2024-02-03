import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departments: Department[];

  constructor(private http: HttpClient) { }

  getDepartments() {
     return this.http.get('http://localhost:8080/api/v1/departments');
  }

  getDepartment() {
    this.http.post('http://localhost:8080/api/v1/departments', {});
    return new Department('', '', '');
  }
  
  createDepartment(deptartment: Department) {
    return this.http.post('http://localhost:8080/api/v1/departments', deptartment);
  }

  editDepartment(){
    // edit a department
  }

  deleteDepartment(){
    // delete a department
  }
}
