import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ApproutingModule } from './approuting/approuting.module';
import { DropdownModule } from "ngx-dropdown";
import { MomentModule } from 'angular2-moment';

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
import { EmployeeComponent } from './manage-employee/employee/employee.component';
import { AbsencesComponent } from './absences/absences.component';
import { RolComponent } from './settings/rol/rol.component';
import { LoopObjectPipe } from './loop-object.pipe';
import { AuthGuard } from './auth.guard';
import { AuthService } from './providers/auth.service';
import { FilterPipe } from './pipes/filter.pipe';
import { EmployeeSearchPipe } from './pipes/employee-search.pipe';
import { UserPipe } from './pipes/user.pipe';
import { AbsencesPipe } from './pipes/absences.pipe';
import { ProfileComponent } from './profile/profile/profile.component';
import { NgdropfileDirective } from './directives/ngdropfile.directive';
import { HomeComponent } from './home/home.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee/manage-employee.component';
import { RecurtingEmployeeComponent } from './manage-employee/recurting-employee/recurting-employee.component';
import { VacationComponent } from './manage-employee/vacation/vacation.component';
import { PaymentComponent } from './settings/payment/payment.component';
import { RaceComponent } from './settings/race/race.component';
import { JobPositionComponent } from './settings/job-position/job-position.component';
import { AbsenceComponent } from './settings/absence/absence.component';
import { SourceHireComponent } from './settings/source-hire/source-hire.component';
import { AbsenceEmployeeComponent } from './manage-employee/absence-employee/absence-employee.component';
import { TerminationWorkEmployeeComponent } from './manage-employee/termination-work-employee/termination-work-employee.component';
import { LogsUserComponent } from './manage-employee/logs-user/logs-user.component';





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
    EmployeeSearchPipe,
    UserPipe,
    AbsencesPipe,
    ProfileComponent,
    NgdropfileDirective,
    HomeComponent,
    ManageEmployeeComponent,
    RecurtingEmployeeComponent,
    VacationComponent,
    PaymentComponent,
    RaceComponent,
    JobPositionComponent,
    AbsenceComponent,
    SourceHireComponent,
    AbsenceEmployeeComponent,
    TerminationWorkEmployeeComponent,
    LogsUserComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApproutingModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    ReactiveFormsModule,
    DropdownModule,
    MomentModule
    //PopupModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
