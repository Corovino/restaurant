import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../../providers/restaurant.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Restaurant } from '../../restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers:[RestaurantService]
})
export class RestaurantComponent implements OnInit {

  private restaurant: FirebaseListObservable<any[]>;
  private test: FirebaseListObservable<any[]>;
  public  val : any;
  private res : Restaurant[];
  private key :string;



  constructor(private resService : RestaurantService, private af : AngularFireDatabase ) {
      this.val = {};


  }

  ngOnInit() {
     this.restaurant = this.af.list('/restaurant');
     console.log(this.restaurant);
  }



  restaurantInfo(value : any)
  {
      console.log(value);
      this.resService.postRestaurant(value).then( data => {
         ( data ) ? alert ("Seguardaron los datos ") : alert ("Error al guardar ");
      });
  }

  editaRestaurant(key : any)
  {

     this.resService.getIdRestaurant(key).subscribe( data => {
        console.log(key);
        this.key = key;
          data.forEach( data => {

              if ( data.$key === key) {


                      this.val = {
                         store: data.store,
                         addres: data.addres,
                         state: data.state,
                         phone:data.phone,
                         zip :data.zip,
                         manager_name :data.manager_name,
                         manager_phone:data.manager_phone,
                         email: data.email,
                         ein:data.ein

                      };
              }
        });



     });

  }

  restauranEdit($event, data: any)
  {
      console.log(this.key);
      console.log("re",data);
      this.resService.updateRestaurant( this.key, data );
  }

  /*search( search : any)
  {


   this.restaurant = this.af.list('/restaurant',{
      query:{

        limitToFirst:1,
        orderBychild:"store",
        equalTo:search
      }
    });
     test.subscribe( data => {

          data.map( data => {
                console.log(data);
          });
    });
    console.log(this.restaurant);
    console.log(search);
  }*/


}
