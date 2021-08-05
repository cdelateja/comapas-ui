import {Component, EventEmitter} from '@angular/core';
import {Criterion, CriterionField, Field} from "../../../dto/class.definition";
import {BaseComponent, ClientService, Response} from "cdelateja";
import {CriterionService} from "../../../services/criterion.service";
import {FieldService} from "../../../services/field.service";

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent extends BaseComponent {

  public PREFIX = 'Components.Structure.Criterion';

  public criterionList: Criterion[] = [];
  public criterionListCache: Criterion[] = [];
  public fields: Field[] = [];
  public open: EventEmitter<Criterion> = new EventEmitter();
  public openCriField: EventEmitter<Criterion> = new EventEmitter();
  public refresh: EventEmitter<Criterion> = new EventEmitter();

  constructor(private criterionService: CriterionService,
              private fieldService: FieldService) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
    this.pushSubscription(
      this.refresh.subscribe((criterion: Criterion) => {
        this.pushCriterion(criterion);
      })
    );
  }

  private findAll(): void {
    this.criterionService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.criterionList = response.result;
        this.criterionListCache = response.result;
        this.findFields();
      }
    });
  }

  private findFields(): void {
    this.fieldService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.removeSelectedFields(response.result);
      }
    });
  }

  private removeSelectedFields(fields: Field[]) {
    this.criterionList.forEach((criterion: Criterion) => {
      criterion.fields.forEach((criterionField: CriterionField) => {
        fields.forEach((value: Field, index: number) => {
          if (value.idField == criterionField.field.idField) fields.splice(index, 1);
        });
      });
    });
    this.fields = fields;
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
