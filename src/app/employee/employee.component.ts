import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../providers/datauser.service';
import { EmployeeSearchPipe } from '../pipes/employee-search.pipe';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [ DatauserService ]
})
export class EmployeeComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private users :  FirebaseListObservable<any[]>;
  private rol : FirebaseListObservable<any[]>;
  private au : any;



  private employees: any;
  private key:any;

  constructor(private af : AngularFireDatabase, private auth: AngularFireAuth, private userRestaurant : DatauserService  ) {


  }

  ngOnInit() {

    this.restaurant = this.af.list('/restaurant');
    this.rol = this.af.list('/rol');
    this.employees= {};

      let test = this.userRestaurant.getRestauranUser().subscribe( data => {



           data.map( data => {
                 console.log(data.restaurant);
                 this.employee = this.af.list('/employees',{
                   query:{
                     orderByChild: 'restaurant',
                     equalTo: data.restaurant
                   }
                 });

                 this.restaurant = this.af.list('/restaurant',{
                   query:{
                     orderByChild: 'store',
                     equalTo: data.restaurant
                   }
                  });
            });

      });





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


  }


  updateEmployee(data : any){
       console.log(data);
       this.employee.update(this.key, data);

  }



}
