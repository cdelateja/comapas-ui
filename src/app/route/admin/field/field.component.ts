import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {Field} from '../../../dto/class.definition';
import {Subscription} from 'rxjs';
import {FieldService} from '../../../services/field.service';
import {ClientService, Response} from 'cdelateja';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public PREFIX = 'Components.Structure.Field';

  public displayedColumns: string[] = ['idField', 'label', 'score', 'type', 'catalog', 'evidence','required', 'edit'];
  public faPencilAlt = faPencilAlt;
  public faCheck = faCheck;
  private subscriptions: Subscription[] = [];
  public fields: Field[] = [];
  public dataSource = new MatTableDataSource(this.fields);
  public open: EventEmitter<Field> = new EventEmitter();
  public refresh: EventEmitter<Field> = new EventEmitter();

  constructor(private fieldService: FieldService) {
  }

  public ngOnInit(): void {
    this.findFields();
    this.refresh.subscribe(() => {
      this.findFields();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findFields(): void {
    this.subscriptions.push(
      this.fieldService.findAll().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.fields = response.result;
          this.dataSource.data = this.fields;
        }
      })
    );
  }

  public addField(): void {
    this.open.next(new Field())
  }

  public editField(field: Field): void {
    this.open.next(field);
  }

  public searchByWord(word: string) {
    this.dataSource.filter = word;
  }

}
