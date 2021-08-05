import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from "cdelateja";
import {Company, CompanyReq} from "../../../../dto/class.definition";
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../../services/company.service";
import {ObservableService} from "../../../../services/observable.service";
import {InstituteAddressModalComponent} from "./institute-address-modal/institute-address-modal.component";

declare var $: any;

@Component({
  selector: 'app-institute-modal',
  templateUrl: './institute-modal.component.html',
  styleUrls: ['./institute-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['name', 'email'])
  ],
  object: new CompanyReq()
})
export class InstituteModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.Institute.Modal';

  @ViewChild(InstituteAddressModalComponent)
  public addressModalComponent: InstituteAddressModalComponent;

  constructor(private companyService: CompanyService,
              private observableService: ObservableService,
              protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.observableService.obsOpenModalCompany().subscribe((company: CompanyReq) => {
        this.setCompany(company)
        this.toggle();
      }));
  }

  public close() {
    $('#instituteModal').modal('toggle');
  }

  private toggle() {
    $('#instituteModal').modal('toggle');
  }

  public setCompany(company: Company) {
    this.reset(company);
    this.addressModalComponent.setAddress(company.address);
  }

  public save() {
    const formValid = this.validateForm();
    const formAddressValid = this.addressModalComponent.validateForm();
    if (formValid && formAddressValid) {
      const req: CompanyReq = this.formGroup.getRawValue();
      req.address = this.addressModalComponent.save();
      this.subscriptions.push(
        this.companyService.save(req).subscribe((response: Response) => {
          if (ClientService.validateData(response)) {
            this.observableService.nextRefreshCompany(response.result);
            this.toggle();
          }
        }));
    }
  }

}
