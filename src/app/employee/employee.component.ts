import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private rol : FirebaseListObservable<any[]>;
  private au : any;
  private user: any;

  private employees: any;
  private key:any;

  constructor(private af : AngularFireDatabase, private auth: AngularFireAuth) {
    this.au = firebase.auth();
    this.au.onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
         console.log(this.user);
      }
    });
  }

  ngOnInit() {

      this.employee = this.af.list('/employees');
      this.restaurant = this.af.list('/restaurant');
      this.rol = this.af.list('/rol');
      this.employees= {};



      /*this.au.onAuthStateChanged(user => {
        if (user) {
          this.user = user.email;
          if (this.user == "hjr@iqthink.com") {
            this.user=1;
          }else{
            this.user=2;
          }
        }
      });

      this.employee = this.af.list('/employee', {
        query: {
          orderByChild: 'restaurant',
          equalTo: 'restaurant'
        }
      });*/
  		console.log(this.restaurant);
      console.log(this.employee);
  }

  employeeInfo(value : any)
  {
          console.log(value.social_security_number);
          let enc = window.btoa(value.social_security_number);
          console.log(enc);


      		let promise = new Promise( (resolve, reject) =>{
      			this.employee.push({

                    birth_day:value.birth_day,
                    firts_name:value.firts_name,
                    gender:value.gender,
                    last_name:value.last_name,
                    medical_coverage:value.medical_coverage,
                    number_allowances:value.number_allowances,
                    pay_frecuency:value.pay_frecuency,
                    phone:value.phone,
                    race:value.race,
                    restaurant:value.restaurant,
                    social_security_number:enc,
                    source_hire:value.source_hire,
                    ssn:value.ssn,
                    rol:value.rol,
                    status:value.status,
                    withheld:value.withheld

      			});
      		} ).catch( error => {
              console.log('Error promesa postRestaurant', error);
      		});

  }

  editEmployee(value : any)
  {
        this.key = value;
        let promises = this.employee.subscribe(data => {

            data.forEach(data => {
               if ( data.$key == value)
               {


                    this.employees = {
                      birth_day : data.birth_day,
                      firts_name : data.firts_name,
                      gender : data.gender,
                      last_name: data.last_name,
                      medical_coverage: data.medical_coverage,
                      number_allowances: data.number_allowances,
                      pay_frecuency : data.pay_frecuency,
                      phone:data.phone,
                      race:data.race,
                      restauran:data.restaurant,
                      rol:data.rol,
                      social_security_number:data.social_security_number,
                      source_hire:data.source_hire,
                      ssn: data.ssn,
                      status:data.status,
                      withheld:data.withheld
                    }
               }
            });

        });

        console.log(this.employees.firts_name);
  }


  updateEmployee(data : any){

       this.employee.update(this.key, data);

  }

}
