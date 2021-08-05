import {Component, Input, OnInit} from '@angular/core';
import {
  CompanyDetailAddressRes,
  CompanyDetailRes,
  CompanyRes,
  FieldsInfoRes,
  InstituteInfoRes
} from '../../../../dto/class.definition';
import {BaseComponent, ClientService, Response} from 'cdelateja';
import {InstituteService} from '../../../../services/institute.service';
import {CompanyService} from "../../../../services/company.service";

@Component({
  selector: 'app-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.scss']
})
export class InstituteDetailComponent extends BaseComponent {

  @Input()
  public companyRes: CompanyRes;
  @Input()
  public fieldsInfoRes: FieldsInfoRes;

  public companyDetail: CompanyDetailRes = new CompanyDetailRes();
  public address: CompanyDetailAddressRes = new CompanyDetailAddressRes();
  public instituteInfoRes: InstituteInfoRes = new InstituteInfoRes();

  constructor(private instituteService: InstituteService,
              private companyService: CompanyService) {
    super();
  }

  ngOnInit(): void {
    this.detail();
  }

  private findInstituteInfo(): void {
    this.instituteService.getInstituteInfo(this.companyRes.idCompany).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.instituteInfoRes = response.result;
      } else {
        this.instituteInfoRes = new InstituteInfoRes();
      }
    });
  }

  private detail(): void {
    this.companyService.detail(this.companyRes.idCompany).subscribe((response: Response) => {
      if (ClientService.validateData(response)) {
        this.companyDetail = response.result;
        if (this.companyDetail.addresses && this.companyDetail.addresses[0]) {
          this.address = this.companyDetail.addresses[0];
        }
        this.findInstituteInfo();
      }
    });
  }
}
