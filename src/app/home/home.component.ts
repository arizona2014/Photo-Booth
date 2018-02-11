import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { AngularFirestore } from 'angularfire2/firestore';
import { WebCamComponent } from 'ack-angular-webcam';
import { Http } from '@angular/http';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AuthenticateService, Http ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public webcam:WebCamComponent;
  public base64: any;
  public basePath = '/images/';
  public storageRef;
  public photosUploaded: any ;
  public options: any ;

  constructor(  private _service:AuthenticateService,
                private _db: AngularFirestore,
                private storage: AngularFireStorage ) { }

  //
  genBase64(){
      this.webcam.getBase64()
          .then( base=>this.base64=base)
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


  removeImageInfos(id) {

      this._db.collection('photos').doc(id).delete();

  }

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
      this.photosUploaded = this._db.collection('photos').snapshotChanges().map(photos => {



          return photos.map( (a: any) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;

              const name = a.payload.doc._document.data.internalValue.root.left.value.internalValue;
              const url = a.payload.doc._document.data.internalValue.root.value.internalValue;
              return { id, name, url };
          });

      });
  }

  makeCard(e) {
      console.log(e);
  }

  deletePhoto(e) {
      // Create the firebase storage reference
      const deleteTask = this.storageRef.child(this.basePath + e.name);
      deleteTask.delete().then( res => {
              console.log(res);
              this.removeImageInfos(e.id);
          })
  }

  onCamError(err){}

  onCamSuccess(e){}

  logout(): void {
    this._service.logout();
  }

}
