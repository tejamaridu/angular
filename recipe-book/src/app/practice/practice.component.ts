import { Component } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent {
  showEven = true;
  evenNumbers: number[] = [2, 4, 6, 8, 10];
  oddNumbers: number[] = [1, 3, 5, 7, 9];
  countNum = 20;

  toggleNums(): void {
    this.showEven = !this.showEven;
  }
}
