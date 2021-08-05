import {Component, Input, ViewChild} from '@angular/core';
import {Category, CategoryCriterionReq, Criterion} from "../../../../dto/class.definition";
import {BaseComponent, ButtonType, ClientService, Response} from 'cdelateja';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ObservableService} from "../../../../services/observable.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {CategoryService} from "../../../../services/category.service";
import {CriterionService} from "../../../../services/criterion.service";

declare var $: any;

@Component({
  selector: 'app-sand-box-criterion',
  templateUrl: './sand-box-criterion.component.html',
  styleUrls: ['./sand-box-criterion.component.scss']
})
export class SandBoxCriterionComponent extends BaseComponent {

  public PREFIX = 'Components.Structure.SandBox.CriterionModal';

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  @Input()
  public categories: Category[] = [];

  public criterionList: Criterion[] = [];
  public faPlus = faPlus;
  public buttonType: ButtonType = new ButtonType();
  public displayedColumns: string[] = ['select', 'name'];
  public dataSource = new MatTableDataSource(this.criterionList);
  public selection = new SelectionModel<Criterion>(true, []);
  private category: Category;

  constructor(private observableService: ObservableService,
              private criterionService: CriterionService,
              private categoryService: CategoryService) {
    super();
  }

  public ngOnInit(): void {
    this.findAll();
    this.subscriptions.push(
      this.observableService.obsOpenModalCriterion().subscribe((category: Category) => {
        const criterionList = this.removeSelectedCriterion(this.categories, this.criterionList)
        this.dataSource = new MatTableDataSource(criterionList);
        this.category = category;
        this.addSelected(category, criterionList);
        this.toggle();
      })
    );
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private addSelected(category: Category, criterionList: Criterion[]) {
    category.criterionList.forEach((criterion: Criterion) => {
      criterionList.push(criterion);
      this.selection.select(criterion);
    });
  }

  private findAll(): void {
    this.criterionService.findAll().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.criterionList = response.result;
      }
    });
  }

  public searchByName(word: string): void {
    this.dataSource.filter = word;
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

  checkboxLabel(row?: Criterion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idCriterion + 1}`;
  }

  private removeSelected(selected: number[]): void {
    selected.forEach(id => {
      this.criterionList.forEach((value: Criterion, index: number) => {
        if (value.idCriterion == id) this.criterionList.splice(index, 1);
      });
    });
  }

  public save() {
    const req: CategoryCriterionReq = new CategoryCriterionReq();
    req.idCategory = this.category.idCategory;
    this.selection.selected.forEach((select: Criterion) => {
      req.criterionList.push(select.idCriterion);
    });
    this.categoryService.addCriterion(req).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.category.criterionList = response.result.criterionList;
        this.removeSelected(req.criterionList);
        this.close();
      }
    });
  }

  private removeSelectedCriterion(categories: Category[], criterionList: Criterion[]): Criterion[] {
    const list: Criterion[] = [];
    criterionList.forEach((criterion: Criterion) => {
      list.push(criterion);
    });
    categories.forEach(cat => {
      cat.criterionList.forEach(c => {
        list.forEach((criterion: Criterion, index: number) => {
          if (c.idCriterion == criterion.idCriterion) list.splice(index, 1);
        });
      })
    });
    return list;
  }

}
