import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Restaurant  } from '../restaurant';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';


@Injectable()
export class DatauserService {


  private au : any;
  private users : any;
  private userId :any;

  constructor( private af : AngularFireDatabase, private auth : AuthService  )
  {
    this.au = firebase.auth().currentUser;
    this.users = this.af.list('/users');

  }



  getRestauranUser()
  {

    this.users = this.af.list("/users",{
      query:{
        orderByChild: 'email',
        equalTo: this.au.email
      }
    });
    console.log(this.au.email);
    console.log(this.users);
    return this.users;
  }

  getCurrentUserEmail()
  {
     return this.au.email;
  }


  updateUserInfo(data : any)
  {
     console.log(data);
     this.users.update(data.uid, data);
  }

  updatePassUser( newPass: any )
  {
       return this.au.updatePassword(newPass).then( data => {

             setTimeout( ()=> {
               alert("Update Password Ok, Please enter whit a new password");
               this.auth.logout();
             }, 3000);

       },(error) => {
          return error;
      });
  }

  getCurrenUserIdDb()
  {
      this.userId = this.af.list('/users',{
         query:{
           orderBychild:'email',
           equalTo : this.au.email
         }
      });

      return this.userId;
  }







}
