import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BookingBooksComponent } from './views/booking-books/booking-books.component';
import { BookingRoomsComponent } from './views/booking-rooms/booking-rooms.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'bookingBooks', component: BookingBooksComponent},
  {path:'bookingRooms', component: BookingRoomsComponent},
  {path: '**', pathMatch: 'full', component:  LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
