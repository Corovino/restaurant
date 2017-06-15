import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[ AuthService ]
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router ) { }

  ngOnInit() {
  }
   
  registerUser(value : any)
  {
     let response = this.authService.register(value.email,value.password);
     
  } 
}
