import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';

@Component({
  selector: 'app-recurting-employee',
  templateUrl: './recurting-employee.component.html',
  styleUrls: ['./recurting-employee.component.css']
})
export class RecurtingEmployeeComponent implements OnInit {

  private employee: FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private users :  FirebaseListObservable<any[]>;
  private rol : FirebaseListObservable<any[]>;
  private au : any;



  private employees: any;
  private key:any;

  constructor( private af : AngularFireDatabase,  private userRestaurant : DatauserService) { }

  ngOnInit() {

    //TODO ajustar re autenticación  para cambiar salario y terminar contrato.
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

}
