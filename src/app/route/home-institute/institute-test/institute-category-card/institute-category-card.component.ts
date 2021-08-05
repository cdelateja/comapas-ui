import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Category, Institute, TestReq} from "../../../../dto/class.definition";
import {InstituteCriterionCardComponent} from "../institute-criterion-card/institute-criterion-card.component";

@Component({
  selector: 'app-institute-category-card',
  templateUrl: './institute-category-card.component.html',
  styleUrls: ['./institute-category-card.component.scss']
})
export class InstituteCategoryCardComponent implements OnInit {

  @ViewChildren(InstituteCriterionCardComponent)
  private cards: QueryList<InstituteCriterionCardComponent>;

  @Input()
  public category: Category = new Category();

  @Input()
  public institute: Institute;

  constructor() { }

  ngOnInit(): void {
  }

  public save(req: TestReq): void {
    this.cards.forEach((c: InstituteCriterionCardComponent) => {
      req.criterion.push(c.save());
    });
  }

  public complete(req: TestReq): boolean {
    let valid = true;
    this.cards.forEach((c: InstituteCriterionCardComponent) => {
      if (c.validateForm()) {
        req.criterion.push(c.save());
      } else {
        valid = false;
      }
    });
    return valid;
  }

}
