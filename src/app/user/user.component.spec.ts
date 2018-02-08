import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore";
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('UserComponent', () => {


  let firebaseConfig = {
    apiKey: "AIzaSyCaMhk0ZziaHn6QvAzBlCJA2vwFY0lx-iE",
    authDomain: "photobooth-f83ed.firebaseapp.com",
    databaseURL: "https://photobooth-f83ed.firebaseio.com",
    projectId: "photobooth-f83ed",
    storageBucket: "photobooth-f83ed.appspot.com",
    messagingSenderId: "571573564921"
  };
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, BrowserAnimationsModule  ],
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user component', () => {
    expect(component).toBeTruthy();
  });

});
