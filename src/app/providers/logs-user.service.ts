import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as moment from 'moment/moment';
import * as firebase from 'firebase/app';

@Injectable()
export class LogsUserService {

  private au : any;
  private logUser : any;
  private dateNow : any;



  constructor( private af : AngularFireDatabase)
  {
    this.au = firebase.auth().currentUser;
    this.logUser = this.af.list('/logsUser');

  }



  createLogUser(data : any)
  {

    console.log(data);
    this.logUser.push({

            id_currentUser : data.id_currentUser,
            name_user   : data.name_user,
            action_user : data.action_user,
            from_action : data.from_action,
            created_at  : this.dateNow,
            update_at   : this.dateNow
       })
  }

  getLogsUserActions( userKey : any)
  {

      return  this.logUser = this.af.list('logsUser', {
            query:{
              orderByChild:'id_currentUser',
              equalTo : userKey
            }
        });
  }

}
