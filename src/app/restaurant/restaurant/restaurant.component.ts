import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../../providers/restaurant.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { ModalsComponent } from '../../modals/modals.component';
//import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers:[RestaurantService]
})
export class RestaurantComponent implements OnInit {

  private restaurant: FirebaseListObservable<any[]>;
  public val : any;

  
  constructor(private resService : RestaurantService, private af : AngularFireDatabase ) { 
   
  }

  ngOnInit() {
     this.restaurant = this.af.list('/restaurant');
     console.log(this.restaurant);
  }
  
  ClickButton()
  {
      console.log("data");
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
    console.log(key);
     let promise = this.af.list('/restaurant/'+key);
     promise.subscribe(data =>{
          console.log(data);
     } );
     this.val = promise
     console.log(this.val);

      //let val = data.target.closest('tr').innerText;
      //let array = val.split(',');
      //console.log(array);
  }
  

}
