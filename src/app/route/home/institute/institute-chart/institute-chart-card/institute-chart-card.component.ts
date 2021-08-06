import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Company, CompanyRes, FieldsInfoRes, InstituteInfoRes} from "../../../../../dto/class.definition";
import {CompanyService} from "../../../../../services/company.service";
import {Subscription} from "rxjs";
import {ClientService, Response} from "cdelateja";
import {InstituteService} from "../../../../../services/institute.service";

@Component({
  selector: 'app-institute-chart-card',
  templateUrl: './institute-chart-card.component.html',
  styleUrls: ['./institute-chart-card.component.scss']
})
export class InstituteChartCardComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Institute.Chart.Card';

  @Input()
  public company: CompanyRes;

  @Input()
  public fieldsInfoRes: FieldsInfoRes;

  private subscriptions: Subscription[] = [];
  public instituteInfoRes: InstituteInfoRes = new InstituteInfoRes();
  public progress = 0;

  constructor(private companyService: CompanyService,
              private instituteService: InstituteService) {
  }

  public ngOnInit(): void {
    this.findInstituteInfo();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findInstituteInfo() {
    this.subscriptions.push(
      this.instituteService.getInstituteInfo(this.company.idCompany).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.instituteInfoRes = response.result;
          this.progress = this.getProgress();
        }
      })
    );
  }

  private getProgress(): number {
    return (this.instituteInfoRes.totalFields * 100) / this.fieldsInfoRes.totalFields;
  }

}
