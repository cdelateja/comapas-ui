import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLoginComponent} from "./route/home-login/home-login.component";

const routes: Routes = [
  {path: 'login', component: HomeLoginComponent,},
  {path: '**', pathMatch: 'full', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
