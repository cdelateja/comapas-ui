import {EventEmitter, Injectable} from '@angular/core';
import {Category, Company, CompanyReq, CompanyRes, Criterion, FieldFile} from "../dto/class.definition";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private refreshCompany: EventEmitter<CompanyRes> = new EventEmitter();
  private openCompanyModal: EventEmitter<CompanyReq> = new EventEmitter();
  private viewFileModal: EventEmitter<FieldFile> = new EventEmitter();
  private openCriterionModal: EventEmitter<Category> = new EventEmitter();

  constructor() {
  }

  public nextRefreshCompany(company: CompanyRes): void {
    this.refreshCompany.next(company);
  }

  public obsRefreshCompany(): Observable<CompanyRes> {
    return this.refreshCompany.asObservable();
  }

  public nextOpenModalCompany(company: CompanyReq): void {
    this.openCompanyModal.next(company);
  }

  public obsOpenModalCompany(): Observable<CompanyReq> {
    return this.openCompanyModal.asObservable();
  }

  public nextOpenModalViewFile(company: FieldFile): void {
    this.viewFileModal.next(company);
  }

  public obsOpenModalViewFile(): Observable<FieldFile> {
    return this.viewFileModal.asObservable();
  }

  public nextOpenModalCriterion(category: Category): void {
    this.openCriterionModal.next(category);
  }

  public obsOpenModalCriterion(): Observable<Category> {
    return this.openCriterionModal.asObservable();
  }
}
