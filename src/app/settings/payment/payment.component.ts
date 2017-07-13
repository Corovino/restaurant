import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private  key : any;
  private  payment: FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  paymentData : any;

  constructor(private af : AngularFireDatabase, private du : DatauserService) { }

  ngOnInit() {


      this.restaurant = {};
      this.paymentData = {};
      this.du.getRestauranUser().subscribe( data => {

        data.map( data => {
          this.restaurant = {
              restaurant : data.restaurant
          }
          this.payment = this.af.list('/paymentFrecuency', {
            query:{
              orderByChild: 'restaurant',
              equalTo: data.restaurant
            }
          });
        });
      });
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
  }



}
