import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from 'cdelateja';
import {DynamicField} from '../../dto/class.definition';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-campo-dinamico',
  template: `
    <span>
        Not a real component, this class is meant to be used as the definition for dynamic fields
    </span>
  `
})
export class DynamicFieldComponent implements OnInit, AfterViewInit {

  @ViewChild(AbstractComponent, {static: false})
  public abstractField: AbstractComponent;

  public field: DynamicField;
  public group: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
