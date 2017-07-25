import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Restaurant  } from '../restaurant';
import * as firebase from 'firebase/app';

@Injectable()
export class RestaurantService {
  private restaurant: FirebaseListObservable<any[]>;
  private editRestaurant : FirebaseListObservable<any[]>;

  constructor(private af : AngularFireDatabase ) {
     this.restaurant = this.af.list('/restaurant');
  }


  getRestaurant()
  {

      return this.restaurant = this.af.list('/restaurant');
  }

  postRestaurant(value : any)
  {
      console.log('service restaurant', value.store)
      let result = new Promise((resolve, reject)=>{
           this.restaurant.push({
                store:value.store,
                addres:value.address,
                state:value.state,
                zip: value.zip,
                phone:value.phone,
                manager_name : value.manager_name,
                manager_phone : value.manager_phone,
                email:value.email,
                ein: value.ein,
                status: value.status
           });

      }).catch( error => {
          console.log('Error promesa postRestaurant', error);
      });

      return result;
  }

  getIdRestaurant(key : any)
  {

     return this.af.list('/restaurant/');

  }

  updateRestaurant(key: any,data : any)
  {
      console.log(data);
      return this.restaurant.update(key, data);
  }

}
