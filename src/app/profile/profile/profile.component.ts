import { Component, OnInit } from '@angular/core';

import { DatauserService } from '../../providers/datauser.service';
import { Fileitem } from '../../directives/fileitem';
import { UploadImagesService } from '../../providers/upload-images.service';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers : [ UploadImagesService, FormBuilder ]
})
export class ProfileComponent implements OnInit {

  private  user : any;
  private  userId : any;
  private  form : FormGroup;


  isDropZoneOver:boolean = false;
  isEnabledUpload: boolean = true;
  files: Array<Fileitem[]> = [];

  constructor( private dataUser: DatauserService, public uploadImagesService: UploadImagesService, private fb : FormBuilder )
  {

  }

  ngOnInit() {


      this.userId = {};

       this.user = [];

       console.log(this.user.email);

       this.dataUser.getRestauranUser().subscribe( data => {

         console.log(data.$key);
         return data.map( data => {
                    this.user ={
                       rol : data.rol,
                       name : data.name,
                       phone : data.cell_phone,
                       last_name : data.last_name,
                       email : data.email,
                       uid: data.$key,
                       imgUrl : data.imgUrl
                    }
                    console.log(data.imgUrl);
               });

       });

       //TODO terminar validación  pass change
      /*this.form = this.fb.group({
        password: ['',[<any>Validators.required]],
        confirmPassword: ['', [<any>Validators.required]],
      }, {
        validator: PasswordValidation.MatchPassword
      });*/


  }



  public fileOverDropZone(e:any):void {
    this.isDropZoneOver = e;
  }

  /*uploadImagesToFirebase() {
    this.isEnabledUpload = false;
    this.uploadImagesService.uploadImagesToFirebase(this.files);
  }*/

  clearFiles() {
    this.files = [];
    this.isEnabledUpload = true;
  }


  accountInfo( dataUser : any)
  {
      console.log(dataUser);

      this.files.map( data => console.log(data));


      this.isEnabledUpload = false;
      this.uploadImagesService.uploadImagesToFirebase(this.files, dataUser.uid);

      let user = this.dataUser.updateUserInfo(dataUser);
      console.log(user);
      ( user ) ? console.log('ok') : console.log(user);
  }

  updatePass( data : any)
  {
       let uid = this.dataUser.updatePassUser(data.new_pass);
       document.getElementById("editPass").click();
  }

}
