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
  

  constructor( public afAuth: AngularFireAuth, private router : Router) 
  {
       this.user = afAuth.authState;
       this.auth = firebase.auth();
       
      

  }

 
  login(email : string, password : string ) {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

     this.auth.signInWithEmailAndPassword(email, password).catch( error => {
           
           let errorCode = error.code;
           let errorMessage = error.message;

           if (errorCode === 'auth/wrong-password') {
             alert('Wrong password.');
           } else {
             alert(errorMessage);
           }
           console.log(error);
     });
    
     this.auth.onAuthStateChanged(login =>{
          console.log(login);
          if(login){
            this.router.navigate(['/dashboard']);
          }else{
            //alert('No es posible ingresar en este momento');
            console.log(login);
          }
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
       
        this.router.navigate(['/dashboard']);
      } ).catch( e => {
         console.log(e);
      });
     /* this.auth.onAuthStateChanged(firebaseUser =>{   
          if( firebaseUser )
          {
                alert("Se haregistrado satisfactoriamente. Porfavor ingrese");
                this.router.navigate(['/dashboard']);
          } else{
                alert("Erro al ingresar  los datos, intentalo de nuevo ");
          }
      } );*/
      
  }

}
