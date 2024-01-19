import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  intervalId;
  colorSwap: boolean = false;

  constructor(private eleRef: ElementRef) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
    this.eleRef.nativeElement.style.backgroundColor = this.colorSwap ? 'white' : 'lightgreen';
    this.colorSwap = !this.colorSwap;
    }, 500);
  }
}
