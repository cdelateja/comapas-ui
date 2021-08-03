import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Category, Criterion, IdReq, PositionReq} from "../../../../dto/class.definition";
import {ObservableService} from "../../../../services/observable.service";
import {Subscription} from "rxjs";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons/faGripHorizontal';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ClientService, Response} from "../../../../../../../angular-lib/dist/cdelateja";
import {CriterionService} from "../../../../services/criterion.service";

@Component({
  selector: 'app-sand-box-category-card',
  templateUrl: './sand-box-category-card.component.html',
  styleUrls: ['./sand-box-category-card.component.scss']
})
export class SandBoxCategoryCardComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.SandBox.CategoryCard';

  @Input()
  public category: Category = new Category();

  @Input()
  public delete: EventEmitter<Category>;

  @Input()
  public open: EventEmitter<Category>;

  public deleteCriterion: EventEmitter<Criterion> = new EventEmitter();
  public faGripHorizontal = faGripHorizontal;
  public faTrash = faTrash;
  public faPen = faPen;
  private subscriptions: Subscription[] = [];

  constructor(private observableService: ObservableService,
              private criterionService: CriterionService) {
  }

  public ngOnInit(): void {
    this.deleteCriterion.subscribe((criterion: Criterion) => {
      this.removeCriterion(criterion);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public remove(): void {
    this.delete.next(this.category);
  }

  public edit(): void {
    this.open.next(this.category);
  }

  public addCriterion() {
    this.observableService.nextOpenModalCriterion(this.category);
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.category.criterionList, event.previousIndex, event.currentIndex);
    const request = new PositionReq();
    this.category.criterionList.forEach(c => request.order.push(c.idCriterion))
    this.subscriptions.push(
      this.criterionService.position(request).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {

        }
      })
    );
  }

  private removeCriterion(criterion: Criterion) {
    const req = new IdReq();
    req.id = criterion.idCriterion
    this.subscriptions.push(
      this.criterionService.removeCategory(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.category.criterionList.forEach((value: Criterion, index: number) => {
            if (value.idCriterion == req.id) this.category.criterionList.splice(index, 1);
          });
        }
      })
    )
  }

}
