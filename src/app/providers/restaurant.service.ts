import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class RestaurantService {
  private restaurant: FirebaseListObservable<any[]>;
  private editRestaurant : FirebaseListObservable<any[]>;
  
  constructor(private af : AngularFireDatabase ) { 
     
  }


  getRestaurant()
  {
     
      return this.restaurant = this.af.list('/restaurant');
  }

  postRestaurant(value : any)
  {
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
                ein: value.ein 
           });

      }).catch( error => {
          console.log('Error promesa postRestaurant', error);
      });

      return result;
  }

  getIdRestaurant(key : any)
  {
     
     return this.af.list('/restaurant/'+key);
     /*promise.subscribe(data =>{
          console.log(data);
     } );
     this.val = promise
     console.log(this.val);*/
  }

}
