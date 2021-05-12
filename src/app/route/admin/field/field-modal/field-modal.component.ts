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
    NotEmpty.generate(['label', 'name', 'score']),
    NotNull.generate(['type'])
  ],
  object: new FieldReq()
})
export class FieldModalComponent extends AbstractValidator implements OnInit {

  @Input()
  public refresh: () => void;

  @Input()
  public open: EventEmitter<Field> = new EventEmitter();

  public types: string[] = [];

  constructor(protected translate: TranslateService,
              private fieldService: FieldService) {
    super(translate);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe((field: Field) => {
        this.setField(field)
        this.toggle();
      }));

    this.subscriptions.push(
      this.fieldService.getTypes().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.types = response.result;
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

  }

}
