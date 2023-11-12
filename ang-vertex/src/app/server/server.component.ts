import { Component } from  '@angular/core'  

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css'],
    // :TODO,,
    // styles:['
    //   h3 {  
    //     color: 'bule';
    // }
    //  ']
})
export class ServerComponent {

   serverStatus: string;

   constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
   }

   getColor(): string{
    if(this.serverStatus == 'online'){
        return 'green';
    } else{
        return 'red';
    }
   }
}