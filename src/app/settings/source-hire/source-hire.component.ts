import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';


@Component({
  selector: 'app-source-hire',
  templateUrl: './source-hire.component.html',
  styleUrls: ['./source-hire.component.css']
})
export class SourceHireComponent implements OnInit {

  private  key : any;
  private  restaurant : any;
  private  sourceData : any;
  private  test : FirebaseListObservable<any[]>;

  constructor( private af : AngularFireDatabase, private du : DatauserService  ) { }

  ngOnInit() {

    this.restaurant = {};
    this.sourceData = {};
    this.test =  this.af.list('/sourceHire');
    this.du.getRestauranUser().subscribe( data => {

      data.map( data => {

        this.restaurant={
          restaurant: data.restaurant
        }
        this.test = this.af.list('/sourceHire', {
          query:{
            orderByChild: 'restaurant',
            equalTo: data.restaurant
          }
        });
      });
    });

  }



  createSource( value : any)
  {

    console.log(value);
    this.du.getRestauranUser().subscribe( data => {

        return  data.map( data => {
          console.log(data.restaurant);
          this.test.push({
            source_name:value.source_name,
            description:value.description,
            restaurant : data.restaurant
          });
        });

      }
    );

  }



  editSource(value : any)
  {
    this.key = value;
    this.test.subscribe( data => {

      data.forEach( data => {

        if (data.$key == this.key)
        {
          this.sourceData = {
            description:data.description,
            source_name: data.source_name
          }
        }

      });
    });
    console.log(this.sourceData);
  }

  updateSource(data: any)
  {

    this.test.update(this.key, data);
  }

}
