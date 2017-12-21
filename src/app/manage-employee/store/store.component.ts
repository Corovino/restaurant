import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { StoreService } from '../../providers/store.service';
import { LogsUserService } from '../../providers/logs-user.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers:[ StoreService, DatauserService, LogsUserService ]
})
export class StoreComponent implements OnInit {

  private  formStore : FormGroup;
  private  store : any;
  private  storeObject : any;
  private  key :string;
  private  dataLogUser : any;
  private  nameRestaurant :string;

  @ViewChild('btnClose') btnClose : ElementRef;

  constructor( private storeForm :FormBuilder,
               private storeService : StoreService,
               private af : AngularFireDatabase,
               private userRestaurant : DatauserService,
               private  logUser : LogsUserService) { }

  ngOnInit() {

     this.storeObject = {};
     this.userRestaurant.getRestauranUser()
      .subscribe( data => {
          data.map( data =>{
              this.nameRestaurant = data.restaurant;
              this.store = this.af.list('/store',{
                query:{
                  orderByChild: 'restaurant',
                  equalTo: data.restaurant
                }
              });
          });
      });

      this.validateForm();
  }

  onSubmit()
  {
      this.store = this.saveStore();
      console.log(this.store);
      console.log(this.nameRestaurant);
      console.log(this.key);
      this.storeService.postStore(this.store);
      this.logUserAction(this.key, this.nameRestaurant , 'Create', 'Store');

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
     saveStore['restaurant'] = this.nameRestaurant;
     console.log(saveStore);
    return saveStore;
  }


  editStore( idStore : any)
  {
       this.key = idStore;
       this.store.subscribe( data => {
           data.forEach( data => {
              if(data.$key === idStore)
              {
                  this.storeObject = {

                      name : data.name,
                      address: data.address,
                      email :data.email,
                      phone :data.phone,
                      admin_name :data.admin_name,
                      city:data.city,
                      status:data.status,
                      restaurant:this.nameRestaurant
                  }
              }
           });
       });
  }


  onUpdateStore( store : any)
  {
      console.log(store);
      this.storeService.updateStore(store, this.key);
      this.logUserAction(this.key, this.nameRestaurant , 'Update', 'Store')
       setTimeout( () => {
         this.btnClose.nativeElement.click();
       },3000);

  }

  validateForm()
  {
    this.formStore = this.storeForm.group({
       name : ['',[ Validators.required, Validators.minLength(5)]],
       address: ['', [Validators.required, Validators.minLength(5)]],
       email :['', [Validators.required ]],
       phone :['',[Validators.required]],
       admin_name :['',[Validators.required]],
       status : ['',[Validators.required]],
       city:['',[Validators.required]]
    });

  }

  logUserAction(userKey : any, restaurant : any, action_user: any , from_action:any){

    this.dataLogUser = {

      id_currentUser :userKey,
      mane_user : restaurant,
      action_user : action_user,
      from_action :from_action,
    };
    this.logUser.createLogUser(this.dataLogUser);
  }



}
