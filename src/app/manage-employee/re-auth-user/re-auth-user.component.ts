import { Component, OnInit, Input } from '@angular/core';
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
  @Input() fromAction : string;

  @ViewChild('closeBtn') closeBtn: ElementRef;



  constructor(private  dataUser : DatauserService ) { }

  ngOnInit() {

  }

  reAuthPass( reAuthPass : any  )
  {
        ;
        this.dataUser.getRestauranUser().subscribe( data => {
             data.map( data => {
               if(reAuthPass.reAuthPassword !== data.password ){
                  alert('Usted no puedo hacer el cambio');
               }else{

                 switch (reAuthPass.fromAction){
                   case '1':
                        this.modalShow('btnadministrativeDataEmployee', reAuthPass);
                    break;
                   case '2':
                        this.modalShow('btnabsenceEmployee', reAuthPass);
                     break;
                   case '3':
                         this.modalShow('btnterminationEmployee', reAuthPass);
                     break;
                   case '4':
                     this.modalShow('btnEditStore', reAuthPass);
                     break;

                 }
               }

             });
        });
  }

  private modalShow(idModal : string, reAuthPass : any)
  {
    alert('Auth ok. Puede ejecutar el cambio');
    document.getElementById(idModal).click();
    this.closeModal();

  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
