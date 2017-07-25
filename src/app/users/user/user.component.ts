import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { UserPipe } from '../../pipes/user.pipe';
import { AuthService } from '../../providers/auth.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment'
import {Logs} from "selenium-webdriver";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [AuthService, LogsUserService ]
})
export class UserComponent implements OnInit {

  private user: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private rol : FirebaseListObservable<any[]>;
  private userEdit : any;
  private keyUser : string;
  private dataLogUser : any;
  private dateNow : any;
  private nameRestaurant : any;


  constructor(private af : AngularFireDatabase, private auth : AuthService, private logUser : LogsUserService )
  {

  }

  ngOnInit() {

  	this.user = this.af.list('/users');
  	this.restaurant = this.af.list('/restaurant');
  	this.userEdit = {};
  	this.keyUser = '';
  	this.dataLogUser = {};
    this.dateNow = moment().format('lLT');
    this.nameRestaurant = '';
    console.log(this.user);

  }


  userInfo(value : any)
  {
  		console.log(value);
  		let promise = new Promise( (resolve, reject) =>{
  			this.user.push({

                name:value.name,
                last_name:value.last_name,
                password:value.password,
                cell_phone:value.cellphone,
                email: value.email,
                restaurant:value.restaurant,
                rol:value.rol,
                status : value.status
  			});

  			//this.register();
  		} ).catch( error => {
          console.log('Error promesa postRestaurant', error);
  		});
      let userName = value.name.concat(value.last_name);
  		this.register(value.email,value.password);
      this.logUserAction( userName, value.restaurant , 'Create', 'user');
  }

  register(email: string, password : string)
  {
     this.auth.register(email, password);
  }

  editUser( key : any )
  {
      this.user.subscribe( data => {

        data.forEach( value => {
              if (value.$key === key )
              {
                this.keyUser = value.$key;
                this.nameRestaurant = value.restaurant;
                this.userEdit= {
                  name:value.name,
                  last_name:value.last_name,
                  password:value.password,
                  cell_phone:value.cell_phone,
                  email: value.email,
                  restaurant:value.restaurant,
                  rol:value.rol,
                  status : value.status
                }


              }
              console.log(this.userEdit);
          });
      } );
  }

  updateUser( data : any)
  {
     console.log( data );
     this.user.update(this.keyUser, data);
     this.logUserAction(this.keyUser, this.nameRestaurant , 'Update', 'user')

  }

  logUserAction(userKey : any, restaurant : any, action_user: any , from_action:any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user : action_user,
      from_action :from_action,
    };
    this.logUser.createLogUser(this.dataLogUser);
  }

}
