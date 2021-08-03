import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Company, FieldsInfoRes, InstituteInfoRes} from "../../../../../dto/class.definition";
import {CompanyService} from "../../../../../services/company.service";
import {Subscription} from "rxjs";
import {ClientService, Response} from "../../../../../../../../angular-lib/dist/cdelateja";

@Component({
  selector: 'app-institute-chart-card',
  templateUrl: './institute-chart-card.component.html',
  styleUrls: ['./institute-chart-card.component.scss']
})
export class InstituteChartCardComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Institute.Chart.Card';

  @Input()
  public instituteInfoRes: InstituteInfoRes;

  @Input()
  public fieldsInfoRes: FieldsInfoRes;

  private subscriptions: Subscription[] = [];
  public company: Company = new Company();

  constructor(private companyService: CompanyService) {
  }

  public ngOnInit(): void {
    this.findCompany();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findCompany(): void {
    this.subscriptions.push(
      this.companyService.findById(this.instituteInfoRes.idInstitute).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.company = response.result;
        }
      })
    );
  }

  public getProgress(): number {
    return (this.instituteInfoRes.totalFields * 100) / this.fieldsInfoRes.totalFields;
  }

}
