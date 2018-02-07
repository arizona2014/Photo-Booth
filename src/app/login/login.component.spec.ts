import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatInputModule, MatSlideToggleModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('LoginComponent', () => {

  let firebaseConfig = {
    apiKey: "AIzaSyCaMhk0ZziaHn6QvAzBlCJA2vwFY0lx-iE",
    authDomain: "photobooth-f83ed.firebaseapp.com",
    databaseURL: "https://photobooth-f83ed.firebaseio.com",
    projectId: "photobooth-f83ed",
    storageBucket: "photobooth-f83ed.appspot.com",
    messagingSenderId: "571573564921"
  };

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatInputModule, MatSlideToggleModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, BrowserAnimationsModule ],
      declarations: [ LoginComponent ],
      providers: [ AngularFirestore ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });
});
