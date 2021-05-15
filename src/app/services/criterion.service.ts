import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from "../../../../angular-lib/dist/cdelateja";
import {Observable} from "rxjs";
import {CriterionFieldReq, CriterionReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/criterion';
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll');
  }

  public saveCriterion(req: CriterionReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }

  public addFields(req: CriterionFieldReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/addFields', req);
  }
}
