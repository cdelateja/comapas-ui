import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicField} from "../dto/class.definition";
import {FormGroup} from "@angular/forms";
import {
  DynamicCheckBoxComponent,
  DynamicComboBoxComponent,
  DynamicDatePickerComponent,
  DynamicNumberFieldComponent,
  DynamicRadioButtonComponent,
  DynamicTextFieldComponent
} from "../common/components/wrapper";

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input()
  public field: DynamicField;
  @Input()
  public group: FormGroup;

  private componentRef: any;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnInit() {
    try {
      const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    } catch (error) {
      console.log(error);
    }
  }

  public getDynamicComponent() {
    return this.componentRef.instance;
  }

}


const componentMapper = {
  input: DynamicTextFieldComponent,
  date: DynamicDatePickerComponent,
  checkbox: DynamicCheckBoxComponent,
  number: DynamicNumberFieldComponent,
  select: DynamicComboBoxComponent,
  radio: DynamicRadioButtonComponent
};
