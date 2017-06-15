import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';

import { NavComponent } from '../partials/nav/nav.component';
import { AsideComponent } from '../partials/aside/aside.component';
import { FooterComponent } from '../partials/footer/footer.component';
import { RestaurantComponent } from '../restaurant/restaurant/restaurant.component';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ AuthService ]
})
export class DashboardComponent implements OnInit {
  private au: any;
  private user : any; 
  constructor(private  authService : AuthService, private af : AngularFireAuth ) 
  {
      this.au = firebase.auth();
  }

  ngOnInit() {
    
        
  }

   
  

}
