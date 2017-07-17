import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-termination-work-employee',
  templateUrl: './termination-work-employee.component.html',
  styleUrls: ['./termination-work-employee.component.css'],
  providers : [ LogsUserService, DatauserService ]
})
export class TerminationWorkEmployeeComponent implements OnInit {

  @Input()  firts_name : string;
  @Input()  last_name : string;
  @Input()  id_employee : string;


  private terminationWork : FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private nameRestaurant : any;
  private dateNow : any;
  private dataLogUser : any;
  private userKey : any;

  constructor(private af : AngularFireDatabase, private dataUser : DatauserService,  private  logUser : LogsUserService ) { }

  ngOnInit() {

    this.dateNow = moment().format('lLT');
    this.nameRestaurant = '';
    this.userKey = '';
    this.terminationWork = this.af.list('/terminationWork');


    let test = this.dataUser.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.nameRestaurant = data.restaurant;
        this.userKey =data.$key;
        this.terminationWork = this.af.list('terminationWork',{
          query : {
            orderByChild : 'restaurant',
            equalTo : data.restaurant
          }
        });
      });

    });

  }


  createTermination(data :any)
  {
      console.log(data);
      this.terminationWork.push({
           id_employee: data.id_employee,
           restaurant: this.nameRestaurant,
           name_employee : data.name_employee,
           remarks : data.remarks,
           created_at : this.dateNow,
           update_at : this.dateNow
      });

      this.logUserAction(this.userKey, this.nameRestaurant);
  }

  logUserAction(userKey : any, restaurant : any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user :"Termination Work",
      from_action :"Termiantion Contract",
    };
    this.logUser.createLogUser(this.dataLogUser);
  }

}
