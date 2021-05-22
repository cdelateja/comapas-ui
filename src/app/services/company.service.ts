import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from "cdelateja";
import {Observable} from "rxjs";
import {CompanyReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/company';
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll');
  }

  public findExternals(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/externals');
  }

  public findInner(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/inner', {bufferSize: 1});
  }

  public findByName(name: string): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/find?name=' + name, {bufferSize: 1});
  }

  public save(req: CompanyReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }
}
