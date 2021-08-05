import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {CompanyReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

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
      .get(this.URL + '/findAll')
      .execute()
      .pipe(first());
  }

  public findExternals(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/externals')
      .execute()
      .pipe(first());
  }

  public findInner(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/inner')
      .execute()
      .pipe(first());
  }

  public findByUser(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findByUser')
      .execute()
      .pipe(first());
  }

  public findByName(name: string): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/find?name=' + name)
      .execute()
      .pipe(first());
  }

  public findById(id: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findById?id=' + id)
      .execute()
      .pipe(first());
  }

  public save(req: CompanyReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }

  public detail(id: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/detail?id=' + id)
      .execute()
      .pipe(first());
  }
}
