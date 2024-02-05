import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DepartmentsService } from './departments.service';
import { Department } from './department.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departments: Department[];
  selectedDepartment : Department;
  isFetching: boolean = false;

  constructor(private deptService: DepartmentsService, private route: ActivatedRoute,
    private router: Router) {
      console.log('In Parent Constructor');
    }

  ngOnInit() {
    console.log('In Parent Init');
    this.deptService.deptSubscriptions.push(
      this.deptService.departmentsUpdated.subscribe((depts: Department[]) => {
        console.log('In Parent - departmentsUpdated Got fresh departments');
        this.departments = depts;
      }));
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.deptService.deptSubscriptions.push(
      this.deptService.getDepartments().subscribe((depts: Department[]) => {
        this.departments = depts;
        // Inserting Data into Departments Map
        // const deptsMap: { [key: string]: Department } = {};
        // depts.forEach(dept => {
        //   deptsMap[dept.uuid] = dept;
        // });
        // this.depatmentsService.departmentsMap = deptsMap;
      }));
  }

  

  onDepartmentSelect(dept: Department) {
    this.selectedDepartment = dept;
    // Send the selected department to Edit Component
    // this.router.navigate([this.selectedDepartment.uuid], { relativeTo: this.route});
  }

  createDepartment() {
     // this.depatmentsService.createDepartment(this.department); 
  }

  ngOnDestroy(): void {
    this.deptService.desposeSubscriptions();
  }
}
