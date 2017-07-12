import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RestaurantComponent } from '../restaurant/restaurant/restaurant.component';
import { UserComponent } from '../users/user/user.component';
import { EmployeeComponent } from '../employee/employee.component';
import { AbsencesComponent } from '../absences/absences.component';
import { RolComponent } from '../rol/rol.component';
import { ProfileComponent } from '../profile/profile/profile.component';
import { HomeComponent } from '../home/home.component';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee/manage-employee.component';
import { RecurtingEmployeeComponent } from '../manage-employee/recurting-employee/recurting-employee.component';
import { VacationComponent } from '../manage-employee/vacation/vacation.component';

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
        {path: 'vacationEmployee', component: VacationComponent  },
      ]},
      {path: 'rol', component: RolComponent }
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

