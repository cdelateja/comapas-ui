import {EventEmitter, Injectable} from '@angular/core';
import {Company} from "../dto/class.definition";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private refreshCompany: EventEmitter<Company> = new EventEmitter();
  private openCompanyModal: EventEmitter<Company> = new EventEmitter();

  constructor() {
  }

  public nextRefreshCompany(company: Company): void {
    this.refreshCompany.next(company);
  }

  public obsRefreshCompany(): Observable<Company> {
    return this.refreshCompany.asObservable();
  }

  public nextOpenModalCompany(company: Company): void {
    this.openCompanyModal.next(company);
  }

  public obsOpenModalCompany(): Observable<Company> {
    return this.openCompanyModal.asObservable();
  }
}
