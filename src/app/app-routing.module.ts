import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeLoginComponent} from "./structure/home-login/home-login.component";
import {HomeComponent} from "./route/home/home.component";
import {BaseComponent} from "./structure/base/base.component";
import {UserComponent} from "./route/admin/user/user.component";
import {AdminComponent} from "./route/admin/admin.component";
import {FieldComponent} from "./route/admin/field/field.component";
import {CriterionComponent} from "./route/admin/criterion/criterion.component";
import {SandBoxComponent} from "./route/admin/sand-box/sand-box.component";
import {InstituteComponent} from "./route/home/institute/institute.component";
import {InstituteTestComponent} from "./route/home-institute/institute-test/institute-test.component";
import {HomeInstituteComponent} from "./route/home-institute/home-institute.component";

const routes: Routes = [
  {path: 'login', component: HomeLoginComponent,},
  {
    path: 'comapas',
    component: BaseComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: [{
          path: 'user', component: UserComponent
        }, {
          path: 'field', component: FieldComponent
        }, {
          path: 'criterion', component: CriterionComponent
        }, {
          path: 'sandBox', component: SandBoxComponent
        },
          {path: '**', pathMatch: 'full', redirectTo: '/comapas/home'},
        ]
      },
      {
        path: 'home',
        component: HomeComponent,
        children: [{
          path: 'institute', component: InstituteComponent
        }]
      },
      {
        path: 'institute',
        component: HomeInstituteComponent,
        children: [{
          path: 'test/:id', component: InstituteTestComponent
        }]
      },
      {path: '**', pathMatch: 'full', redirectTo: '/comapas/home'},
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
