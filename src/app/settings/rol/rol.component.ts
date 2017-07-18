import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers : [DatauserService, LogsUserService ]
})
export class RolComponent implements OnInit {

  private rol: FirebaseListObservable<any[]>;
  private  key: any;
  private  rolData:any;
  private  restaurant : any;
  private  dateNow;
  private  dataLogUser : any;

  constructor(private af : AngularFireDatabase, private du : DatauserService, private logsUser : LogsUserService ) { }


  ngOnInit() {

  	  this.rolData= {};
      this.restaurant = {};
      this.dateNow = moment().format('lLT');

      this.du.getRestauranUser().subscribe( data => {

              data.map( data => {

                    this.restaurant={
                        restaurant: data.restaurant,
                        key:data.$key
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

      this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Create', 'Rol');
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
       this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Update', 'Rol');
  }

  deleteRol(data)
  {
      this.rol.remove(data);
      this.logUserAction(this.restaurant.key, this.restaurant.restaurant, 'Delete', 'Rol');
  }


  logUserAction(userKey : any, restaurant : any, action_user: any , from_action:any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user : action_user,
      from_action :from_action,
    };
    this.logsUser.createLogUser(this.dataLogUser);
  }
}
