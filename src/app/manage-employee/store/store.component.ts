import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { StoreService } from '../../providers/store.service';
import {Data} from "@angular/router";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers:[ StoreService, DatauserService ]
})
export class StoreComponent implements OnInit {

  private  formStore : FormGroup;
  private  store : any;

  constructor( private storeForm :FormBuilder,
               private storeService : StoreService,
               private af : AngularFireDatabase,
               private userRestaurant : DatauserService ) { }

  ngOnInit() {

     this.userRestaurant.getRestauranUser()
      .subscribe( data => {
          this.store = this.af.list('/store',{
            query:{
              orderByChild: 'restaurant',
              equalTo: data.restaurant
            }
          });
      });

      this.validateForm();
  }

  onSubmit()
  {
      this.store = this.saveStore();
      console.log(this.store);
      this.storeService.postStore(this.store)
        .subscribe( data => {
            console.log(data);
         });
      this.formStore.reset();
  }

  saveStore()
  {
    const saveStore = {
      name : this.formStore.get('name').value,
      address: this.formStore.get('address').value,
      email :this.formStore.get('email').value,
      phone :this.formStore.get('phone').value,
      admin_name :this.formStore.get('admin_name').value,
      city:this.formStore.get('city').value
    }
    console.log(saveStore);
    return saveStore;
  }

  validateForm()
  {
    this.formStore = this.storeForm.group({
       name : ['',[ Validators.required, Validators.minLength(5)]],
       address: ['', [Validators.required, Validators.minLength(5)]],
       email :['', [Validators.required ]],
       phone :['',[Validators.required]],
       admin_name :['',[Validators.required]],
       city:['',[Validators.required]]
    });

  }



}
