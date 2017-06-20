import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ AuthService ]
})
export class LoginComponent implements OnInit {
  private auth: any;
  constructor(private authService : AuthService,  private au :AngularFireAuth, private router : Router) 
  {
      this.auth = firebase.auth();
      this.auth.onAuthStateChanged( login => {
          if(login){
            this.router.navigate(['/dashboard']);
          }else{

          }
      });
  }

  ngOnInit() {
  }

  loginUser(value: any)
  {
      console.log(value); 
      let promise = this.authService.login(value.email, value.password);

      /*promise.subscribe( response => {
          console.log(promise);        
      })

      this.auth.onAuthStateChanged( login => {
         console.log(login);
          if(login){
            this.router.navigate(['/dashboard']);
          }else{
            alert('No es posible ingresar en este momento');
          }
      });*/
  }

  recoverPass(mailAddres: any){

    console.log(mailAddres);
    let reset = {
       email : mailAddres
    }
    
    this.auth.sendPasswordResetEmail(mailAddres.email).then( response => {
        alert('Se envio un correo a su cuenta.'); 
        console.log('Se envio un correo a su cuenta.',response);
    }).catch( error => {
       alert('');
       console.log('error', error);
    });
  }

}