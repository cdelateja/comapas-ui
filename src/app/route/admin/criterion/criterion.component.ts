import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Criterion, CriterionField, Field, SelectField} from "../../../dto/class.definition";
import {ClientService, Response} from "cdelateja";
import {CriterionService} from "../../../services/criterion.service";
import {Subscription} from "rxjs";
import {FieldService} from "../../../services/field.service";

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit, OnDestroy {

  public criterionList: Criterion[] = [];
  public criterionListCache: Criterion[] = [];
  private subscriptions: Subscription[] = [];
  public fields: SelectField[] = [];
  public fieldsCache: SelectField[] = [];
  public open: EventEmitter<Criterion> = new EventEmitter();
  public openCriField: EventEmitter<Criterion> = new EventEmitter();
  public refresh: EventEmitter<Criterion> = new EventEmitter();

  constructor(private criterionService: CriterionService,
              private fieldService: FieldService) {
  }

  ngOnInit(): void {
    this.findAll();
    this.refresh.subscribe((criterion: Criterion) => {
      this.pushCriterion(criterion);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findAll(): void {
    this.subscriptions.push(
      this.criterionService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.criterionList = response.result;
          this.criterionListCache = response.result;
          this.findFields();
        }
      })
    )
  }

  private findFields(): void {
    this.subscriptions.push(
      this.fieldService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.removeSelectedFields(response.result);
        }
      })
    );
  }

  private removeSelectedFields(fields: SelectField[]) {
    this.criterionList.forEach((criterion: Criterion) =>{
      criterion.fields.forEach((criterionField: CriterionField) =>{
        fields.forEach((value: SelectField, index: number) => {
          if (value.idField == criterionField.field.idField) fields.splice(index, 1);
        });
      });
    });

    this.fields = fields;
    this.fieldsCache = fields;
  }

  public addCriterion() {
    this.open.next(new Criterion());
  }

  public edit(criterion: Criterion) {
    this.open.next(criterion);
  }

  public addFields(criterion: Criterion) {
    this.openCriField.next(criterion);
  }

  private pushCriterion(criterion: Criterion) {
    const cri = this.findCriterion(criterion);
    if (cri) {
      cri.name = criterion.name
      cri.fields = criterion.fields
    } else {
      this.criterionListCache.push(criterion);
    }
  }

  private findCriterion(criterion: Criterion): Criterion {
    return this.criterionListCache.find((value: Criterion, index: number) =>
      value.idCriterion === criterion.idCriterion
    );
  }

}
