import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DatauserService } from '../../providers/datauser.service';
import { PagerService } from '../../pager-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-logs-user',
  templateUrl: './logs-user.component.html',
  styleUrls: ['./logs-user.component.css'],
  providers : [ DatauserService, PagerService ]
})
export class LogsUserComponent implements OnInit {

  private logsUser : FirebaseListObservable<any[]>;
  private allItems: any[];
  private pager: any = {};
  private pagedItems: any[];
  private pagNum : number;


  constructor(
    private af : AngularFireDatabase,
    private userRestaurant : DatauserService,
    private pagerService : PagerService

  ) {

    let firstKey = new BehaviorSubject('');
    let nextKey = new BehaviorSubject('');
    let pageSize = new BehaviorSubject(10);
  }

  ngOnInit() {

     this.pagNum = 1;

      let logs = this.userRestaurant.getRestauranUser().subscribe( data => {

           data.map( data => {
             console.log(data.$key);
             this.logsUser = this.af.list('/logsUser', {
               query:{
                 orderByChild:'name_user',
                 equalTo : data.restaurant

               }
             });

             this.logsUser.subscribe( data => {
                  this.allItems = data;
                  console.log(this.allItems);
                  this.setPage(1);
             })
           })
      });

  }


  setPage(page: number) {
    console.log(page);
    this.pagNum = page;
    console.log(this.pagNum);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
