import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';



@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  providers : [DatauserService, LogsUserService ]
})

export class RaceComponent implements OnInit {

  private  key : any;
  private  race : FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  raceData : any;
  private  test : FirebaseListObservable<any[]>;
  private  jobData : any;
  private  dataLogUser : any;

  constructor( private af : AngularFireDatabase, private du : DatauserService, private logsUser : LogsUserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.raceData = {};
    this.test =  this.af.list('/race');
    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant,
          key : data.$key
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
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Create', 'Race');
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
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Absence');
  }

  deleteRace( data : any)
  {
     this.test.remove(data);
     this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Race');
  }

  logUserAction(userKey : any, restaurant : any, action_user: any , from_action:any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user : action_user,
      from_action :from_action,
    };
    this.logsUser.createLogUser(this.dataLogUser);
  }

}
