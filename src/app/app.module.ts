import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CTModule} from 'cdelateja';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {LoadingComponent} from './structure/loading/loading.component';
import {LoaderInterceptorService} from './services/loader-interceptor.service';
import {HomeLoginComponent} from './structure/home-login/home-login.component';
import {HomeComponent} from './route/home/home.component';
import {BaseComponent} from './structure/base/base.component';
import {AdminComponent} from './route/admin/admin.component';
import {UserComponent} from './route/admin/user/user.component';
import {UserModalComponent} from './route/admin/user/user-modal/user-modal.component';
import {AuthorizedDirective} from './directives/authorized.directive';
import {FieldComponent} from './route/admin/field/field.component';
import {FieldModalComponent} from './route/admin/field/field-modal/field-modal.component';
import {DynamicForm} from './common/components/dynamic.form';
import {CriterionComponent} from './route/admin/criterion/criterion.component';
import {CriterionModalComponent} from './route/admin/criterion/criterion-modal/criterion-modal.component';
import {CriterionFieldModalComponent} from './route/admin/criterion/criterion-field-modal/criterion-field-modal.component';
import {SandBoxComponent} from './route/admin/sand-box/sand-box.component';
import {SandBoxCriterionComponent} from './route/admin/sand-box/sand-box-criterion/sand-box-criterion.component';
import {SandBoxCriterionCardComponent} from './route/admin/sand-box/sand-box-criterion-card/sand-box-criterion-card.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import {DynamicFieldComponent} from "./common/components/dynamic.field.component";
import {
  DynamicCheckBoxComponent,
  DynamicComboBoxComponent,
  DynamicDatePickerComponent,
  DynamicLabelComponent,
  DynamicNumberFieldComponent,
  DynamicRadioButtonComponent,
  DynamicTextFieldComponent
} from "./common/components/wrapper";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./common/custom/custom.mat.paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {InstituteComponent} from './route/home/institute/institute.component';
import {MatTabsModule} from "@angular/material/tabs";
import {InstituteTableComponent} from './route/home/institute/institute-table/institute-table.component';
import {InstituteModalComponent} from './route/home/institute/institute-modal/institute-modal.component';
import {InstituteDetailComponent} from './route/home/institute/institute-detail/institute-detail.component';
import {InstituteTestComponent} from './route/home/institute/institute-test/institute-test.component';
import {InstituteCriterionCardComponent} from './route/home/institute/institute-test/institute-criterion-card/institute-criterion-card.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {UploadComponent} from './common/components/upload/upload.component';
import {ViewFileComponent} from './common/components/view-file/view-file.component';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {InstituteChartComponent} from './route/home/institute/institute-chart/institute-chart.component';
import {InstituteChartCardComponent} from './route/home/institute/institute-chart/institute-chart-card/institute-chart-card.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { SandBoxCategoryModalComponent } from './route/admin/sand-box/sand-box-category-modal/sand-box-category-modal.component';
import { SandBoxCategoryCardComponent } from './route/admin/sand-box/sand-box-category-card/sand-box-category-card.component';
import { InstituteCategoryCardComponent } from './route/home/institute/institute-test/institute-category-card/institute-category-card.component';
import { InstituteTestFooterComponent } from './route/home/institute/institute-test/institute-test-footer/institute-test-footer.component';
import { HomeInstituteComponent } from './route/home-institute/home-institute.component';

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
    DynamicForm,
    CriterionComponent,
    CriterionModalComponent,
    CriterionFieldModalComponent,
    SandBoxComponent,
    SandBoxCriterionComponent,
    SandBoxCriterionCardComponent,
    DynamicFieldDirective,
    DynamicFieldComponent,
    DynamicLabelComponent,
    DynamicTextFieldComponent,
    DynamicDatePickerComponent,
    DynamicCheckBoxComponent,
    DynamicNumberFieldComponent,
    DynamicComboBoxComponent,
    DynamicRadioButtonComponent,
    InstituteComponent,
    InstituteTableComponent,
    InstituteModalComponent,
    InstituteDetailComponent,
    InstituteTestComponent,
    InstituteCriterionCardComponent,
    UploadComponent,
    ViewFileComponent,
    SafeUrlPipe,
    InstituteChartComponent,
    InstituteChartCardComponent,
    SandBoxCategoryModalComponent,
    SandBoxCategoryCardComponent,
    InstituteCategoryCardComponent,
    InstituteTestFooterComponent,
    HomeInstituteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    CTModule,
    ReactiveFormsModule,
    PdfViewerModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSortModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxExtendedPdfViewerModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
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
