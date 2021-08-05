import {Component, EventEmitter, Input} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Category, Criterion, IdReq, PositionReq} from "../../../../dto/class.definition";
import {ObservableService} from "../../../../services/observable.service";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faGripHorizontal} from '@fortawesome/free-solid-svg-icons/faGripHorizontal';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BaseComponent, ClientService, Response} from "cdelateja";
import {CriterionService} from "../../../../services/criterion.service";

@Component({
  selector: 'app-sand-box-category-card',
  templateUrl: './sand-box-category-card.component.html',
  styleUrls: ['./sand-box-category-card.component.scss']
})
export class SandBoxCategoryCardComponent extends BaseComponent {

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

  constructor(private observableService: ObservableService,
              private criterionService: CriterionService) {
    super();
  }

  public ngOnInit(): void {
    this.pushSubscription(
      this.deleteCriterion.subscribe((criterion: Criterion) => {
        this.removeCriterion(criterion);
      })
    );
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
    this.criterionService.position(request).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {

      }
    });
  }

  private removeCriterion(criterion: Criterion) {
    const req = new IdReq();
    req.id = criterion.idCriterion
    this.criterionService.removeCategory(req).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.category.criterionList.forEach((value: Criterion, index: number) => {
          if (value.idCriterion == req.id) this.category.criterionList.splice(index, 1);
        });
      }
    });
  }

}
