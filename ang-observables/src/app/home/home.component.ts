import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   count => { console.log(count) }
    // )

    // Create a custom observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 10) {
          observer.complete();
        }
        if (count > 12) {
          observer.error(new Error('Count is more than 3'));
        }
        count++;
      }, 1000);
    });

    // Subscribe to created observable and error
    this.firstObsSubscription = customIntervalObservable
      .pipe(filter((data: number) => {
         return !(data % 2 === 0);
       }))
      .pipe(map((data: number) => {
          return 'Round is ' + (data + 1);
        }))
      .subscribe((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        }, () => {
          console.log('Completed');
        });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
