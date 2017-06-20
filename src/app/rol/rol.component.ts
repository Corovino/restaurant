import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  private rol: FirebaseListObservable<any[]>;		

  constructor(private af : AngularFireDatabase) { }

  ngOnInit() {

  	  this.rol = this.af.list('/rol');
  	  console.log(this.rol);

  }

  rolInfo(value : any)
  {
        console.log(value);
  		let promise = new Promise( (resolve, reject) =>{
  			this.rol.push({

                rol_name:value.rol_name,
                description:value.description

  			});	
  		} ).catch( error => {
          console.log('Error promesa postRol', error);
  		});
  }

  /*recoverPass(mailAddres){
  	let recover = firebase.auth();
  	recover.senPasswordResetEmail(mailAddres).then( response => {
        console.log('Se envio un correo a su cuenta.',response);
  	}).catch( error => {
  		console.log('error', error);
  	});
  }*/


}
