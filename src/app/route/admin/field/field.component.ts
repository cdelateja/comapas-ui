import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {Field} from '../../../dto/class.definition';
import {Subscription} from 'rxjs';
import {FieldService} from '../../../services/field.service';
import {ClientService, Response} from 'cdelateja';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {

  public faPencilAlt = faPencilAlt;
  public faCheck = faCheck;
  public faTimesCircle = faTimesCircle;
  private subscriptions: Subscription[] = [];
  public fields: Field[] = [];
  public fieldsCache: Field[] = [];
  public open: EventEmitter<Field> = new EventEmitter()

  constructor(private fieldService: FieldService) {
  }

  public ngOnInit(): void {
    this.findFields();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findFields(): void {
    this.subscriptions.push(
      this.fieldService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.fields = response.result;
          this.fieldsCache = response.result;
        }
      })
    )
  }

  public addField(): void {
    this.open.next(new Field())
  }

  public editField(field: Field): void {
    this.open.next(field);
  }

  public searchByName(word: string) {
    const list: Field[] = [];
    if ('' !== word) {
      this.fields.forEach(e => {
        if (e.label.toLowerCase().includes(word.toLowerCase())) {
          list.push(e);
        }
      });
      this.fields = list;
    } else {
      this.fields = this.fieldsCache;
    }
  }

  public refresh(): void {
    this.findFields();
  }

}
