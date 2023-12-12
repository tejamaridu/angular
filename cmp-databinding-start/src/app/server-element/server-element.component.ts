import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
         AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
                AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('srvElement') element: {type: string, name: string, content: string}
  @Input('name') name: string;
  @ViewChild('heading') heading: ElementRef;
  @ContentChild('contentParagraph') contentPara: ElementRef;

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called'); 
      console.log('Heading : ' + (this.heading == undefined || this.heading.nativeElement == undefined) ? '' : this.heading.nativeElement.textContent);
      console.log('Content Paragraph : ' +  (this.contentPara == undefined || this.contentPara.nativeElement == undefined) ? '' : this.contentPara.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit(){
    console.log('ngAfterContentInit called');
    console.log('Content Paragraph : ' + this.contentPara.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    console.log('Heading : ' + this.heading.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
