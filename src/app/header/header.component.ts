import { Component, OnInit, HostBinding, Input  } from '@angular/core';
import { UserService } from '../users.service';
import { UserloginComponent } from '../userlogin/userlogin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  logged: boolean = true;

  name: String;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getName.subscribe(myName => {
      this.name = myName;
    });
  }

}
