import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { users } from '../users';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  users: users[] = [];
  user: users;

  constructor(private userService: UserService, private builder: FormBuilder,private router: Router) { }

  email = new FormControl('', [
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  formRegister: FormGroup = this.builder.group({
    email: this.email,
    password: this.password,
    name: this.name
  });

  ngOnInit() {
  }

  register(): any {
    console.log(this.formRegister.value);
    return this.userService.register(this.formRegister.value)
      .subscribe(
        (user) => {
          if (!user.email) {
            this.users.push(user);
          } else {
            alert("Email has been used!");
            this.router.navigate(['register']);
          }
        }
      );
  }
}
