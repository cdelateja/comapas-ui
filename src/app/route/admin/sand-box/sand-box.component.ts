import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Criterion} from "../../../dto/class.definition";
import {ClientService, Response} from 'cdelateja';
import {Subscription} from "rxjs";
import {CriterionService} from "../../../services/criterion.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {faGripHorizontal} from "@fortawesome/free-solid-svg-icons/faGripHorizontal";

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss']
})
export class SandBoxComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.SandBox';

  public faGripHorizontal = faGripHorizontal;
  public delete: EventEmitter<Criterion> = new EventEmitter();
  public open: EventEmitter<Criterion> = new EventEmitter();
  public refresh: EventEmitter<Criterion> = new EventEmitter();
  public criterionList: Criterion[] = [];
  public criterionCache: Criterion[] = [];
  private subscriptions: Subscription[] = [];
  public selectedCriterion: Criterion[] = [];

  constructor(private criterionService: CriterionService) {
  }

  public ngOnInit(): void {
    this.findAll();
    this.refresh.subscribe((criterion: Criterion) => {
      this.pushCriterion(criterion);
    });
    this.delete.subscribe((criterion: Criterion) => {
      this.removeCriterion(criterion);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public addCriterion() {
    this.open.next(new Criterion());
  }

  private removeCriterion(criterion: Criterion) {
    this.selectedCriterion.forEach((value: Criterion, index: number) => {
      if (value.idCriterion == criterion.idCriterion) this.selectedCriterion.splice(index, 1);
    });
    this.criterionList.push(criterion);
  }

  private pushCriterion(criterion: Criterion) {
    this.criterionList.forEach((value: Criterion, index: number) => {
      if (value.idCriterion == criterion.idCriterion) this.criterionList.splice(index, 1);
    });
    this.selectedCriterion.push(criterion);
  }

  private findAll(): void {
    this.subscriptions.push(
      this.criterionService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.criterionList = response.result;
          this.criterionCache = response.result;
        }
      })
    )
  }

  public drop(event: CdkDragDrop<Criterion[]>): void {
    moveItemInArray(this.selectedCriterion, event.previousIndex, event.currentIndex);
  }

}
