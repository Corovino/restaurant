import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-termination-employee',
  templateUrl: './termination-employee.component.html',
  styleUrls: ['./termination-employee.component.css'],
  providers : [DatauserService]
})
export class TerminationEmployeeComponent implements OnInit {

  private terminationWork : FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private nameRestaurant : any;
  private dateNow : any;
  private userKey : any;

  constructor(private af : AngularFireDatabase, private userRestaurant : DatauserService,) { }

  ngOnInit() {

    this.dateNow = moment().format('lLT');
    this.nameRestaurant = '';
    this.userKey = '';
    this.terminationWork = this.af.list('/terminationWork');

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {

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

  exportTerminationCsv()
  {

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {


      data.map(data => {
        this.nameRestaurant = data.restaurant;
        console.log(data.restaurant);
        this.terminationWork = this.af.list('/terminationWork', {
          query: {
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }

        });

        this.terminationWork.subscribe( data => {
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

          new Angular2Csv( excelReportFinal, 'Report Termination work Employee',options);
        });

      });

    });

  }

}
