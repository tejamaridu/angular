import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActivated = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userActivateEmitter.subscribe((data: boolean) =>{
      this.userActivated = data;
    })
  }
}
