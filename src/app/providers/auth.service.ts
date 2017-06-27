import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';
import { CanActivate }    from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService  {
  public user : Observable<firebase.User>;
  private auth;
  private  response : boolean;
  loggedIn: boolean = false;


  constructor( public afAuth: AngularFireAuth, private router : Router)
  {
       this.user = afAuth.authState;
       this.auth = firebase.auth();
  }


  login(email : string, password : string ) {


     this.auth.signInWithEmailAndPassword(email, password).then( login => {
       console.log(this.user);

       if(login){
         console.log(login);
         this.getUserLoggedIn();
       }
         console.log(login);



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
       console.log(login);
       this.router.navigate(['/dashboard']);
     }else{
       console.log(login);
     }
     });
  }

}
