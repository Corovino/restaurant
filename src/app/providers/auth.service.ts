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
  private userStatus : any;
  private restaurantStatus :any;
  private auth;
  private au : any;
  private userEmail : string;


  constructor( public afAuth: AngularFireAuth, private router : Router, private af : AngularFireDatabase)
  {
       this.user = afAuth.authState;
       this.auth = firebase.auth();
       this.au = firebase.auth().currentUser;
  }


  login(email : string, password : string ) {

     this.userEmail = email;
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
        console.log(this.userEmail);

        if(this.userEmail === "hjr@iqthink.com")
        {
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard/home']);
        }else{

            this.validStatusUser( this.userEmail ).subscribe( data => {

                 data.map(  data => {
                   console.log(data.email);

                       let restaurant = this.af.list('/restaurant', {
                         query:{
                            orderByChild:'store',
                            equalTo : data.restaurant
                         }
                       }).subscribe( value => {
                           value.map( resp => {
                             console.log(resp.status);
                             console.log(data.status);
                             if ( data.status === "1" && resp.status === "1")
                             {
                               localStorage.setItem('isLoggedin', 'true');
                               this.router.navigate(['/dashboard/home']);
                             }else{

                               alert('No es posible acceder en este momento. Comuniquese con el administrador');
                               this.logout();
                             }


                           });
                       });



                 });
            });
        }


     }else{
       console.log(login);
     }
     });
  }

  validStatusUser( email : string)
  {

    this.userStatus = this.af.list('/users', {
      query : {
        orderByChild : 'email',
        equalTo : email
      }
    })

    return this.userStatus;
  }


}
