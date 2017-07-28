import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ AuthService, ReCaptchaComponent ]
})
export class LoginComponent implements OnInit {
  private auth: any;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  constructor(private authService : AuthService,  private au :AngularFireAuth, private router : Router, private component: ReCaptchaComponent)
  {
      this.auth = firebase.auth();

  }

  ngOnInit() {
  }

  loginUser(value: any)
  {

        //let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        console.log(this.captcha);
        let promise = this.authService.login(value.email, value.password, this.captcha);

  }

  recoverPass(mailAddres: any){


        this.auth.sendPasswordResetEmail(mailAddres.email).then( response => {
            alert('An email has been sent to your account to retrieve your password');
            console.log('Se envio un correo a su cuenta.',response);
        }).catch( error => {
           alert('');
           console.log('error', error);
        });
  }

  handleCorrectCaptcha(event)
  {

     return this.captcha = event.subscribe( data => {
        console.log(data);
     });
    //this.captcha = event.getResponse(); console.log(event.getResponse());
  }


}
