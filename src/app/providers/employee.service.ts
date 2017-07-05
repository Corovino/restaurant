import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from './datauser.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  private employee : FirebaseListObservable<any>;

  constructor( private af : AngularFireDatabase, private userRestaurant : DatauserService ) { }

  countEmployee()
  {

      let test = this.userRestaurant.getRestauranUser().subscribe( data => {

        return data.map( data => {
          console.log(data.restaurant);
          this.employee = this.af.list('/employees',{
            query:{
              orderByChild: 'restaurant',
              equalTo: data.restaurant
            }
          });

        });
      });

      return test;
  }



}
