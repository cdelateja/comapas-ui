import {EventEmitter, Injectable} from '@angular/core';
import {Company, CompanyRes, FieldFile} from "../dto/class.definition";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private refreshCompany: EventEmitter<CompanyRes> = new EventEmitter();
  private openCompanyModal: EventEmitter<Company> = new EventEmitter();
  private viewFileModal: EventEmitter<FieldFile> = new EventEmitter();

  constructor() {
  }

  public nextRefreshCompany(company: CompanyRes): void {
    this.refreshCompany.next(company);
  }

  public obsRefreshCompany(): Observable<CompanyRes> {
    return this.refreshCompany.asObservable();
  }

  public nextOpenModalCompany(company: Company): void {
    this.openCompanyModal.next(company);
  }

  public obsOpenModalCompany(): Observable<Company> {
    return this.openCompanyModal.asObservable();
  }

  public nextOpenModalViewFile(company: FieldFile): void {
    this.viewFileModal.next(company);
  }

  public obsOpenModalViewFile(): Observable<FieldFile> {
    return this.viewFileModal.asObservable();
  }
}
