import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Criterion, DynamicField, Field} from "../../../../dto/class.definition";
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
  public criterion: Criterion = new Criterion();

  @Input()
  public delete: EventEmitter<Criterion>;

  public faGripHorizontal = faGripHorizontal;
  public faTrash = faTrash;

  constructor(protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.criterion.fields.forEach(f => {
      const dynamicField: DynamicField = this.toDynamicField(f.field);
      this.fields.push(dynamicField);
    });
    super.ngOnInit();
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
    return dynamicField;
  }

  remove() {
    this.delete.next(this.criterion);
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  }


}
