import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { WebCamComponent } from 'ack-angular-webcam';
import { Http, Request } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AuthenticateService, Http ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;
  webcam:WebCamComponent;
  base64: any;

  constructor(private _service:AuthenticateService, private _db: AngularFirestore, private http: HttpClient ) { }

    genBase64(){
        this.webcam.getBase64()
            .then( base=>this.base64=base)
    }

    //get HTML5 FormData object and pretend to post to server
    genPostData(){
        this.webcam.captureAsFormData({fileName:'file.jpg'})
            .then( formData=>this.postFormData(formData).subscribe( res => {
                console.log(res);
            } ))
    }

    //a pretend process that would post the webcam photo taken
    postFormData(formData){
        const config = {
            url:"http://www.aviorsciences.com/",
            body: formData
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'image/jpg'
            })
        };

        return this.http.post( config.url, config.body, httpOptions );
    }

    onCamError(err){}

    onCamSuccess(){}

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
