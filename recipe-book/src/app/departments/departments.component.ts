import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DepartmentsService } from './departments.service';
import { Department } from './department.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departments: Department[];
  @HostBinding('deptForm') deptForm: FormGroup;
  isFetching: boolean = false;
  isEdit: boolean = false;
  deptSubscription: Subscription;

  constructor(private depatmentsService: DepartmentsService) {}

  ngOnInit() {
    this.deptForm = new FormGroup({
      name: new FormControl('', Validators.required),
      head: new FormControl('', Validators.required),
    });
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.deptSubscription = this.depatmentsService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;
      console.log(data);
    });
  }

  createDepartment() {
     // this.depatmentsService.createDepartment(this.department); 
  }

  onDeptSubmit() {
    this.depatmentsService.createDepartment(this.deptForm.value).subscribe(
      (data: any) => {
        alert('Department Created!');
        this.fetchDepartments();
        this.deptForm.reset();
    }, (err) => {
      
    });
  }

  ngOnDestroy(): void {
    this.deptSubscription.unsubscribe();
  }
}
