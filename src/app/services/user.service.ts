import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from 'cdelateja';
import {Observable, Subject} from 'rxjs';
import {IdReq, User, UserReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL: string;

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/user';
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll');
  }

  public save(req: UserReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }

  public changeStatus(req: IdReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/changeStatus', req);
  }


}
