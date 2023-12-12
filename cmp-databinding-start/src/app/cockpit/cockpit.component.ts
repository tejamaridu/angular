import { Component, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  newServerName = '';
  newServerContent = '';
  
  onAddServer(serverNameInput: HTMLInputElement) {
    // Using Local Reference and Passing the Reference Id in method call
    this.newServerName = serverNameInput.value;

    // Using Local Reference & ViewChild
    this.newServerContent = this.serverContentInput.nativeElement.value;
     
      this.serverCreated.emit(
        {serverName: this.newServerName, serverContent: this.newServerContent}
      );
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    // Using Local Reference and Passing the Reference Id in method call
    this.newServerName = serverNameInput.value;

    // Using Local Reference & ViewChild
    this.newServerContent = this.serverContentInput.nativeElement.value;
    
    this.blueprintCreated.emit(
      {serverName: this.newServerName, serverContent: this.newServerContent}
    );
  }
}
    