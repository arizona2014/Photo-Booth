import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AuthenticateService ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private _service:AuthenticateService, private _db: AngularFirestore) { }

  ngOnInit() {
    this._service.checkCredentials();
    this.loadPhotos();
  }

  loadPhotos() {
    this.data = this._db.collection('photos').valueChanges();
  }

  logout(): void {
    this._service.logout();
  }

}
