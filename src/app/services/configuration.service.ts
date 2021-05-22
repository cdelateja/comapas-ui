import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from 'cdelateja';
import {Observable} from 'rxjs';
import {ConfigReq} from '../dto/class.definition';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/config';
  }

  public findByName(name: string): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/find?name=' + name, {bufferSize: 1});
  }

  public save(req: ConfigReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }
}
