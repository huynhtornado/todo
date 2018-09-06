import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../users.service';
import { users } from '../users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [UserService]
})
export class ListUsersComponent implements OnInit {

  showS: boolean = false;

  hidebtn: any;

  public users: users[];

  user: users;

  public keyword: String;

  @Input() myName: string;

  constructor(private userService: UserService, private router: Router) { }

  getAllUsers(): any {
    return this.userService.getAllUsers()
      .subscribe(
        userAll => {
          this.users = userAll.data;
        }
      );
  }

  deleteUser(userId: String) {
    if (confirm("Do you delete?")) {
      return this.userService.deleteUser(userId)
        .subscribe(
          _ => {
            let usersTemp = this.users.filter(user => user._id !== userId);
            this.users = usersTemp;
          }
        );
    } else {
      return;
    }
  }

  logout() {
    return this.userService.logout()
      .subscribe(
        () => {
          console.log("Successfully logout!");
          return this.router.navigate(['']);
        })
  }

  search() {
    return this.userService.search(this.keyword)
      .subscribe(
        (key: any) => {
          this.users = key.data;
          console.log("users = " + key);
          console.log("users = " + this.users);
        },
        error => {
          console.log(error);
        }
      )
  }

  show() {
    return this.showS = true;

  }

  hide() {
    return this.showS = false;
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
