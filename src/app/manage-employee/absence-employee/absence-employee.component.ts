import { Component, OnInit, Input} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { LogsUserService } from '../../providers/logs-user.service';
import { ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment/moment';



@Component({
  selector: 'app-absence-employee',
  templateUrl: './absence-employee.component.html',
  styleUrls: ['./absence-employee.component.css'],
  providers : [ LogsUserService, DatauserService ]
})
export class AbsenceEmployeeComponent implements OnInit {

  @Input()  firts_name : string;
  @Input()  last_name : string;
  @Input()  id_employee : string;
  @ViewChild('btnCloseAbsence') closeBtn: ElementRef;

  private absence : FirebaseListObservable<any[]>;
  private absences : FirebaseListObservable<any[]>;
  private restaurant : FirebaseListObservable<any[]>;
  private nameRestaurant : any;
  private dateNow : any;
  private dataLogUser : any;
  private userKey : any;

  constructor(private af : AngularFireDatabase, private dataUser : DatauserService,  private  logUser : LogsUserService ) { }

  ngOnInit() {

    this.dateNow = moment().format('lLT');
    this.nameRestaurant = '';
    this.userKey = '';
    this.absences = this.af.list('/absences');

    let test = this.dataUser.getRestauranUser().subscribe( data => {

       data.map( data => {

            this.nameRestaurant = data.restaurant;
            this.userKey =data.$key;
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

      });


          this.dataLogUser = {

            id_currentUser :this.userKey,
            mane_user : this.nameRestaurant,
            action_user :"create Absence",
            from_action :"Absence",
          };
          if(test){
            this.logUser.createLogUser(this.dataLogUser);
             alert('Secrea una Ausencia satisfactoriamente');
             setTimeout( () =>{
                this.closeModal();
             },3000)
          }



  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
