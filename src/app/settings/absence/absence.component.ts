import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  private  key : any;
  private  absence: FirebaseListObservable<any[]>;
  private  restaurant : any;
  private  absenceData : any;
  private  test: FirebaseListObservable<any[]>;
  constructor(private af : AngularFireDatabase, private du : DatauserService) { }

  //TODO mejorar problema con Observable Iterator
  ngOnInit() {


    this.restaurant = {};
    this.absenceData = {};
    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {
        this.restaurant = {
          restaurant : data.restaurant
        }
        this.test = this.af.list('/absence', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });
  }


  createAbsence( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({

            absence_name:value.absence_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );

  }



  editAbsence(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.absenceData = {

            description:data.description,
            absence_name: data.absence_name
          }
        }

      } );
    });
    console.log(this.absenceData);
  }

  updateAbsence(data: any)
  {

    this.test.update(this.key, data);
  }

}
