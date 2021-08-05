import {Component} from '@angular/core';
import {FieldsInfoRes, InstituteInfoRes} from "../../../../dto/class.definition";
import {BaseComponent, ClientService, OauthService, Response} from "cdelateja";
import {FieldService} from "../../../../services/field.service";
import {InstituteService} from "../../../../services/institute.service";

@Component({
  selector: 'app-institute-test-footer',
  templateUrl: './institute-test-footer.component.html',
  styleUrls: ['./institute-test-footer.component.scss']
})
export class InstituteTestFooterComponent extends BaseComponent {

  public PREFIX = 'Components.Structure.Institute.Test.Footer';

  public fieldsInfoRes: FieldsInfoRes = new FieldsInfoRes();
  public instituteInfoRes: InstituteInfoRes = new InstituteInfoRes();

  constructor(private fieldService: FieldService,
              private instituteService: InstituteService,
              private oauthService: OauthService) {
    super();
  }

  public ngOnInit(): void {
    this.findFieldsInfo();
    this.findInstituteInfo();
  }

  private findFieldsInfo(): void {
    this.fieldService.getFieldsInfo().subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.fieldsInfoRes = response.result;
      }
    });
  }

  private findInstituteInfo() {
    this.instituteService.getInstituteInfo(this.oauthService.getUser().idCompany).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.instituteInfoRes = response.result;
      }
    });
  }

}
