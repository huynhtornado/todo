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

  public myName;
  constructor(public userService: UserService) { }

  getAllUsers() {
    return this.userService.getAllUsers().subscribe(user => { this.users = user });
  }

  @HostListener('submit')
  userLogin(user: users): any {
    return this.userService.userLogin(user).subscribe(
      userr => {
        this.uSer = userr.user;
        this.myName = userr.user.name;   
        this.userService.toggle(this.myName);
        // this.myName = new users(userr.user._id, userr.user.name, userr.user.email, userr.user.password);
        console.log("Set name is:" + this.myName);
        // this.clickName(this.myName);
      });
  }

  // @Input() state: boolean;

  // @Output() change = new EventEmitter();
  // clickName(myName) {
  //   this.userService.toggle(myName);
  //   //console.log('toggle started');
  //   // this.state = true;
  //   // this.change.emit(this.state);
  //   // console.log("state is " + this.state);
  // }

  // getEmittedValue(): any{
  //   return this.change;
  // }

  // subToggle() {
  //   this.clickName();
  // }

  ngOnInit() {
    //console.log(this.myName);

  }
}
