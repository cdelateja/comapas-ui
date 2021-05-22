import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Criterion, CriterionField, CriterionFieldReq, Field} from "../../../../dto/class.definition";
import {Subscription} from "rxjs";
import {ButtonType, ClientService, Response} from 'cdelateja';
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {CriterionService} from "../../../../services/criterion.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

declare var $: any;

@Component({
  selector: 'app-criterion-field-modal',
  templateUrl: './criterion-field-modal.component.html',
  styleUrls: ['./criterion-field-modal.component.scss']
})
export class CriterionFieldModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public PREFIX = 'Components.Structure.Criterion.FieldModal';

  @Input()
  public refresh: EventEmitter<Field> = new EventEmitter();

  @Input()
  public open: EventEmitter<Field> = new EventEmitter();

  @Input()
  public fields: Field[] = [];

  public displayedColumns: string[] = ['select', 'label', 'name', 'score', 'evidence'];
  public dataSource = new MatTableDataSource(this.fields);
  public selection = new SelectionModel<Field>(true, []);
  public faCheck = faCheck;
  public buttonType: ButtonType = new ButtonType();
  private subscriptions: Subscription[] = [];
  public criterion: Criterion = new Criterion();

  constructor(private criterionService: CriterionService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.open.subscribe((criterion: Criterion) => {
        this.dataSource = new MatTableDataSource(this.fields);
        this.criterion = criterion;
        this.addSelectedFields(criterion);
        this.toggle();
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private addSelectedFields(criterion: Criterion) {
    criterion.fields.forEach((criterionField: CriterionField) => {
      this.fields.push(criterionField.field);
      this.selection.select(criterionField.field);
    });
  }

  private removeSelectedFields(criterion: Criterion) {
    criterion.fields.forEach((criterionField: CriterionField) => {
      this.fields.forEach((value: Field, index: number) => {
        if (value.idField == criterionField.field.idField) {
          this.fields.splice(index, 1)
          this.selection.deselect(value);
        }
      });
    });
  }


  public close(): void {
    $('#FieldModal').modal('hide');
    this.removeSelectedFields(this.criterion);
  }

  private toggle(): void {
    $('#FieldModal').modal({
      keyboard: false,
      backdrop: 'static'
    });
  }

  public searchByWord(word: string): void {
    this.dataSource.filter = word;
  }

  public save() {
    const req: CriterionFieldReq = new CriterionFieldReq();
    req.idCriterion = this.criterion.idCriterion;
    this.selection.selected.forEach((select: Field) => {
      req.fields.push(select.idField);
    });
    this.subscriptions.push(
      this.criterionService.addFields(req).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.criterion = response.result;
          this.refresh.next(response.result);
          this.close();
        }
      })
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Field): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idField + 1}`;
  }

}
