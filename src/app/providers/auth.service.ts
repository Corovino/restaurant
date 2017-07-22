import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';
import { CanActivate }    from '@angular/router';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService  {
  public user : Observable<firebase.User>;
  private auth;
  private au : any;
  private  response : boolean;
  //loggedIn: boolean = false;
  private reAuth;
  public redirectUrl: string;

  constructor( public afAuth: AngularFireAuth, private router : Router)
  {
       this.user = afAuth.authState;
       this.auth = firebase.auth();
       this.au = firebase.auth().currentUser;


  }


  login(email : string, password : string ) {


     this.auth.signInWithEmailAndPassword(email, password).then( login => {

       console.log(this.user);

       if(login){

         this.getUserLoggedIn();
       }

     }).catch( error => {

           let errorCode = error.code;
           let errorMessage = error.message;

           if (errorCode === 'auth/wrong-password') {
             alert('Wrong password.');
           } else {
             alert(errorMessage);
           }
           console.log(error);
     });


  }

  logout() {
    this.auth.signOut().then(() =>{

        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);

    }).catch(e =>{
        console.log(e);
    });
  }

  register(email:any, password:any)
  {

      this.auth.createUserWithEmailAndPassword(email, password).then(e =>{

        //this.router.navigate(['/dashboard']);
         console.log(e);
      } ).catch( e => {
         console.log(e);
      });


  }

  getUserLoggedIn()
  {

    this.auth.onAuthStateChanged( login => {
     console.log(login);
     if(login){

        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard/home']);

     }else{
       console.log(login);
     }
     });
  }


  getUserCredentials(email: string, password: string)
  {

    //let email =  this.au = firebase.auth().currentUser;
      /*var user = this.afAuth.auth.Auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      this.auth.reauthenticate(credential).then(function() {
        // User re-authenticated.
      }, function(error) {
        // An error happened.
        console.log(error);
      });*/

     console.log(email);
     console.log(password);
     const credential = this.auth.EmailAuthProvider.credential(email, password);
     console.log(credential);
     this.au.reauthenticate(credential)
       .then((_) => {
         console.log('User reauthenticated');

       })
       .catch((error) => {
         console.log(error);
     });

  }

}
