import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';


@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.css']
})
export class JobPositionComponent implements OnInit {

  private  key : any;
  private  job : FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  jobData : any;
  private  test : FirebaseListObservable<any[]>;

  constructor(  private af : AngularFireDatabase, private du : DatauserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.jobData = {};
    this.test =  this.af.list('/jobPosition');
    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant
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

  }



  editRace(value : any)
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
  }
}
