import {Component, ViewChild} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {MatTableDataSource} from "@angular/material/table";
import {
  CompanyDetailRes,
  CompanyReq,
  CompanyRes,
  CompanyUserRes,
  FieldsInfoRes,
  InstituteInfoRes
} from "../../../../dto/class.definition";
import {CompanyService} from "../../../../services/company.service";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {BaseComponent, ClientService, Response} from "cdelateja";
import {ObservableService} from "../../../../services/observable.service";
import {faFileAlt} from "@fortawesome/free-solid-svg-icons/faFileAlt";
import {Router} from "@angular/router";
import {toCompanyReq} from "../../../../common/functions/functions-dto";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FieldService} from "../../../../services/field.service";
import {InstituteService} from "../../../../services/institute.service";

@Component({
  selector: 'app-institute-table',
  templateUrl: './institute-table.component.html',
  styleUrls: ['./institute-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms')),
      transition('expanded <=> void', animate('225ms'))
    ]),
  ]
})
export class InstituteTableComponent extends BaseComponent {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public PREFIX = 'Components.Structure.Institute.Table';

  public displayedColumns: string[] = ['idCompany', 'name', 'admin', 'test', 'edit'];
  public faPencilAlt = faPencilAlt;
  public faFileAlt = faFileAlt;
  public institutes: CompanyRes[] = [];
  public expandedElement: CompanyRes | null;
  public dataSource = new MatTableDataSource<CompanyRes>(this.institutes);
  public fieldsInfoRes: FieldsInfoRes = new FieldsInfoRes();


  constructor(private companyService: CompanyService,
              private observableService: ObservableService,
              private fieldService: FieldService,
              private instituteService: InstituteService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.findInstitutes();
    this.findFieldsInfo();
    this.observableService.obsRefreshCompany().subscribe((company: CompanyRes) => {
      this.refreshCompany(company);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private findFieldsInfo(): void {
    this.subscriptions.push(
      this.fieldService.getFieldsInfo().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.fieldsInfoRes = response.result;
        }
      })
    );
  }

  private findInstitutes() {
    this.companyService.findExternals().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.institutes = response.result;
        this.dataSource.data = this.institutes;
      }
    });
  }

  public refreshCompany(company: CompanyRes) {
    const found = this.dataSource.data.find((c: CompanyRes) => c.idCompany === company.idCompany);
    if (found) {
      found.name = company.name;
    } else {
      this.institutes.push(company);
      this.dataSource.data = this.institutes;
    }
  }

  public addCompany() {
    this.observableService.nextOpenModalCompany(new CompanyReq());
  }

  public getAdminUser(company: CompanyRes): string {
    const user: CompanyUserRes = company.users.find((u: CompanyUserRes) => u.admin);
    if (user) {
      return user.username
    }
    return ''
  }

  public searchByWord(word: string) {
    this.dataSource.filter = word;
  }

  public viewTest(company: CompanyRes) {
    this.router.navigate(['/institute/test', company.idCompany]).then();
  }

  public edit(company: CompanyRes) {
    this.companyService.detail(company.idCompany).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        const res: CompanyDetailRes = response.result;
        this.observableService.nextOpenModalCompany(toCompanyReq(res));
      }
    });
  }

  public expand(element: CompanyRes): void {
    if (this.expandedElement !== element) {
      element.show = true;
      this.expandedElement = element;
    } else {
      element.show = false;
      this.expandedElement = null;
    }
  }

}
