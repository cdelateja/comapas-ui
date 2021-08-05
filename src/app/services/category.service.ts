import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {CategoryCriterionReq, CategoryReq, CriterionReq, PositionReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

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
      .execute()
      .pipe(first());
  }

  public saveCategory(req: CategoryReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }

  public delete(idCategory: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .delete(this.URL + '/delete?idCategory=' + idCategory)
      .execute()
      .pipe(first());
  }

  public position(req: PositionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/position', req)
      .execute()
      .pipe(first());
  }

  public addCriterion(req: CategoryCriterionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/addCriterion', req)
      .execute()
      .pipe(first());
  }
}
