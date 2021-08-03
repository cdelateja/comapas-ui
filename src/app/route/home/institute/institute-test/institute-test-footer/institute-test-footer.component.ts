import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldsInfoRes, InstituteInfoRes} from "../../../../../dto/class.definition";
import {ClientService, OauthService, Response} from "cdelateja";
import {Subscription} from "rxjs";
import {FieldService} from "../../../../../services/field.service";
import {InstituteService} from "../../../../../services/institute.service";

@Component({
  selector: 'app-institute-test-footer',
  templateUrl: './institute-test-footer.component.html',
  styleUrls: ['./institute-test-footer.component.scss']
})
export class InstituteTestFooterComponent implements OnInit, OnDestroy {

  public PREFIX = 'Components.Structure.Institute.Test.Footer';

  private subscriptions: Subscription[] = [];
  public fieldsInfoRes: FieldsInfoRes = new FieldsInfoRes();
  public instituteInfoRes: InstituteInfoRes = new InstituteInfoRes();

  constructor(private fieldService: FieldService,
              private instituteService: InstituteService,
              private oauthService: OauthService) { }

  public ngOnInit(): void {
    this.findFieldsInfo();
    this.findInstituteInfo();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  private findInstituteInfo() {
    this.subscriptions.push(
      this.instituteService.getInstituteInfo(this.oauthService.getUser().idCompany).subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.instituteInfoRes = response.result;
        }
      })
    );
  }


}
