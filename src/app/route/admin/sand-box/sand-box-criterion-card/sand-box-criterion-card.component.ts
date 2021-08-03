import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Criterion, CriterionConfig, PositionReq} from "../../../../dto/class.definition";
import {DynamicForm} from "../../../../common/components/dynamic.form";
import {TranslateService} from "@ngx-translate/core";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from '@fortawesome/free-solid-svg-icons/faGripHorizontal';
import {getPositionReq, toDynamicFields} from "../../../../common/functions/functions";
import {ClientService, Response} from "../../../../../../../angular-lib/dist/cdelateja";
import {FieldService} from "../../../../services/field.service";

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

  public faGripHorizontal = faGripHorizontal;
  public faTrash = faTrash;

  constructor(protected translate: TranslateService,
              private fieldService: FieldService) {
    super(translate);
  }

  ngOnInit(): void {
    this.listByConfig();
    super.ngOnInit();
  }

  private listByConfig() {
    this.fields = toDynamicFields(this.criterion);
    this.criterion.dynamicFields = this.fields;
  }

  remove() {
    this.delete.next(this.criterion);
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    const request = getPositionReq(this.fields, 'idField')
    this.subscriptions.push(
      this.fieldService.position(request).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {

        }
      })
    );
  }

}
