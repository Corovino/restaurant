import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../providers/datauser.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';



@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
  providers : [ DatauserService ]
})
export class AbsencesComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private employeeData: FirebaseListObservable<any[]>;
  private absence :FirebaseListObservable<any[]>;
  private absenc :any;
  private key : any;
  private nameRestaurant: any;

  constructor(private af : AngularFireDatabase, private userRestaurant : DatauserService  ) { }

  ngOnInit() {


    this.absenc = {};
    this.nameRestaurant = '';

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {

       data.map( data => {
        this.nameRestaurant = data.restaurant;
        console.log(this.nameRestaurant);

        this.employee = this.af.list('/employees',{
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });

        this.absence = this.af.list('/absences',{
          query :{
            orderByChild : 'restaurant',
            equalTo : data.restaurant
          }
        });

      });
    });

  }

  createAbsences(value: any)
  {


      let promise = new Promise( () => {

        this.absence.push({

           employee: value.employee,
           restaurant : this.nameRestaurant,
           category: value.category,
           start_date: value.start_date,
           end_date: value.end_date,
           approved : value.approved,
           remarks : value.remarks

        });

      } ).catch( err => {
         console.log(err);
      });

  }

  getEmployeeName( id_user : any){

    this.employeeData = this.af.list('/employees',{
      query:{
        orderByChild: 'firts_name',
        equalTo: id_user
      }
    });

    console.log( this.employeeData );
  }



  editaAbsences(key: any)
  {
     console.log(key);
     this.key = key;
     let promises = this.absence.subscribe( data => {

          data.forEach( data => {
            if( data.$key == key)
            {
                  this.absenc = {
                    employee: data.employee,
                    restaurant : data.nameRestaurant,
                    category: data.category,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    approved : data.approved,
                    remarks : data.remarks
                  }
            }

          } );

     } );

     console.log(this.absenc.employee);
  }


  updateAbsence( data :any)
  {
    console.log( data );
    this.absence.update(this.key, data);
  }


  importCsvAbsence(){

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {


      data.map(data => {
        this.nameRestaurant = data.restaurant;
        console.log(data.restaurant);
        this.absence = this.af.list('/absences', {
          query: {
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }

        });

        this.absence.subscribe( data => {
          let excelReportFinal = [];
          var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            useBom: true
          };

          data.map( data => {
            excelReportFinal.push(data);
          });

          new Angular2Csv( excelReportFinal, 'Report Absence Employee',options);
        });

      });

    });

  }


}
