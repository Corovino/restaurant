import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RestaurantComponent } from '../restaurant/restaurant/restaurant.component';
import { UserComponent } from '../users/user/user.component';
import { EmployeeComponent } from '../manage-employee/employee/employee.component';
import { AbsencesComponent } from '../absences/absences.component';
import { RolComponent } from '../settings/rol/rol.component';
import { ProfileComponent } from '../profile/profile/profile.component';
import { HomeComponent } from '../home/home.component';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee/manage-employee.component';
import { RecurtingEmployeeComponent } from '../manage-employee/recurting-employee/recurting-employee.component';
import { VacationComponent } from '../manage-employee/vacation/vacation.component';
import { PaymentComponent } from '../settings/payment/payment.component';
import { RaceComponent } from '../settings/race/race.component';
import { JobPositionComponent } from '../settings/job-position/job-position.component';
import { AbsenceComponent } from '../settings/absence/absence.component';
import { SourceHireComponent } from '../settings/source-hire/source-hire.component';
import { LogsUserComponent } from '../manage-employee/logs-user/logs-user.component';
import { TerminationWorkEmployeeComponent } from '../manage-employee/termination-work-employee/termination-work-employee.component';
import { TerminationEmployeeComponent } from '../manage-employee/termination-employee/termination-employee.component';

const routes : Routes =
[
   {path: '', redirectTo: '/login', pathMatch: 'full' },
   {path: 'login', component: LoginComponent },
   {path: 'register', component: RegisterComponent  },
   {path: 'dashboard', component: DashboardComponent,  children:[
      {path:'**', redirectTo:'dashboard', pathMatch:'full'},
      {path: 'home', component: HomeComponent },
      {path: 'addrestaurant', component: RestaurantComponent  },
      {path: 'profile', component: ProfileComponent  },
      {path: 'adduser', component: UserComponent  },
      {path: 'addemployee', component: EmployeeComponent  },
      {path: 'manageEmployee', component: ManageEmployeeComponent, children:[
        //{path: '', redirectTo: '/manageEmployee'  },
        {path: 'absences', component: AbsencesComponent  },
        {path: 'recruitingEmployee', component: RecurtingEmployeeComponent  },
        {path: 'tesrminationWork', component: TerminationEmployeeComponent  },
        {path: 'logsUser', component: LogsUserComponent  },
      ]},
     {path: 'settings', children:[
        {path: 'rol', component: RolComponent },
        {path: 'payment', component: PaymentComponent },
        {path: 'race', component: RaceComponent },
        {path: 'jobPosition', component: JobPositionComponent },
        {path: 'absence', component: AbsenceComponent },
        {path: 'sourceHire', component: SourceHireComponent }
     ]},
   ] },


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
   exports: [
    RouterModule
  ],
  declarations: []
})
export class ApproutingModule { }

