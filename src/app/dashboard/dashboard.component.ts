import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';
import { DatauserService } from '../providers/datauser.service';


import { NavComponent } from '../partials/nav/nav.component';
import { AsideComponent } from '../partials/aside/aside.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { RestaurantComponent } from '../restaurant/restaurant/restaurant.component';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ AuthService, DatauserService ]
})
export class DashboardComponent implements OnInit {
  private au: any;
  private user : any;
  private employess : any;
  private employeCount : any;
  private absence : any;
  private countAbsence : any;
  constructor(private  authService : AuthService, private af : AngularFireAuth, private dataBase : AngularFireDatabase, private userRestaurant : DatauserService )
  {
      this.au = firebase.auth();
  }

  ngOnInit() {

    this.au.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });

    let employee = this.userRestaurant.getRestauranUser().subscribe( data => {

      return data.map( data => {
        console.log(data.restaurant);
        this.employess = this.dataBase.list('/employees',{
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        }).subscribe( data => {
            this.employeCount = data.length;
        });

        this.absence = this.dataBase.list('/absences', {
          query : {
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        }).subscribe( data => {
            this.countAbsence = data.length;
        });
      });
    });






  }



}
