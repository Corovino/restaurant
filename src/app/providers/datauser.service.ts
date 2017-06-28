import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Restaurant  } from '../restaurant';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';


@Injectable()
export class DatauserService {


  private au : any;
  private users : any;

  constructor( private af : AngularFireDatabase  ) { }



  getRestauranUser()
  {
    this.au = firebase.auth().currentUser.email;

    this.users = this.af.list("/users",{
      query:{
        orderByChild: 'email',
        equalTo: this.au
      }
    });

    return this.users;
  }




}
