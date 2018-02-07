import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatIconModule, MatTabsModule, MatCardModule } from "@angular/material";
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from "angularfire2/firestore";
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFireModule } from "angularfire2";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('HomeComponent', () => {

  let firebaseConfig = {
      apiKey: "AIzaSyCaMhk0ZziaHn6QvAzBlCJA2vwFY0lx-iE",
      authDomain: "photobooth-f83ed.firebaseapp.com",
      databaseURL: "https://photobooth-f83ed.firebaseio.com",
      projectId: "photobooth-f83ed",
      storageBucket: "photobooth-f83ed.appspot.com",
      messagingSenderId: "571573564921"
  };

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatIconModule, MatTabsModule, MatCardModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule, BrowserAnimationsModule  ],
      declarations: [ HomeComponent ],
      providers: [ AngularFirestore, AuthenticateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

});
