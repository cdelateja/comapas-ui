import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {CompanyReq} from "../dto/class.definition";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.oauth.url') + '/company';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findAll').execute();
  }

  public findExternals(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/externals')
      .execute();
  }

  public findInner(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/inner')
      .execute();
  }

  public findByUser(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findByUser')
      .execute();
  }

  public findByName(name: string): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/find?name=' + name)
      .execute();
  }

  public findById(id: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findById?id=' + id)
      .execute();
  }

  public save(req: CompanyReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute();
  }
}
