import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo';
  // name = '';
  constructor(private userService: UserService) {
  }

  // ngOnInit() {
  //   this.userService.getName.subscribe(myName => {
  //     this.name = myName;
  //   });
  // }
}
