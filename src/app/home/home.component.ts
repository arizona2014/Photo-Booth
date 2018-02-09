import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { WebCamComponent } from 'ack-angular-webcam';
import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import {
    AngularFireStorage,
    AngularFireStorageReference,
    AngularFireUploadTask
} from 'angularfire2/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AuthenticateService, Http ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private webcam:WebCamComponent;
  private base64: any;
  private basePath = '/images/';
  private storageRef;
  private filesUploaded: any ;
  private photosUploaded: any ;

  constructor(  private _service:AuthenticateService,
                private _db: AngularFirestore,
                private http: HttpClient,
                private storage: AngularFireStorage,
                public zone: NgZone  ) { }

  //
  genBase64(){
      this.webcam.getBase64()
          .then( base=>this.base64=base)
  }

  getImages() {
    const filesUploadsRef = this.storageRef.child('images/selfie-1518075808194.png');
    filesUploadsRef.getDownloadURL().then( (url) => {
        this.zone.run(() => {
            this.filesUploaded = url;
            console.log(this.filesUploaded);
        });
      }).catch(function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
              case 'storage/object_not_found':
                  // File doesn't exist
                  console.log("File doesn't exist");
                  break;

              case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  console.log("User doesn't have permission to access the object");
                  break;

              case 'storage/canceled':
                  // User canceled the upload
                  console.log("User canceled the upload");
                  break;

              case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  console.log("Unknown error occurred, inspect the server response");
                  break;
          }
      });

  }

  // Callback function triggered when user takes a selfie
  shoot(){
      this.genBase64();
      // Create the filename
      const timestamp = Date.now();
      const theFileName = 'selfie-' + timestamp.toString() + '.png';
      this.webcam.captureAsFormData({fileName: theFileName })
          .then( formData=>this.upload(this.base64, theFileName));
  }

  // The actual function which uploads the image
  upload(data, fileName){
    // Create the file metadata
    const metadata = {
        contentType: 'image/jpeg'
    };
    // Create the firebase storage reference
    const uploadTask = this.storageRef.child(this.basePath + fileName)
                           .putString(data, 'data_url')
                           .then( res => {
                               console.log(res);
                               this.addImageInfos(res.metadata.name, res.metadata.downloadURLs[0]);
                           })

  }

  addImageInfos(fileName, url) {
      const data = {
          name: fileName,
          url: url,
          userId: 'qbk7qaLUFfc65YlGlDq0'
      };
      //noinspection TypeScriptUnresolvedFunction
      this._db.collection('photos').add(data)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
              console.error("Error adding document: ", error);
      });
  }

  onCamError(err){}

  onCamSuccess(){}

  ngOnInit() {
    this.storageRef = this.storage.storage.ref();
    this._service.checkCredentials();
    this.loadPhotosNames();
  }

  tabChange(e) {
    if(e.index === 0){
        this.webcam.afterInitCycles();
    }
  }

  loadPhotosNames() {
    this.photosUploaded = this._db.collection('photos').valueChanges();
  }

  logout(): void {
    this._service.logout();
  }

}
