import { Component, OnInit, Input} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-absence-employee',
  templateUrl: './absence-employee.component.html',
  styleUrls: ['./absence-employee.component.css']
})
export class AbsenceEmployeeComponent implements OnInit {

  @Input()  firts_name : string;
  @Input()  last_name : string;
  @Input()  id_employee : string;

  private absence : FirebaseListObservable<any[]>;
  private absences : FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private nameRestaurant : any;
  private dateNow : any;

  constructor(private af : AngularFireDatabase, private dataUser : DatauserService) { }

  ngOnInit() {

    this.dateNow = moment().format('lLT');
    this.nameRestaurant = '';
    this.absences = this.af.list('/absences');

    let test = this.dataUser.getRestauranUser().subscribe( data => {

       data.map( data => {

            this.nameRestaurant = data.restaurant;
            this.absence = this.af.list('absence',{
              query : {
                orderByChild : 'restaurant',
                equalTo : data.restaurant
              }
            });
       });

    });

  }



  createAbsences( data : any)
  {
     console.log(data);
     console.log(this.nameRestaurant);


      let test = this.absences.push({

        employee: data.name_employee,
        id_employee :data.id_employee,
        restaurant : this.nameRestaurant,
        category: data.category,
        start_date: data.start_date,
        end_date: data.end_date,
        approved : data.approved,
        remarks : data.remarks,
        created_at : this.dateNow,
        update_at : this.dateNow

      }).then( data => {
          console.log(data);
      });


  }

}
