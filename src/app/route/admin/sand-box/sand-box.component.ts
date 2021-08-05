import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Category, Criterion, CriterionConfig, PositionReq} from "../../../dto/class.definition";
import {ClientService, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {CriterionService} from "../../../services/criterion.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from "@fortawesome/free-solid-svg-icons/faGripHorizontal";
import {CategoryService} from "../../../services/category.service";
import {getPositionReq} from "../../../common/functions/functions";

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss']
})
export class SandBoxComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.SandBox';

  public faGripHorizontal = faGripHorizontal;
  public delete: EventEmitter<Category> = new EventEmitter();
  public openCategory: EventEmitter<Category> = new EventEmitter();
  public refresh: EventEmitter<Category> = new EventEmitter();
  public categories: Category[] = [];
  public criterionList: Criterion[] = [];
  private subscriptions: Subscription[] = [];
  public selectedCriterion: CriterionConfig[] = [];

  constructor(private criterionService: CriterionService,
              private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.refresh.subscribe((category: Category) => {
      this.pushCategory(category);
    });
    this.delete.subscribe((category: Category) => {
      this.removeCategory(category);
    });
    this.findAllCategory();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public addCategory() {
    this.openCategory.next(new Category());
  }

  private removeCategory(category: Category) {
    this.categoryService.delete(category.idCategory).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.categories.forEach((value: Category, index: number) => {
          if (value.idCategory == category.idCategory) this.categories.splice(index, 1);
        });
      }
    });
  }

  private pushCategory(category: Category) {
    const foundCategory = this.categories.find((c: Category) => c.idCategory === category.idCategory);
    if (foundCategory) {
      foundCategory.name = category.name
    } else {
      this.categories.push(category);
    }
  }

  private findAllCategory(): void {
    this.categoryService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.categories = response.result;
      }
    });
  }

  public drop(event: CdkDragDrop<Category[]>): void {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    const request = getPositionReq(this.categories, 'idCategory')
    this.categoryService.position(request).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {

      }
    });
  }
}
