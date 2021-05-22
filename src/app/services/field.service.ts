import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from "cdelateja";
import {Observable} from "rxjs";
import {FieldReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/field';
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll');
  }

  public getTypes(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/types', {bufferSize: 1});
  }

  public saveField(req: FieldReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }
}
