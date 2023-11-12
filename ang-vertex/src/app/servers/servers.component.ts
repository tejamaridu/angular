import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  // selector: 'app-servers',
  selector: '[app-servers]',
  // selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  serverId: number = 10;
  serverStatus: string = "OFF";
  serverCapacity: number = 100;
  allowNewServer: boolean = false;
  allowBlink: boolean = false;
  serverCreationStatus: string = "Server is not created";
  serverCreated: boolean = false;
  serverName: string = "TestServer";
  servers = ['Server-1', 'Server-2', 'Server-3'];

  constructor() {
    setInterval(() => {
      this.allowBlink = !this.allowBlink;
    }, 500)
    setTimeout(() => {
      this.allowNewServer = true;
    }, 5000)
  }

  getServerCapacity(): number {
    return this.serverCapacity;
  }

  onServerCreate() {
    let nextServerName = 'Server-' +(this.servers.length + 1);
    this.serverCreationStatus = "Server has been created! Name is " +this.serverName;
    this.serverCreated = true;
    this.servers.push(nextServerName);
  }

  onServerNameChange(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
