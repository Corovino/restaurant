import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-logs-user',
  templateUrl: './logs-user.component.html',
  styleUrls: ['./logs-user.component.css'],
  providers : [ DatauserService ]
})
export class LogsUserComponent implements OnInit {

  private logsUser : FirebaseListObservable<any[]>;

  constructor(
    private af : AngularFireDatabase,
    private userRestaurant : DatauserService,

  ) {

  }

  ngOnInit() {


      let logs = this.userRestaurant.getRestauranUser().subscribe( data => {

           data.map( data => {
             console.log(data.$key);
             this.logsUser = this.af.list('/logsUser', {
               query:{
                 orderByChild:'name_user',
                 equalTo : data.restaurant
               }
             });

             this.logsUser.subscribe( data => {
                 console.log(data);
             })
           })
      });





  }

}
