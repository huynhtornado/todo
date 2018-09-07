import { Injectable, Output, EventEmitter } from '@angular/core';
import { users } from './users';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private usersURL = "http://localhost:3000/users";// URL to web api
  private apiURL = "https://foole.herokuapp.com";
  private allUsers = "https://foole.herokuapp.com/api/users";

  user: users[];

  @Output() getName = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getMyName(myName) {
    this.getName.emit(myName);
  }

  getAllUsers(): Observable<any> {
    let foo = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      this.router.navigate(['login']);
    }

    let foos = foo.append('Authorization', token);
    return this.http.get<any>(this.allUsers, { headers: foos })
      .pipe(
        tap(
          Users => {
            Users.data;
          }
        ),
        catchError(error => of([error]))
      );
  }

  userLogin(user: users): Observable<any> {
    const url = `${this.apiURL}/api/auth/login`;
    return this.http.post<any>(url, user, httpOptions)
      .pipe(
        tap(
          userLogin => {
            if (userLogin.statusCode === 200 && userLogin.token) {
              // save token to localstorage
              localStorage.setItem('x-access-token', userLogin.token);
              httpOptions.headers.append('x-access-token', userLogin.token);
              userLogin.user.name;
              // console.log("test userr: "+this.myName);

              console.log("Token is: " + userLogin.token.toString());

              // navigate to the user list page
              this.router.navigate(['listusers']);
            }
          },
          err => console.log(console.log("login fail"), err, alert("login fail!"))
        ),
        catchError(this.handleError<users>(``))
      );
  }

  register(user: users): Observable<users> {
    const url = `${this.apiURL}/api/auth/register`;
    return this.http.post<users>(url, user)
      .pipe(
        tap(
          register => {
            console.log(`register = ${JSON.stringify(register)}`,
              `${console.log("Successful registration!")}`,
              this.router.navigate(['']),
            ), alert("Successful registration!")
          },
          err => console.log(console.log("fail"), err, alert("fail!"))
        ),
        catchError(this.handleError('Register User', user))
      );
  }



  deleteUser(userId: String): Observable<any> {
    const url = `${this.allUsers}/${userId}`;

    let foo = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = localStorage.getItem('x-access-token');

    let foos = foo.append('Authorization', token);

    return this.http.delete<any>(url, { headers: foos }).pipe(
      tap(
        del => {
          if (del.statusCode === 200) {
            //alert("Successfully deleted !");
            console.log(`Delete user with id = ${JSON.stringify(del)}`);
          }
        },
        err => console.log(console.log("fail"), err, alert("delete fail!"))
      ),
      catchError(this.handleError<users>(``))
    )
  }

  updateUser(user: users, _id: String): Observable<any> {
    const url = `${this.allUsers}/${_id}`;
    console.log(url);

    let foo = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = localStorage.getItem('x-access-token');

    let foos = foo.append('Authorization', token);
    return this.http.put(url, user, { headers: foos }).pipe(
      tap(
        updateUser => {
          if (updateUser) {
            //alert("Successfully updated!");
            console.log(`upadateUser= ${JSON.stringify(updateUser)}`);
          } else {
            alert("No successfully updated!");
          }
          err => {
            console.log(console.log("fail"),
              err,
              alert("update fail!"));
          }
        }
      ),
      catchError(this.handleError<users>(``))
    )
  }

  logout() {
    let foo = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = null;
    localStorage.removeItem('x-access-token');

    let foos = foo.append('Authorization', token);
    return this.http.delete<users>(this.allUsers, { headers: foos })
      .pipe(
        tap(
          err => console.log(err),
        ),
        catchError(this.handleError<users>(``))
      )
  }

  search(keyword: String): Observable<any[]> {
    const url = `${this.allUsers}?name=${keyword}`;

    let foo = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = localStorage.getItem('x-access-token');
    let foos = foo.append('Authorization', token);

    return this.http.get<any>(url, { headers: foos }).pipe(
      tap(
        searchUser => {
          if (searchUser) {
            console.log("Successfully search !");
          } else {
            console.log("Not successfully search!");
          }
        },
        err => console.log(console.log("search fail"), err, alert("search fail!"))
      ),
      catchError(this.handleError<users>(``))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.handleError(`error: ${message}`);
  }
}
