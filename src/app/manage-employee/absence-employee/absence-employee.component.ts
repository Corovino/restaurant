import { Component, OnInit, Input} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';



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
  private restaurant : FirebaseListObservable<any[]>;

  constructor(private af : AngularFireDatabase, private dataUser : DatauserService) { }

  ngOnInit() {

    let test = this.dataUser.getRestauranUser().subscribe( data => {

        this.absence = this.af.list('absence',{
          query : {
            orderByChild : 'restaurant',
            equalTo : data.restaurant
          }
        });

    });

  }



  createAbsences( data : any)
  {
     console.log(data);
  }

}
