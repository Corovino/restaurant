import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  private rol: FirebaseListObservable<any[]>;
  private  key: any;
  private  rolData:any;
  private  restaurant : any;
  constructor(private af : AngularFireDatabase, private du : DatauserService ) { }


  ngOnInit() {

  	  this.rolData= {};
      this.restaurant = {};
      this.du.getRestauranUser().subscribe( data => {

              data.map( data => {

                    this.restaurant={
                        restaurant: data.restaurant
                    }
                    this.rol = this.af.list('/rol', {
                       query:{
                          orderByChild: 'restaurant',
                          equalTo: data.restaurant
                       }
                    });
              });
       });

  }

  rolInfo(value : any)
  {
       console.log(value);
        this.du.getRestauranUser().subscribe( data => {

                  return  data.map( data => {
                       console.log(data.restaurant);
                        this.rol.push({
                                rol_name:value.rol_name,
                                description:value.description,
                                restaurant : data.restaurant
                        });
                  });

              }
        );
  }

  editRol(value : any)
  {
      this.key = value;

     this.rol.subscribe( data => {

          data.forEach( data => {

            if (data.$key == this.key)
            {
                  this.rolData = {
                     description:data.description,
                     rol_name: data.rol_name
                  }
            }

          } );
      });
      console.log(this.rolData);
  }

  updateRol(data: any)
  {

       this.rol.update(this.key, data);
  }


}
