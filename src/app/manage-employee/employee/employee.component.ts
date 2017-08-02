import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { AuthService } from '../../providers/auth.service';
import { LogsUserService } from '../../providers/logs-user.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {ViewChild, ElementRef} from '@angular/core';
import * as moment from 'moment/moment';


import * as firebase from 'firebase/app';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [ DatauserService, LogsUserService ]
})
export class EmployeeComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private users :  FirebaseListObservable<any[]>;
  private rol : FirebaseListObservable<any[]>;
  private payFrecuency : FirebaseListObservable<any[]>;
  private race : FirebaseListObservable<any[]>;
  private sourceHire : FirebaseListObservable<any[]>;
  private jobPosition : FirebaseListObservable<any[]>;
  private absence : FirebaseListObservable<any[]>;
  private employeeUpdate : any;
  private dateNow : any;
  private dataLogUser : any;
  private nameRestaurant : any;
  private fromAction :string;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  private pass : any;




  private employees: any;
  private key:any;

  constructor(private af : AngularFireDatabase, private auth: AngularFireAuth, private userRestaurant : DatauserService, private  logUser : LogsUserService  ) {


  }

  ngOnInit() {

    this.restaurant = this.af.list('/restaurant');
    this.employees= {};
    this.nameRestaurant = '';
    this.dateNow = moment().format('lLT');


      let test = this.userRestaurant.getRestauranUser().subscribe( data => {

           data.map( data => {
                 this.nameRestaurant = data.restaurant;
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
                 this.payFrecuency = this.af.list('paymentFrecuency',{
                    query : {
                       orderByChild : 'restaurant',
                        equalTo : data.restaurant
                    }
                 });
                 this.race = this.af.list('race',{
                   query : {
                     orderByChild : 'restaurant',
                     equalTo : data.restaurant
                   }
                 });
                 this.rol = this.af.list('rol',{
                   query : {
                     orderByChild : 'restaurant',
                     equalTo : data.restaurant
                   }
                 });
                 this.sourceHire = this.af.list('sourceHire',{
                   query : {
                     orderByChild : 'restaurant',
                     equalTo : data.restaurant
                   }
                 });
                 this.jobPosition = this.af.list('jobPosition',{
                   query : {
                     orderByChild : 'restaurant',
                     equalTo : data.restaurant
                   }
                 });
                 this.absence = this.af.list('absence',{
                   query : {
                     orderByChild : 'restaurant',
                     equalTo : data.restaurant
                   }
                 });

            });

      });

  }

  employeeInfo(value : any)
  {
          console.log(value);
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
                    relationship_status:value.relationship_status,
                    employee_status:value.employee_status,
                    start_work: value.start_work,
                    end_work : value.finish_work,
                    salary:value.salary,
                    withheld:value.withheld,
                    city:value.city,
                    address: value.address,
                    job_position : value.job_position,
                    created_at : this.dateNow,
                    update_at : this.dateNow

      			});

            this.logUserAction(this.key, this.nameRestaurant , 'Create', 'Employee')
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

                      id_employee:data.$key,
                      birth_day : data.birth_day,
                      firts_name : data.firts_name,
                      gender : data.gender,
                      last_name: data.last_name,
                      medical_coverage: data.medical_coverage,
                      number_allowances: data.number_allowances,
                      pay_frecuency : data.pay_frecuency,
                      phone:data.phone,
                      race:data.race,
                      restaurant:data.restaurant,
                      rol:data.rol,
                      social_security_number:data.social_security_number,
                      source_hire:data.source_hire,
                      ssn: data.ssn,
                      relationship_status:data.relationship_status,
                      employee_status:data.employee_status,
                      withheld:data.withheld,
                      job_position: data.job_position,
                      salary : data.salary,
                      start_work: data.start_work,
                      end_work : data.end_work

                    }


               }
            });
        });
  }




  updateEmployee(data : any){


      this.employee.update(this.key, data);
      this.logUserAction(this.key, this.nameRestaurant , 'Update', 'Employee data')

  }

  updateAdminData( data : any)
  {



      this.employeeUpdate = {

           employee_status : data.employee_status,
           end_work : data.end_work,
           job_position : data.job_position,
           medical_coverage :data.medical_coverage,
           pay_frecuency : data.pay_frecuency,
           salary : data.salary,
           source_hire : data.source_hire,
           start_work : data.start_work,
           update_at : this.dateNow

      }

      this.employee.update(this.key, this.employeeUpdate);
      this.logUserAction(this.key, this.nameRestaurant , 'Update', 'Administrative data')


  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  logUserAction(userKey : any, restaurant : any, action_user: any , from_action:any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user : action_user,
      from_action :from_action,
    };
    this.logUser.createLogUser(this.dataLogUser);
  }

  importCsvEmployee(){

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {


      data.map(data => {
        this.nameRestaurant = data.restaurant;
        console.log(data.restaurant);
        this.employee = this.af.list('/employees', {
          query: {
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }

        });

        this.employee.subscribe( data => {
          let excelReportFinal = [];
          var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            useBom: true
          };

          let label = {
              birth_day : "birth_day",
              firts_name : "firts_name",
              gender : "gender",
              last_name: "last_name",
              medical_coverage: "medical_coverage",
              number_allowances: "number_allowances",
              pay_frecuency : "pay_frecuency",
              phone:"phone",
              race:"race",
              restaurant:"restaurant",
              rol:"rol",
              social_security_number:"social_security_number",
              source_hire:"source_hire",
              ssn: "ssn",
              relationship_status:"relationship_status",
              employee_status:"employee_status",
              withheld:"withheld",
              job_position: "job_position",
              salary : "salary",
              start_work: "start_work",
              end_work : "end_work"
          }
          data.map( data => {
            excelReportFinal.push(data);
          });

            new Angular2Csv( excelReportFinal, 'report Employee',options);
        });

      });

    });


  }

  openModal( fromAction : any ){

    console.log(fromAction);
    this.fromAction = fromAction;
    document.getElementById('btnReauthUser').click();
    let authUser = localStorage.getItem('reauthUser');

  }


}
