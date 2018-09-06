import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MainpageComponent } from './updateUser/mainpage.component';
import { UserService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ValidationService } from './ValidationService';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserloginComponent,
    MainpageComponent,
    RegisterComponent,
    DashboardComponent,
    ListUsersComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Cài đặt cho router: path nào tương ứng với component nào.
    RouterModule.forRoot([
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'login',
        component: UserloginComponent
      },
      {
        path: 'listusers/updateinfo/:_id',
        component: MainpageComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'listusers',
        component: ListUsersComponent
      }
    ])
  ],
  providers: [UserService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
