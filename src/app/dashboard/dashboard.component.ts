import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';
import { DatauserService } from '../providers/datauser.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';


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
  private currentUrl: string = '/';

  constructor(private  authService : AuthService, private af : AngularFireAuth, private dataBase : AngularFireDatabase, private userRestaurant : DatauserService, private router: Router )
  {
      this.au = firebase.auth();

  }



  ngOnInit() {

    this.au.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });

    this.router.events.forEach((event: NavigationEvent) => {
      if(event instanceof NavigationStart)
      {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });

  }



}
