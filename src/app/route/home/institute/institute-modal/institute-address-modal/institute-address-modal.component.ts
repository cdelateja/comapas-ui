import {Component, OnInit} from '@angular/core';
import {AbstractValidator, ClientService, FormValidator, NotEmpty, Response} from "cdelateja";
import {TranslateService} from "@ngx-translate/core";
import {Address, AddressReq, Company, CompanyReq} from "../../../../../dto/class.definition";

@Component({
  selector: 'app-institute-address-modal',
  templateUrl: './institute-address-modal.component.html',
  styleUrls: ['./institute-address-modal.component.scss']
})
@FormValidator({
  formId: '',
  validators: [
    NotEmpty.generate(['street', 'city', 'state', 'zipCode'])
  ],
  object: new AddressReq()
})
export class InstituteAddressModalComponent extends AbstractValidator implements OnInit {

  public PREFIX = 'Components.Structure.Institute.Modal.Address';


  constructor(protected translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
  }

  public setAddress(address: Address) {
    this.reset(address);
  }

  public save(): AddressReq {
    if (this.validateForm()) {
      return this.formGroup.getRawValue();
    }
    return null;
  }


}
