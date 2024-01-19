import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  intervalId;
  colorSwap: boolean = false;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 
        ( this.colorSwap ? 'white' : '#FFCCCB'));
      this.colorSwap = !this.colorSwap;
    }, 500);
  }

}
