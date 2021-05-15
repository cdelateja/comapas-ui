import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Criterion} from "../../../../dto/class.definition";
import {ButtonType} from 'cdelateja';
import {Subscription} from "rxjs";
import {faPlus} from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-sand-box-criterion',
  templateUrl: './sand-box-criterion.component.html',
  styleUrls: ['./sand-box-criterion.component.scss']
})
export class SandBoxCriterionComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.SandBox.CriterionModal';

  @Input()
  public refresh: EventEmitter<Criterion> = new EventEmitter();

  @Input()
  public open: EventEmitter<Criterion> = new EventEmitter();

  @Input()
  public criterionList: Criterion[] = [];

  @Input()
  public criterionCache: Criterion[] = [];

  public faPlus = faPlus;
  public buttonType: ButtonType = new ButtonType();
  private subscriptions: Subscription[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe(() => {
        this.toggle();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public searchByName(word: string): void {
    const records: Criterion[] = [];
    if ('' !== word) {
      this.criterionList.forEach(e => {
        if (e.name.toLowerCase().includes(word.toLowerCase())) {
          records.push(e);
        }
      });
      this.criterionList = records;
    } else {
      this.criterionList = this.criterionCache;
    }
  }

  private toggle(): void {
    $('#criterionModal').modal({
      keyboard: false,
      backdrop: 'static'
    });
  }

  public close(): void {
    $('#criterionModal').modal('hide');
  }

  public add(criterion: Criterion) {
    this.refresh.next(criterion);
    this.close();
  }

}
