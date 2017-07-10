import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Fileitem } from '../directives/fileitem';
import * as firebase from 'firebase';
import * as _ from 'lodash';

@Injectable()
export class UploadImagesService {

  private IMAGES_FOLDER: string = 'images';
  private user : any;

  constructor(public af: AngularFireDatabase)
  {
    this.user = af.list('/users');
  }

  listLastImages( uid : string): FirebaseListObservable<any[]>{
    return this.af.list(`/${this.IMAGES_FOLDER}`, {
      query: {
        orderByChild: 'name',
        equalTo: uid
      }
    });
  }

  uploadImagesToFirebase(files: Array<Fileitem[]> ,uid: string) {
    let storageRef = firebase.storage().ref();
    let key = {
       uid : uid
    }
    _.each(files, (item:Fileitem) => {
      console.log(item.file.name);
      item.isUploading = true;
      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMAGES_FOLDER}/${uid}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.user.update(key.uid, {imgUrl : item.url});
          console.log(item.url);

          this.saveImage({ name: item.file.name, url: item.url });
        }
      );

    });

  }

  private saveImage(image:any) {
    this.af.list(`/${this.IMAGES_FOLDER}`).push(image);
  }

}
