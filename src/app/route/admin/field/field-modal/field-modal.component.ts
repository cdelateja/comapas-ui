import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, NotNull, Response} from 'cdelateja';
import {TranslateService} from "@ngx-translate/core";
import {Field, FieldReq} from "../../../../dto/class.definition";
import {FieldService} from "../../../../services/field.service";

declare var $: any;

@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['label', 'score']),
    NotNull.generate(['type'])
  ],
  object: new FieldReq()
})
export class FieldModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.Field.Modal';

  @Input()
  public refresh: EventEmitter<Field> = new EventEmitter();

  @Input()
  public open: EventEmitter<Field> = new EventEmitter();

  public hide = true;
  public types: string[] = [];

  constructor(protected translate: TranslateService,
              private fieldService: FieldService) {
    super(translate);
  }

  public ngOnInit(): void {
    this.disableField('idField');
    this.subscriptions.push(
      this.open.subscribe((field: Field) => {
        this.setField(field)
        this.toggle();
      })
    );

    this.subscriptions.push(
      this.fieldService.getTypes().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.types = response.result;
        }
      })
    );
    this.subscriptions.push(
      this.getFieldObservable('type').subscribe((value) => {
        this.disableField('catalog');
        this.removeValidators(['catalog']);
        this.setValue('catalog', null);
        this.hide = true;
        if ('radio' === value || 'select' === value) {
          this.enabledField('catalog');
          this.addValidators([NotEmpty.generate(['catalog'])])
          this.hide = false;
        }
      })
    );
  }

  public setField(field: Field) {
    this.reset(field);
  }

  public close(): void {
    this.toggle();
  }

  private toggle(): void {
    $('#fieldModal').modal('toggle');
  }

  public save(): void {
    if (this.validateForm()) {
      const req: FieldReq = this.formGroup.getRawValue();
      req.catalog = (req.catalog === null || req.catalog === '' )? [] : req.catalog;
      this.subscriptions.push(
        this.fieldService.saveField(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.refresh.next(response.result);
            this.toggle();
          }
        })
      );
    }
  }

}
