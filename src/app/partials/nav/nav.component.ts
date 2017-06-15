import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth.service';

import * as firebase from 'firebase/app';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService]
})
export class NavComponent implements OnInit {
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
        } 
      });   
  }

  logout()
  {
       this.authService.logout();   
  }

}
