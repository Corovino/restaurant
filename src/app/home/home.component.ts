import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../providers/datauser.service';
import * as firebase from 'firebase/app';
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user : any;
  private au :any;
  private employess : any;
  private employeCount : any;
  private absence : any;
  private countAbsence : any;
  private huge: any;

  constructor(private dataBase : AngularFireDatabase, private userRestaurant : DatauserService)
  {
     this.au = firebase.auth();
  }

  ngOnInit() {

    this.userRestaurant.getRestauranUser();
    this.huge = {};
    this.au.onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        if (this.user == "hjr@iqthink.com") {

          this.user=1;
          this.huge ={
            huge_one : 'Restaurant',
            huge_two : 'Users'
          }
          this.dataHomeGrubiz(1,'/restaurant','/users');

        }else{

          this.user=2;
          this.huge ={
            huge_one : 'Employees',
            huge_two : 'Absences'
          }
          this.dataHomeGrubiz(2, '/employees','/absences');

        }
      }
    });



  }

  dataHomeGrubiz( redirect : number, query_one :any, query_two:any )
  {
      console.log(query_one);
      console.log(query_two);

      if ( redirect === 1)
      {
           this.employess = this.dataBase.list(query_one).subscribe( data =>{

                        this.employeCount = data.length;

           });

           this.absence = this.dataBase.list( query_two).subscribe( data => {

                        this.countAbsence = data.length;

           });

      }else{

            let employee = this.userRestaurant.getRestauranUser().subscribe( data => {

              return data.map( data => {

                this.employess = this.dataBase.list(query_one,{
                  query:{
                    orderByChild: 'restaurant',
                    equalTo: data.restaurant
                  }
                }).subscribe( data => {
                  this.employeCount = data.length;
                });

                this.absence = this.dataBase.list(query_two, {
                  query : {
                    orderByChild: 'restaurant',
                    equalTo: data.restaurant
                  }
                }).subscribe( data => {
                  this.countAbsence = data.length;
                });
              });
            });
      }

  }

}
