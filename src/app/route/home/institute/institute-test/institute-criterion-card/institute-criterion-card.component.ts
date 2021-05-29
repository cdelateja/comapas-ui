import {Component, Input, OnInit} from '@angular/core';
import {Config, Criterion, Institute, TestCriterionReq, TestFieldReq} from "../../../../../dto/class.definition";
import {DynamicForm} from "../../../../../common/components/dynamic.form";
import {TranslateService} from "@ngx-translate/core";
import {setFieldsValue, toDynamicFields} from "../../../../../common/functions/functions";

@Component({
  selector: 'app-institute-criterion-card',
  templateUrl: './institute-criterion-card.component.html',
  styleUrls: ['./institute-criterion-card.component.scss']
})
export class InstituteCriterionCardComponent extends DynamicForm implements OnInit {

  @Input()
  public criterion: Criterion = new Criterion();

  @Input()
  public config: Config;

  @Input()
  public institute: Institute;

  constructor(protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.listByConfig();
    super.ngOnInit();
  }

  private listByConfig() {
    this.fields = toDynamicFields(this.config, this.criterion);
    if (this.institute) {
      setFieldsValue(this.fields, this.institute);
    }
  }

  public save(): TestCriterionReq {
    const req: TestCriterionReq = new TestCriterionReq();
    const form = this.formGroup.getRawValue();
    Object.keys(form).forEach((key: string) => {
      const testFieldReq: TestFieldReq = new TestFieldReq();
      testFieldReq.name = key;
      testFieldReq.value = form[key];
      req.fields.push(testFieldReq);
    });
    return req;
  }


}
