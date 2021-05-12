import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from 'cdelateja';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/role';
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll', {bufferSize: 1});
  }

}
