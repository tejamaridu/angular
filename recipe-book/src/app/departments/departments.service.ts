import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Department } from './department.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  departmentsMap: { [key: string]: Department } = {}; 
  deptSubscriptions: Subscription[] = [];
  departmentsUpdated = new Subject<Department[]>;

  constructor(private http: HttpClient) { 
    console.log('In Service Constructor');
    // this.fillDepartmentsMap();
  }

  ngOnInit(): void {
    console.log('In Service Init');
  }

  getDepartments() : Observable<Department[]> {
    return <Observable<Department[]>>this.http.get('http://localhost:8080/api/v1/departments')
  }

 

  // getDepartmentNotWorking(uuid: string): Observable<Department> {
  //   if(this.departmentsMap == null || Object.keys(this.departmentsMap).length == 0) {
  //     this.getDepartments()
  //       .pipe(
  //         map((depts: Department[]) => {
  //           // Inserting Data into Departments Map
  //           this.departmentsMap = {};
  //           depts.forEach((dept) => {
  //             this.departmentsMap[dept.uuid] = dept;
  //           });
  //           console.log('In Service getDepartment() - Getting Department from newly filled Map');
  //           return depts;
  //         }))
  //       .subscribe((depts: Department[]) => {
  //         return new Observable<Department>(observer => {
  //           // Define your object
  //           observer.next(this.departmentsMap[uuid]);
  //           observer.complete();
  //         }); 
  //       });
  //   } else {
  //     console.log('In Service getDepartment() - Getting Department from already filled Map');
  //     return new Observable<Department>(observer => {
  //       // Define your object
  //       observer.next(this.departmentsMap[uuid]);
  //       observer.complete();
  //     });
  //   }
  // }

  getDepartment(uuid: string): Observable<Department>{
    const headers = new HttpHeaders()
      .set('Authorization', 'your_token')
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('view', 'pretty');
    return <Observable<Department>> this.http.get('http://localhost:8080/api/v1/departments/' + uuid, 
      { 
        headers, 
        params, 
        observe: 'body'
      }, 
    ) 
  }

  private fillDepartmentsMap() {
    this.deptSubscriptions.push(this.getDepartments().subscribe((depts: Department[]) => {
      this.departmentsMap = {};
      depts.forEach(dept => {
        this.departmentsMap[dept.uuid] = dept;
      });
      console.log('In Service Constructor - Department Maps Filled');
    }));
  }
  
  createDepartment(deptartment: Department) {
    return this.http.post('http://localhost:8080/api/v1/departments', deptartment);
  }

  editDepartment(uuid: string, deptartment: Department){
    return this.http.put('http://localhost:8080/api/v1/departments/' +uuid, deptartment);
  }

  deleteDepartment(deptUuid: string){
    return this.http.delete('http://localhost:8080/api/v1/departments/' +deptUuid, {
      observe: 'events'
    })
    .pipe(
      tap(event => {
        if(event.type === HttpEventType.Response){
          console.log(event.body);
        }
    }));
  }
 
  desposeSubscriptions(): void {
    // Unsubscribing all subscriptions from department components and service classes
    if(this.deptSubscriptions != null && this.deptSubscriptions.length != 0) {
      this.deptSubscriptions.forEach(subscription =>subscription.unsubscribe());
      console.log('unsubscribed');
    }
  }
}
