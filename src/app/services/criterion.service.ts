import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {CriterionFieldReq, CriterionReq, IdReq, PositionReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/criterion';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findAll')
      .execute()
      .pipe(first());
  }

  public saveCriterion(req: CriterionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }

  public addFields(req: CriterionFieldReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/addFields', req)
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

  public removeCategory(req: IdReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/removeCategory', req)
      .execute()
      .pipe(first());
  }

}
