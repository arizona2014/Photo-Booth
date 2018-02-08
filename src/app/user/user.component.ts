import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public username: string;
  public password: string
  constructor() {
      this.username = '';
      this.password = '';
  }

  ngOnInit() {
  }

}
