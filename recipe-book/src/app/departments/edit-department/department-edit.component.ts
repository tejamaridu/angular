import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from '../departments.service';
import { Department } from '../department.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit, OnDestroy {
  @HostBinding('deptForm') deptForm: FormGroup;
  selectedDepartment: Department;
  deptFetchSub: Subscription;
  selectedDeptUuid: string;
  isEdit: boolean = false;
  newMode: boolean = false;

  constructor(private deptService: DepartmentsService, private route: ActivatedRoute,
    private router: Router) {
    console.log('In Child Constructor');
  }

  ngOnInit() {
    console.log('In Child Init');
    this.route.params.subscribe((params: Params) => {
      this.selectedDepartment = new Department('', '', '');
      this.selectedDeptUuid = params['id'];
      this.depatmentFormInit();
    });
  }

  // depatmentFormInitNotWorking() {
  //   if (this.selectedDeptUuid != '') {
  //     this.selectedDepartment = this.deptService.getDepartment(this.selectedDeptUuid);
  //     if (this.selectedDepartment == null || this.selectedDepartment.uuid == null) {
  //       this.selectedDepartment = new Department('', '', '');
  //       console.log('In Child depatmentFormInit() - selectedDepartment is empty');
  //     }
  //     this.deptForm = new FormGroup({
  //       name: new FormControl( this.selectedDepartment.name, Validators.required ),
  //       head: new FormControl( this.selectedDepartment.head, Validators.required ),
  //     });
  //   } 
  // }


  depatmentFormInit() {
    if (this.selectedDeptUuid != '') {
      this.deptService.getDepartment(this.selectedDeptUuid)
        .subscribe((dept: Department) => {
          if (dept == null || dept.uuid == null) {
            this.selectedDepartment = new Department('', '', '');
          } else {
            this.selectedDepartment = dept;
          }
          this.deptForm = new FormGroup({
            name: new FormControl( this.selectedDepartment.name, Validators.required ),
            head: new FormControl( this.selectedDepartment.head, Validators.required ),
          });
        });
    }
  }

  onDeptSubmit() {
    this.deptService.createDepartment(this.deptForm.value).subscribe(
      (data: any) => {
        this.fetchDepartments(); 
      },
      (err) => {}
    );
    this.isEdit = false;
  }

  fetchDepartments() {
    // :TODO
  }

  onEdit() {
    this.isEdit = true;
  }
  
  onUpdate() {
    this.isEdit = false;
  }

  onEditCancel() {
    this.isEdit = false;
  }

  onDelete() {

  }

  ngOnDestroy(): void {
    this.deptFetchSub.unsubscribe();
  }
}
