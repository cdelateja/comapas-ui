import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {CriterionFieldReq, CriterionReq} from "../dto/class.definition";

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
      .execute();
  }

  public saveCriterion(req: CriterionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute();
  }

  public addFields(req: CriterionFieldReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/addFields', req)
      .execute();
  }
}
