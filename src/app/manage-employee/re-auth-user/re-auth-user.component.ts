import { Component, OnInit } from '@angular/core';
import { DatauserService } from '../../providers/datauser.service';
import {ViewChild, ElementRef} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'app-re-auth-user',
  templateUrl: './re-auth-user.component.html',
  styleUrls: ['./re-auth-user.component.css'],
  providers: [ DatauserService ]
})
export class ReAuthUserComponent implements OnInit {

  private users :  FirebaseListObservable<any[]>;
  @ViewChild('closeBtn') closeBtn: ElementRef;



  constructor(private  dataUser : DatauserService ) { }

  ngOnInit() {

  }


  reAuthPass( reAuthPass : any  )
  {

        this.dataUser.getRestauranUser().subscribe( data => {
             data.map( data => {
               if(reAuthPass.reAuthPassword !== data.password ){
                  alert('Usted no puedo hacer el cambio');
               }else{
                 alert('Auth ok. Puede ejecutar el cambio');
                 //localStorage.setItem('reauthUser', 'true');
                 this.closeModal();
                 document.getElementById('btnadministrativeDataEmployee').click();

               }

             });
        });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
