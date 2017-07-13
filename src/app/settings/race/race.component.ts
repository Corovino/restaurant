import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';


@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})

export class RaceComponent implements OnInit {

  private  key : any;
  private  race : FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  raceData : any;
  private  test : FirebaseListObservable<any[]>;

  constructor( private af : AngularFireDatabase, private du : DatauserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.raceData = {};
    this.test =  this.af.list('/race');
    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant
        }
        this.test = this.af.list('/race', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });

  }



  createRace( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({
            race_name:value.race_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );

  }



  editRace(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

        data.forEach( data => {

          if (data.$key == this.key)
          {
            this.raceData = {
              description:data.description,
              race_name: data.race_name
            }
          }

        });
    });
    console.log(this.raceData);
  }

  updateRace(data: any)
  {

    this.test.update(this.key, data);
  }

}
