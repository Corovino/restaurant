import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-source-hire',
  templateUrl: './source-hire.component.html',
  styleUrls: ['./source-hire.component.css'],
  providers : [DatauserService, LogsUserService ]
})
export class SourceHireComponent implements OnInit {

  private  key : any;
  private  restaurant : any;
  private  sourceData : any;
  private  test : FirebaseListObservable<any[]>;
  private  dateNow : any;
  private  dataLogUser : any;



  constructor( private af : AngularFireDatabase, private du : DatauserService, private logsUser : LogsUserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.sourceData = {};
    this.test =  this.af.list('/sourceHire');
    this.dateNow = moment().format('lLT');


    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant,
          key : data.$key
        }
        this.test = this.af.list('/sourceHire', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });

  }



  createSource( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({
            source_name:value.source_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Create', 'Source of Hire');

  }



  editSource(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.sourceData = {
            description:data.description,
            source_name: data.source_name
          }
        }

      });
    });
    console.log(this.sourceData);
  }

  updateSource(data: any)
  {

    this.test.update(this.key, data);
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Source of Hire');

  }

  deleteSource( data : any)
  {
     this.test.remove(data);
     this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Source of Hire');

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
