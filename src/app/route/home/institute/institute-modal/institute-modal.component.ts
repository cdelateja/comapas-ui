import {Component, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from "cdelateja";
import {Company, CompanyReq} from "../../../../dto/class.definition";
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../../services/company.service";
import {ObservableService} from "../../../../services/observable.service";

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


  constructor(private companyService: CompanyService,
              private observableService: ObservableService,
              protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.observableService.obsOpenModalCompany().subscribe((company: Company) => {
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
  }

  public save() {
    if (this.validateForm()) {
      const req: CompanyReq = this.formGroup.getRawValue();
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
