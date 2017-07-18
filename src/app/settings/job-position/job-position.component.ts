import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.css'],
  providers : [DatauserService, LogsUserService ]

})
export class JobPositionComponent implements OnInit {

  private  key : any;
  private  job : FirebaseListObservable<any[]>;
  private  test : FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  jobData : any;
  private  dateNow;
  private  dataLogUser : any;

  constructor(  private af : AngularFireDatabase, private du : DatauserService, private logsUser : LogsUserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.jobData = {};
    this.test =  this.af.list('/jobPosition');
    this.dateNow = moment().format('lLT');



    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant,
          key : data.$key
        }
        this.test = this.af.list('/jobPosition', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });

  }



  createJob( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({
            job_name:value.job_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );

    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Create', 'Job');


  }



  editJob(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.jobData = {
            description:data.description,
            job_name: data.job_name
          }
        }

      });
    });
    console.log(this.jobData);
  }

  updateJob(data: any)
  {
     this.test.update(this.key, data);
     this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Job');
  }

  deleteJob( data : any)
  {
      console.log( data);
      this.test.remove(data);
      this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Job');
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
