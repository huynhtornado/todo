import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  show() {
    document.getElementById('fas').style.display = 'none';
    document.getElementById('list-menu').style.display = 'block';
  }

  hide() {
    document.getElementById('fas').style.display = 'block';
    document.getElementById('list-menu').style.display = 'none';
  }
}
