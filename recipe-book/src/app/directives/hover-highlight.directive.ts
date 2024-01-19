import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'white';
  @Input() hoverColor: string = 'lightgreen';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { 
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver(eventData: Event) {
    // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'lightgreen');
      this.backgroundColor =  this.hoverColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'white');
    this.backgroundColor = this.defaultColor;
  }

}
