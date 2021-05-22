import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {
  Config,
  Criterion,
  CriterionConfig,
  CriterionField,
  DynamicField,
  Field,
  FormConfig,
  FormFieldConfig
} from "../../../../dto/class.definition";
import {DynamicForm} from "../../../../common/components/dynamic.form";
import {TranslateService} from "@ngx-translate/core";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from '@fortawesome/free-solid-svg-icons/faGripHorizontal';

@Component({
  selector: 'app-sand-box-criterion-card',
  templateUrl: './sand-box-criterion-card.component.html',
  styleUrls: ['./sand-box-criterion-card.component.scss']
})
export class SandBoxCriterionCardComponent extends DynamicForm implements OnInit {

  @Input()
  public criterion: CriterionConfig = new CriterionConfig();

  @Input()
  public delete: EventEmitter<CriterionConfig>;

  @Input()
  public save: EventEmitter<CriterionConfig>;

  @Input()
  public config: Config = new Config();

  public faGripHorizontal = faGripHorizontal;
  public faTrash = faTrash;

  constructor(protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.listByConfig();
    super.ngOnInit();
  }

  private listByConfig() {
    if (this.config) {
      const formConfig: FormConfig = this.config.json.find((f: FormConfig) => f.idCriterion === this.criterion.idCriterion);
      if (formConfig) {
        this.fieldsByConfig(formConfig);
      } else {
        this.criterion.fields.forEach(f => {
          const dynamicField: DynamicField = this.toDynamicField(f.field);
          this.fields.push(dynamicField);
        });
      }
      this.criterion.dynamicFields = this.fields;
    }
  }

  private fieldsByConfig(formConfig: FormConfig): void {
    formConfig.fields.forEach((fC: FormFieldConfig) => {
      const criterionField: CriterionField = this.criterion.fields.find((field: CriterionField) =>
        field.idField === fC.idField);
      if (criterionField) {
        this.fields.push(this.toDynamicField(criterionField.field));
      }
    });
    this.criterion.fields.forEach((f: CriterionField) => {
      const field = this.fields.find((d: DynamicField) => d.idField === f.idField);
      if (!field) {
        this.fields.push(this.toDynamicField(f.field));
      }
    });
  }

  private toDynamicField(field: Field): DynamicField {
    const dynamicField: DynamicField = new DynamicField();
    dynamicField.catalog = field.catalog;
    dynamicField.score = field.score;
    dynamicField.evidence = field.evidence;
    dynamicField.required = field.required;
    dynamicField.label = field.label;
    dynamicField.formControlName = field.name;
    dynamicField.type = field.type;
    dynamicField.idField = field.idField;
    return dynamicField;
  }

  remove() {
    this.delete.next(this.criterion);
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.save.next(null);
  }


}
