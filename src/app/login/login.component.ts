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

  }

  ngOnInit() {
  }

  loginUser(value: any)
  {
        let promise = this.authService.login(value.email, value.password);

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

}
