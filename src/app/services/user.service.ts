import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from 'cdelateja';
import {Observable} from 'rxjs';
import {IdReq, UserReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/user';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findAll')
      .execute()
      .pipe(first());
  }

  public save(req: UserReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }

  public changeStatus(req: IdReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/changeStatus', req)
      .execute()
      .pipe(first());
  }

  public findByIdCompany(idCompany: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/users?idCompany=' + idCompany)
      .execute()
      .pipe(first());
  }


}
