import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from 'cdelateja';
import {Observable} from 'rxjs';
import {ConfigReq} from '../dto/class.definition';
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/config';
  }

  public findByName(name: string): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/find?name=' + name)
      .execute()
      .pipe(first());
  }

  public save(req: ConfigReq): Observable<any> {
    return this.clientService
      .create()
      .withToken().post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }
}
