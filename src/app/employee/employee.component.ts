import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private employee: FirebaseListObservable<any[]>;	

  constructor(private af : AngularFireDatabase) { }

  ngOnInit() {
  		this.employee = this.af.list('/employees');
  	    console.log(this.employee);
  }

  employeeInfo(value : any)
  {
  	        console.log(value);
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
                    social_security_number:value.social_security_number,
                    source_hire:value.source_hire,
                    ssn:value.ssn,
                    status:value.status,
                    withheld:value.withheld

      			});	
      		} ).catch( error => {
              console.log('Error promesa postRestaurant', error);
      		});

  }
} 	  
