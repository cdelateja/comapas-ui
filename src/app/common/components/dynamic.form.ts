import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractValidator} from 'cdelateja';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dynamic-form',
  template: `
    <span>
        Not a real component, this class is meant to be used as the definition for type fields
    </span>
  `
})
export class TypeForm extends AbstractValidator implements OnInit, AfterViewInit {


  constructor(protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
