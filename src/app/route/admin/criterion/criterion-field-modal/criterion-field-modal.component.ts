import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Criterion, CriterionField, CriterionFieldReq, Field, SelectField} from "../../../../dto/class.definition";
import {Subscription} from "rxjs";
import {ButtonType, ClientService, Response} from 'cdelateja';
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {CriterionService} from "../../../../services/criterion.service";

declare var $: any;

@Component({
  selector: 'app-criterion-field-modal',
  templateUrl: './criterion-field-modal.component.html',
  styleUrls: ['./criterion-field-modal.component.scss']
})
export class CriterionFieldModalComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Criterion.FieldModal';

  @Input()
  public refresh: EventEmitter<Field> = new EventEmitter();

  @Input()
  public open: EventEmitter<Field> = new EventEmitter();

  @Input()
  public fields: SelectField[] = [];

  @Input()
  public fieldsCache: SelectField[] = [];

  public faCheck = faCheck;
  public buttonType: ButtonType = new ButtonType();
  private subscriptions: Subscription[] = [];
  public criterion: Criterion = new Criterion();

  constructor(private criterionService: CriterionService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe((criterion: Criterion) => {
        this.criterion = criterion;
        this.addSelectedFields(criterion);
        this.toggle();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private addSelectedFields(criterion: Criterion) {
    criterion.fields.forEach((criterionField: CriterionField) => {
      const selectField: SelectField = this.toSelectField(criterionField.field);
      this.fields.push(selectField);
    });
  }

  private removeSelectedFields(criterion: Criterion) {
    criterion.fields.forEach((criterionField: CriterionField) => {
      this.fields.forEach((value: SelectField, index: number) => {
        if ((value.idField == criterionField.field.idField) && value.select) this.fields.splice(index, 1);
      });
    });
  }

  private toSelectField(field: Field): SelectField {
    const selectField: SelectField = new SelectField();
    selectField.select = true;
    selectField.idField = field.idField;
    selectField.label = field.label;
    selectField.name = field.name;
    selectField.score = field.score;
    return selectField;
  }


  public close(): void {
    $('#FieldModal').modal('hide');
    this.removeSelectedFields(this.criterion);
  }

  private toggle(): void {
    $('#FieldModal').modal({
      keyboard: false,
      backdrop: 'static'
    });
  }

  public searchByName(word: string): void {
    const records: SelectField[] = [];
    if ('' !== word) {
      this.fields.forEach(e => {
        if (e.label.toLowerCase().includes(word.toLowerCase())) {
          records.push(e);
        }
      });
      this.fields = records;
    } else {
      this.fields = this.fieldsCache;
    }
  }

  public save() {
    const req: CriterionFieldReq = new CriterionFieldReq();
    req.idCriterion = this.criterion.idCriterion;
    this.fields.forEach((select: SelectField) => {
      if (select.select) {
        req.fields.push(select.idField);
      }
    });
    this.subscriptions.push(
      this.criterionService.addFields(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.refresh.next(response.result);
          this.close();
        }
      })
    );
  }

}
