import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';

import { AuthService } from '../../providers/auth.service';

import * as firebase from 'firebase/app';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService, DatauserService ]
})
export class NavComponent implements OnInit {
  private user : any;
  private au : any;
  private restaurantName : string;

  constructor(private af : AngularFireAuth, private  authService : AuthService, private restaurant : DatauserService )
  {
      this.au = firebase.auth();
      this.restaurantName = "Grubiz";

  }

  ngOnInit() {

    this.au.onAuthStateChanged(user => {
        if (user) {
            this.user = user.email;
        }
      });

    this.restaurant.getRestauranUser().subscribe( data => {

           data.map( data => {

               this.restaurantName = data.restaurant;

          });

    } );



  }

  logout()
  {
       this.authService.logout();
  }

}
