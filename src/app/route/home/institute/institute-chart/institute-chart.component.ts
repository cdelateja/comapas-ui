import {Component, OnDestroy, OnInit} from '@angular/core';
import {InstituteService} from '../../../../services/institute.service';
import {FieldService} from '../../../../services/field.service';
import {Subscription} from 'rxjs';
import {ClientService, Response} from 'cdelateja';
import {FieldsInfoRes, InstituteInfoRes} from '../../../../dto/class.definition';

@Component({
  selector: 'app-institute-chart',
  templateUrl: './institute-chart.component.html',
  styleUrls: ['./institute-chart.component.scss']
})
export class InstituteChartComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Institute.Chart';
  private subscriptions: Subscription[] = [];

  public fieldsInfoRes: FieldsInfoRes = new FieldsInfoRes();
  public institutesInfoRes: InstituteInfoRes[] = [];

  constructor(private instituteService: InstituteService,
              private fieldService: FieldService) {
  }

  ngOnInit(): void {
    this.findFieldsInfo();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findFieldsInfo(): void {
    this.subscriptions.push(
      this.fieldService.getFieldsInfo().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.fieldsInfoRes = response.result;
          this.findInstitutesInfo();
        }
      })
    );
  }

  private findInstitutesInfo() {
    this.subscriptions.push(
      this.instituteService.getFieldsInfo().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.institutesInfoRes = response.result;
        }
      })
    );
  }

}
