import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean= false;

    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.eleRef.nativeElement.contains(event.target) ? 
            !this.isOpen : false;
    }

    constructor(private eleRef: ElementRef){ }
}