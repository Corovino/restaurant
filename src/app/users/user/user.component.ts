import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: FirebaseListObservable<any[]>;

  constructor(private af : AngularFireDatabase)
  {
  	  
  }

  ngOnInit() {
  	this.user = this.af.list('/users');
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
                rol:value.rol
  			});	
  		} ).catch( error => {
          console.log('Error promesa postRestaurant', error);
  		});
  }

}
