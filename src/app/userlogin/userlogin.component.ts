import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { users } from '../users';
import { UserService } from '../users.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
  providers: [UserService]
})
export class UserloginComponent implements OnInit {

  users: users[] = [];

  uSer: users;

  myName: string;

  constructor(public userService: UserService) { }

  getAllUsers() {
    return this.userService.getAllUsers().subscribe(user => { this.users = user });
  }


  userLogin(user: users) {
    return this.userService.userLogin(user).subscribe(
      userr => {
        //this.uSer = userr.user;
        this.myName = userr.user.name;
        //this.userService.toggle(this.myName);
        console.log("Set name is:" + this.myName);
        // this.getMyName(this.myName);
      });
  }

  getMyName(user: users) {
    return this.userService.userLogin(user).subscribe(
      userr => {
        this.myName = userr.user.name;
        this.userService.getMyName(this.myName);
      });
  }

  ngOnInit() {
  }
}
