import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from 'cdelateja';
import {Observable} from "rxjs";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/role';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .setOptions({bufferSize: 1})
      .get(this.URL + '/findAll')
      .execute()
      .pipe(first());
  }

}
