import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from 'cdelateja';
import {Criterion, CriterionReq, Field, FieldReq} from '../../../../dto/class.definition';
import {TranslateService} from "@ngx-translate/core";
import {CriterionService} from "../../../../services/criterion.service";

declare var $: any;

@Component({
  selector: 'app-criterion-modal',
  templateUrl: './criterion-modal.component.html',
  styleUrls: ['./criterion-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['name'])
  ],
  object: new CriterionReq()
})
export class CriterionModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.Criterion.Modal';

  @Input()
  public refresh: EventEmitter<Criterion> = new EventEmitter();

  @Input()
  public open: EventEmitter<Criterion> = new EventEmitter();

  constructor(protected translate: TranslateService,
              private criterionService: CriterionService) {
    super(translate);
  }

  ngOnInit(): void {
    this.disableField('idCriterion');
    this.subscriptions.push(
      this.open.subscribe((criterion: Criterion) => {
        this.setField(criterion)
        this.toggle();
      })
    );
  }

  public setField(criterion: Criterion) {
    this.reset(criterion);
  }

  public close(): void {
    this.toggle();
  }

  private toggle(): void {
    $('#CriterionModal').modal('toggle');
  }

  public save(): void {
    if (this.validateForm()) {
      const req: CriterionReq = this.getValue();
      this.criterionService.saveCriterion(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.refresh.next(response.result);
            this.toggle();
          }
        }
      );
    }
  }
}
