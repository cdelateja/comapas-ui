import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from 'cdelateja';
import {Observable} from "rxjs";
import {TestReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/institute';
  }

  public find(idInstitute: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/find?idInstitute=' + idInstitute)
      .execute()
      .pipe(first());
  }

  public saveTest(req: TestReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/test', req)
      .execute()
      .pipe(first());
  }

  public getFieldsInfo(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/institutesInfo')
      .execute()
      .pipe(first());
  }

  public getInstituteInfo(idInstitute: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/instituteInfo?idInstitute=' + idInstitute)
      .execute()
      .pipe(first());
  }
}
