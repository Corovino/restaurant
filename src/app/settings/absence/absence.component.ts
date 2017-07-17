import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  providers : [DatauserService, LogsUserService ]
})
export class AbsenceComponent implements OnInit {

  private  key : any;
  private  absence: FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  absenceData : any;
  private  test: FirebaseListObservable<any[]>;
  private  dateNow : any;
  private  dataLogUser :any;

  constructor(private af : AngularFireDatabase, private du : DatauserService, private logsUser : LogsUserService  ) { }

  //TODO mejorar problema con Observable Iterator
  ngOnInit() {


    this.restaurant = {};
    this.absenceData = {};
    this.dateNow = moment().format('lLT');


    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {
        this.restaurant = {
          restaurant : data.restaurant,
          key : data.$key
        }
        console.log(this.restaurant);
        this.test = this.af.list('/absence', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });
  }


  createAbsence( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({

            absence_name:value.absence_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );

  }



  editAbsence(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.absenceData = {

            description:data.description,
            absence_name: data.absence_name
          }
        }

      } );
    });
    console.log(this.absenceData);
  }

  updateAbsence(data: any)
  {

    this.test.update(this.key, data);
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Absence');
  }

  deleteAbsence( data : any)
  {
      console.log(data);
      this.test.remove(data);
      this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Absence');

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
