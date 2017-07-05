import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { UserPipe } from '../../pipes/user.pipe';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;

  constructor(private af : AngularFireDatabase, private auth : AuthService)
  {

  }

  ngOnInit() {

  	this.user = this.af.list('/users');
  	this.restaurant = this.af.list('/restaurant');
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
                rol:value.rol
  			});

  			//this.register();
  		} ).catch( error => {
          console.log('Error promesa postRestaurant', error);
  		});

  		this.register(value.email,value.password);
  }

  register(email: string, password : string)
  {
     this.auth.register(email, password);
  }


}
