import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('AuthenticateService', () => {


  let firebaseConfig = {
    apiKey: "AIzaSyCaMhk0ZziaHn6QvAzBlCJA2vwFY0lx-iE",
    authDomain: "photobooth-f83ed.firebaseapp.com",
    databaseURL: "https://photobooth-f83ed.firebaseio.com",
    projectId: "photobooth-f83ed",
    storageBucket: "photobooth-f83ed.appspot.com",
    messagingSenderId: "571573564921"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, BrowserAnimationsModule ],
      providers: [AuthenticateService]
    });
  });

  it('Auth Service should be created', inject([AuthenticateService], (service: AuthenticateService) => {
    expect(service).toBeTruthy();
  }));

});
