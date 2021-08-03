import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "../../../../angular-lib/dist/cdelateja";
import {Observable} from "rxjs";
import {CategoryCriterionReq, CategoryReq, CriterionReq, PositionReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/category';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findAll')
      .execute();
  }

  public saveCategory(req: CategoryReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute();
  }

  public delete(idCategory: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .delete(this.URL + '/delete?idCategory=' + idCategory)
      .execute();
  }

  public position(req: PositionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/position', req)
      .execute();
  }

  public addCriterion(req: CategoryCriterionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/addCriterion', req)
      .execute();
  }
}
