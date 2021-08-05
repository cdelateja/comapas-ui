import {Component, OnDestroy, OnInit} from '@angular/core';
import {InstituteService} from '../../../../services/institute.service';
import {FieldService} from '../../../../services/field.service';
import {Subscription} from 'rxjs';
import {ClientService, Response} from 'cdelateja';
import {CompanyRes, FieldsInfoRes, InstituteInfoRes} from '../../../../dto/class.definition';
import {CompanyService} from "../../../../services/company.service";

@Component({
  selector: 'app-institute-chart',
  templateUrl: './institute-chart.component.html',
  styleUrls: ['./institute-chart.component.scss']
})
export class InstituteChartComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Institute.Chart';
  private subscriptions: Subscription[] = [];

  public institutes: CompanyRes[] = [];
  public fieldsInfoRes: FieldsInfoRes = new FieldsInfoRes();

  constructor(private instituteService: InstituteService,
              private companyService: CompanyService,
              private fieldService: FieldService) {
  }

  ngOnInit(): void {
    this.findFieldsInfo();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findFieldsInfo(): void {
    this.fieldService.getFieldsInfo().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.fieldsInfoRes = response.result;
        this.findInstitutes();
      }
    });
  }

  private findInstitutes() {
    this.companyService.findExternals().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.institutes = response.result;
      }
    });
  }

}
