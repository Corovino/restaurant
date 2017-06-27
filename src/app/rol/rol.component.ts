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
  private  key: any;
  private  rolData:any;

  constructor(private af : AngularFireDatabase) { }

  ngOnInit() {

  	  this.rol = this.af.list('/rol');
  	  this.rolData= {};
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
