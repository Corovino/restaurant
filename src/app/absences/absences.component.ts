import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../providers/datauser.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
  providers : [ DatauserService ]
})
export class AbsencesComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private absence :FirebaseListObservable<any[]>;

  constructor(private af : AngularFireDatabase, private userRestaurant : DatauserService  ) { }

  ngOnInit() {
    //this.employee = this.af.list('/employees');
    this.absence=this.af.list('/absences');

    let test = this.userRestaurant.getRestauranUser().subscribe( data => {

      return data.map( data => {
        console.log(data.restaurant);
        this.employee = this.af.list('/employees',{
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });

      });
    });


  }

  createAbsences(value: any)
  {
      console.log(value);
      let promise = new Promise( () => {

        this.absence.push({
           employee: value.employee,
           category: value.category,
           start_date: value.start_date,
           end_date: value.end_date,
           approved : value.approved,
           remarks : value.remarks

        });

      } ).catch( err => {
         console.log(err);
      })

  }


}
