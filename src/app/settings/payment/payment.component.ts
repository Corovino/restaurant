import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers : [DatauserService, LogsUserService ]
})
export class PaymentComponent implements OnInit {

  private  key : any;
  private  payment: FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  paymentData : any;
  private  test : FirebaseListObservable<any[]>;
  private  jobData : any;
  private  dateNow;
  private  dataLogUser : any;

  constructor(private af : AngularFireDatabase, private du : DatauserService,  private logsUser : LogsUserService) { }

  ngOnInit() {


      this.restaurant = {};
      this.paymentData = {};
      this.du.getRestauranUser().subscribe( data => {

        data.map( data => {
          this.restaurant = {
              restaurant : data.restaurant,
              key : data.$key
          }
          this.payment = this.af.list('/paymentFrecuency', {
            query:{
              orderByChild: 'restaurant',
              equalTo: data.restaurant
            }
          });
        });
      });
      console.log(this.restaurant);
  }


  frecuencyPay( value : any)
  {

        console.log(value);
        this.du.getRestauranUser().subscribe( data => {

            return  data.map( data => {
              console.log(data.restaurant);
              this.payment.push({

                payment_name:value.payment_name,
                description:value.description,
                restaurant : data.restaurant
              });
            });

          }
        );

        this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Create', 'Payment');

  }



  editPayment(value : any)
  {
    this.key = value;
    this.payment.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.paymentData = {

            description:data.description,
            payment_name: data.payment_name
          }
        }

      } );
    });
    console.log(this.paymentData);
  }

  updatePayment(data: any)
  {

    this.payment.update(this.key, data);
    this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Payment');
  }


  deletePayment( data : any)
  {
     console.log(data);
     this.payment.remove(data);
     this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Payment');
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
