import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {

  private store : any;

  constructor(private af : AngularFireDatabase)
  {
     this.store = this.af.list('/store');
  }

  postStore( storeData : any)
  {
      return this.store.push(storeData)
        .map( resp => resp.json() );

  }

  getStore()
  {
      return this.af.list('/store');
  }

}
