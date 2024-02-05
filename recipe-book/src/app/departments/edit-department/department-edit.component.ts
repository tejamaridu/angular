import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from '../departments.service';
import { Department } from '../department.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit, OnDestroy {
  @HostBinding('deptForm') deptForm: FormGroup;
  selectedDepartment: Department; 
  selectedDeptUuid: string;
  isEdit: boolean = false;
  isNew: boolean = false;

  constructor(private deptService: DepartmentsService, private route: ActivatedRoute,
    private router: Router) {
    console.log('In Child Constructor');
  }

  ngOnInit() {
    console.log('In Child Init');
    this.deptService.deptSubscriptions.push(
      this.route.params.subscribe((params: Params) => {
      // Checking if its URL have new
      const segments = this.route.snapshot.url;
      this.isNew = segments.some(segment => segment.path === 'new');
      this.selectedDeptUuid = params['id'];
      this.depatmentFormInit();
    }));
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
      this.deptService.deptSubscriptions.push(
        this.deptService.getDepartment(this.selectedDeptUuid)
        .subscribe((dept: Department) => {
          if (dept == null || dept.uuid == null) {
            this.selectedDepartment = new Department('', '', '');
            this.isEdit = true;
          } else {
            this.selectedDepartment = dept;
          }
          this.deptForm = new FormGroup({
            name: new FormControl( this.selectedDepartment.name, Validators.required ),
            head: new FormControl( this.selectedDepartment.head, Validators.required ),
          });
        }));
    }
  }

  onDeptSubmit() {
    if(this.isNew) {
      this.deptService.deptSubscriptions.push(
        this.deptService.createDepartment(this.deptForm.value).subscribe(
        (dept: Department) => {
          console.log(dept);
          this.router.navigate(['departments/'+dept.uuid]);
          this.fetchDepartments(); 
        },
        (err) => {
          console.log(err);
        }
      ));
    } else {
      this.deptService.deptSubscriptions.push(
        this.deptService.editDepartment(this.selectedDeptUuid, this.deptForm.value).subscribe(
        (data: any) => {
          this.fetchDepartments(); 
        },
        (err) => {
          console.log(err);
        }
      ));
    }
    
    this.isEdit = false;
  }

  fetchDepartments() {
    this.deptService.deptSubscriptions.push(
      this.deptService.getDepartments().subscribe((depts: Department[]) => {
        this.deptService.departmentsUpdated.next(depts);
      }))
  }

  onNewInit() {
    this.isEdit = true;
    this.router.navigate(['departments/new']);
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

  onDeleteInit() {

  }

  onDelete() {
    const isDelete = confirm('Are you sure you want to delete?');
    if(isDelete){
      this.deptService.deptSubscriptions.push(
          this.deptService.deleteDepartment(this.selectedDeptUuid)
          
          
          .subscribe((data: any) => {
          this.fetchDepartments();
          this.router.navigate(['departments']);
          this.isEdit = false;
          this.isNew = false;
        }
        ,(error: any) => {
          console.log(error);
        }
      ))
    }
  }

  ngOnDestroy(): void {
    // this.deptFetchSub.unsubscribe();
  }
}
