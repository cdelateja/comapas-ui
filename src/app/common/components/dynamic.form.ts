import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractValidator, createDynamicFormValidator, FieldConfig} from 'cdelateja';
import {TranslateService} from "@ngx-translate/core";
import {DynamicFieldDirective} from "../../directives/dynamic-field.directive";
import {DynamicField} from "../../dto/class.definition";

@Component({
  selector: 'app-dynamic-form',
  template: `
    <span>
        Not a real component, this class is meant to be used as the definition for type fields
    </span>
  `
})
export class DynamicForm extends AbstractValidator implements OnInit, AfterViewInit {

  @ViewChildren(DynamicFieldDirective)
  protected camposDinamicos: QueryList<DynamicFieldDirective>;

  public fields: DynamicField[] = [];

  /**
   * Inicialize observables of fields
   */
  constructor(protected translate: TranslateService) {
    super(translate);
  }


  ngOnInit() {
    this.transformToFieldConfig();
  }

  ngAfterViewInit() {
    this.init();
  }

  /**
   *
   */
  transformToFieldConfig() {
    const fieldsConfig: FieldConfig[] = [];
    if (this.fields) {
      this.fields.forEach(c => {
        fieldsConfig.push(c);
      });
      this.initDynamicFormBinder(fieldsConfig);
    }
  }


  /**
   *
   * @param fieldsConfig
   * @protected
   */
  protected initDynamicFormBinder(fieldsConfig: FieldConfig[]) {
    this.formId = this.getUuId();
    createDynamicFormValidator(fieldsConfig, this as AbstractValidator);
  }

  /**
   *
   * @protected
   */
  protected fieldComponentsAsMap() {
    this.camposDinamicos.forEach(f => {
      const dynamicComponent: any = f.getDynamicComponent();
      if (!this.fieldsMap.has(dynamicComponent.abstractField.formControlName)) {
        this.fieldsMap.set(dynamicComponent.abstractField.formControlName, dynamicComponent.abstractField);
      }
    });
  }
}
