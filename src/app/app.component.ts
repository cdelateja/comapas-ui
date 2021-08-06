import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponent} from 'cdelateja';
import {UtilProperties} from "./common/components/util.properties";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  constructor(protected translate: TranslateService) {
    super();
    this.translate.setDefaultLang('es');
  }

  public ngOnInit(): void {
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_USER, 'P_M_USER');
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_FIELD, 'P_M_FIELD');
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_CRITERION, 'P_M_CRITERION');
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_CATEGORY, 'P_M_CATEGORY');
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_COMPANY, 'P_M_COMPANY');
    this.setDrawerProperty(UtilProperties.PREFIX_MODEL_ADDRESS, 'P_M_ADDRESS');
    this.setDrawerProperty(UtilProperties.PREFIX_LABELS, 'P_C_LABELS');
  }

}
