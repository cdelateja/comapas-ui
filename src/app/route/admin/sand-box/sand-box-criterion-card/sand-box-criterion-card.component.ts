import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Config, Criterion, CriterionConfig} from "../../../../dto/class.definition";
import {DynamicForm} from "../../../../common/components/dynamic.form";
import {TranslateService} from "@ngx-translate/core";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from '@fortawesome/free-solid-svg-icons/faGripHorizontal';
import {toDynamicFields} from "../../../../common/functions/functions";

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
      this.fields = toDynamicFields(this.config, this.criterion);
      this.criterion.dynamicFields = this.fields;
    }
  }

  remove() {
    this.delete.next(this.criterion);
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.save.next(null);
  }


}
