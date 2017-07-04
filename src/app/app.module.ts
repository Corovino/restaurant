import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ApproutingModule } from './approuting/approuting.module';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './config/config';
//import { PopupModule } from 'ng2-opd-popup';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './partials/nav/nav.component';
import { AsideComponent } from './partials/aside/aside.component';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';
import { FooterComponent } from './partials/footer/footer.component';
import { UserComponent } from './users/user/user.component';
import { ModalsComponent } from './modals/modals.component';
import { EmployeeComponent } from './employee/employee.component';
import { AbsencesComponent } from './absences/absences.component';
import { RolComponent } from './rol/rol.component';
import { LoopObjectPipe } from './loop-object.pipe';
import { AuthGuard } from './auth.guard';
import { AuthService } from './providers/auth.service';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent,
    AsideComponent,
    RestaurantComponent,
    FooterComponent,
    UserComponent,
    ModalsComponent,
    EmployeeComponent,
    AbsencesComponent,
    RolComponent,
    LoopObjectPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApproutingModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule
    //PopupModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
