import {Injectable} from '@angular/core';
import {ConfigService, OauthService} from 'cdelateja';
import {Observable, Subject} from "rxjs";
import {User, UserReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL: string;
  private openModal = new Subject<User>();
  private refreshList = new Subject<User>();

  constructor(private oauthService: OauthService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/user';
  }

  public openModalObs(): Observable<User> {
    return this.openModal.asObservable();
  }

  public sendOpenModal(user: User) {
    this.openModal.next(user);
  }

  public refreshListObs(): Observable<User> {
    return this.refreshList.asObservable();
  }

  public sendRefreshList(user: User) {
    this.refreshList.next(user);
  }

  public findAll(): Observable<any> {
    return this.oauthService.withToken().get(this.URL + '/findAll');
  }

  public save(req: UserReq): Observable<any> {
    return this.oauthService.withToken().post(this.URL + '/save', req);
  }


}
