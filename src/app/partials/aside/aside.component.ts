import { Component, OnInit } from '@angular/core';
import { RestaurantComponent } from '../../restaurant/restaurant/restaurant.component';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {DropdownModule} from "ngx-dropdown";

import { AuthService } from '../../providers/auth.service';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  private user : any;
  private au : any;

  constructor(private af : AngularFireAuth, private  authService : AuthService,)
  {
    this.au = firebase.auth();
  }

  ngOnInit() {
    this.au.onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        if (this.user == "hjr@iqthink.com") {
            this.user=1;
        }else{
            this.user=2;
        }
      }
    });
  }

}
