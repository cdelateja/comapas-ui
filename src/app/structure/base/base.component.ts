import {Component, OnInit} from '@angular/core';
import {faKeyboard} from "@fortawesome/free-solid-svg-icons/faKeyboard";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faObjectGroup} from "@fortawesome/free-solid-svg-icons/faObjectGroup";
import {faToolbox} from "@fortawesome/free-solid-svg-icons/faToolbox";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faSchool} from "@fortawesome/free-solid-svg-icons/faSchool";
import {Company} from "../../dto/class.definition";
import {Subscription} from "rxjs";
import {CompanyService} from "../../services/company.service";
import {ClientService, Response} from "../../../../../angular-lib/dist/cdelateja";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public faHome = faHome;
  public faSchool = faSchool;

  public faUserShield = faUserShield;
  public faUser = faUsers;
  public faKeyboard = faKeyboard;
  public faObjectGroup = faObjectGroup;
  public faToolbox = faToolbox;


  public company: Company = new Company();
  private subscriptions: Subscription[] = [];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.findCompany();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private findCompany() {
    this.subscriptions.push(
      this.companyService.findByUser().subscribe((response: Response) => {
        if (ClientService.validateData(response)) {
          this.company = response.result;
        }
      })
    );
  }

}
