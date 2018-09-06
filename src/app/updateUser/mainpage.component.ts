import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { users } from '../users';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'listusers/updateinfo',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  user: users;
  private _id;
  
  constructor(private userService: UserService, private location: Location, private routers: ActivatedRoute) {  
  }

  ngOnInit() {
    this.routers.params.subscribe(param => {
      this._id = param['_id'];
    })
    console.log("ID is: "+this._id);
  }

  updateUser(user: users) {

    return this.userService.updateUser(user, this._id)
      .subscribe(
        () => {
          this.goBack();
        }
      )
  }

  goBack(): void {
    this.location.back();
  }

  // addInfoUser(data){
  //   document.getElementById("custtable").style.display = "block";
  //   var datas = {
  //     "name" : data.name,
  //     "phone": data.phone,
  //     "address": data.address,
  //     "message": data.message,
  //   };
  //   this.userData.push(datas);
  //   console.log(this.userData);
  // }
}
