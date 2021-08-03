import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {MatTableDataSource} from "@angular/material/table";
import {Company, CompanyRes, CompanyUserRes, User} from "../../../../dto/class.definition";
import {CompanyService} from "../../../../services/company.service";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {ClientService, Response} from "cdelateja";
import {ObservableService} from "../../../../services/observable.service";
import {faFileAlt} from "@fortawesome/free-solid-svg-icons/faFileAlt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-institute-table',
  templateUrl: './institute-table.component.html',
  styleUrls: ['./institute-table.component.scss']
})
export class InstituteTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public PREFIX = 'Components.Structure.Institute.Table';

  public displayedColumns: string[] = ['idCompany', 'name', 'admin', 'test', 'edit'];
  public faPencilAlt = faPencilAlt;
  public faFileAlt = faFileAlt;
  public institutes: CompanyRes[] = [];
  public dataSource = new MatTableDataSource<CompanyRes>(this.institutes);
  private subscriptions: Subscription[] = [];


  constructor(private companyService: CompanyService,
              private observableService: ObservableService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findInstitutes();
    this.observableService.obsRefreshCompany().subscribe((company: CompanyRes) => {
      this.refreshCompany(company);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findInstitutes() {
    this.subscriptions.push(
      this.companyService.findExternals().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.institutes = response.result;
          this.dataSource.data = this.institutes;
        }
      })
    );
  }

  public refreshCompany(company: CompanyRes) {
    const found = this.dataSource.data.find((c: Company) => c.idCompany === company.idCompany);
    if (found) {
      found.name = company.name;
    } else {
      this.institutes.push(company);
      this.dataSource.data = this.institutes;
    }
  }

  public addCompany() {
    this.observableService.nextOpenModalCompany(new Company());
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

  public viewTest(company: Company){
    this.router.navigate(['/institute/test', company.idCompany]).then();
  }

}
