import {Component, OnInit} from '@angular/core';
import {DynamicFieldComponent} from "./dynamic.field.component";


declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-label',
  template: `
    <span class="row" [formGroup]="group">
      <div class="col-12">
        <ct-label [label]="field.label"
                  [formControlName]="field.formControlName"></ct-label>
      </div>
    </span>
  `
})
export class DynamicLabelComponent extends DynamicFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-text-field',
  template: `
    <span class="row" [formGroup]="group">
       <div class="col-12">
         <ct-textfield [label]="field.label"
                       [formControlName]="field.formControlName"></ct-textfield>
       </div>
       <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
         <app-upload [field]="this.field"></app-upload>
       </div>
    </span>
  `
})
export class DynamicTextFieldComponent extends DynamicFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-date-picker',
  template: `
    <span class="row" [formGroup]="group">
       <div class="col-12">
         <ct-date-picker [label]="field.label"
                         [formControlName]="field.formControlName"></ct-date-picker>
       </div>
       <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
         <app-upload [field]="this.field"></app-upload>
       </div>
    </span>
  `
})
export class DynamicDatePickerComponent extends DynamicFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-check-box',
  template: `
    <span class="row" [formGroup]="group">
      <div class="col-12">
        <ct-check-box class="label-checkbox"
                      [label]="field.label"
                      [formControlName]="field.formControlName"></ct-check-box>
      </div>
      <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
        <app-upload [field]="this.field"></app-upload>
      </div>
    </span>
  `
})
export class DynamicCheckBoxComponent extends DynamicFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-number-field',
  template: `
    <span class="row" [formGroup]="group">
      <div class="col-12">
        <ct-number-field [label]="field.label"
                         [formControlName]="field.formControlName"></ct-number-field>
      </div>
      <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
        <app-upload [field]="this.field"></app-upload>
      </div>
    </span>
  `
})
export class DynamicNumberFieldComponent extends DynamicFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-combobox',
  template: `
    <span class="row" [formGroup]="group">
      <div class="col-12">
        <ct-combo-box [label]="field.label"
                      [values]="catalog"
                      [formControlName]="field.formControlName"></ct-combo-box>
      </div>
      <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
        <app-upload [field]="this.field"></app-upload>
      </div>
    </span>
  `
})
export class DynamicComboBoxComponent extends DynamicFieldComponent implements OnInit {

  public catalog: any[] = [];

  constructor() {
    super();
  }

  async ngOnInit() {
    this.catalog = [];
    if (this.field.catalog) {
      const list: string[] = this.field.catalog.replace('[', '')
        .replace(']', '').split(',');
      list.forEach((v: string) => this.catalog.push(v));
    }
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-radio-button',
  template: `
    <span class="row" [formGroup]="group">
      <div class="col-12">
        <ct-radio-button [label]="field.label"
                         [values]="catalog"
                         [formControlName]="field.formControlName"></ct-radio-button>
      </div>
      <div class="col-12 mb-4 mt-1 row-upload" *ngIf="field.evidence">
        <app-upload [field]="this.field"></app-upload>
      </div>
    </span>
  `
})
export class DynamicRadioButtonComponent extends DynamicFieldComponent implements OnInit {

  public catalog: any[] = [];

  constructor() {
    super();
  }

  async ngOnInit() {
    this.catalog = [];
    if (this.field.catalog) {
      const list: string[] = this.field.catalog.replace('[', '')
        .replace(']', '').split(',');
      list.forEach((v: string) => this.catalog.push(v));
    }
  }
}
