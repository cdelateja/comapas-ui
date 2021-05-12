import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CTModule} from "cdelateja";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {LoadingComponent} from './structure/loading/loading.component';
import {LoaderInterceptorService} from "./services/loader-interceptor.service";
import {HomeLoginComponent} from './structure/home-login/home-login.component';
import {HomeComponent} from './route/home/home.component';
import {BaseComponent} from './structure/base/base.component';
import {AdminComponent} from './route/admin/admin.component';
import {UserComponent} from './route/admin/user/user.component';
import {UserModalComponent} from './route/admin/user/user-modal/user-modal.component';
import {AuthorizedDirective} from './directives/authorized.directive';
import { FieldComponent } from './route/admin/field/field.component';
import { FieldModalComponent } from './route/admin/field/field-modal/field-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeLoginComponent,
    HomeComponent,
    BaseComponent,
    AdminComponent,
    UserComponent,
    UserModalComponent,
    AuthorizedDirective,
    FieldComponent,
    FieldModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    CTModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/core/', suffix: '.json'},
    {prefix: './assets/i18n/cdelateja/', suffix: '.json'}
  ]);
}
