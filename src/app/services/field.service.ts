import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from "cdelateja";
import {Observable} from "rxjs";
import {FieldReq, PositionReq} from "../dto/class.definition";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/field';
  }

  public findAll(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/findAll')
      .execute()
      .pipe(first());
  }

  public getTypes(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .setOptions({bufferSize: 1})
      .get(this.URL + '/types')
      .execute()
      .pipe(first());
  }

  public saveField(req: FieldReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/save', req)
      .execute()
      .pipe(first());
  }

  public getFieldsInfo(): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/fieldsInfo')
      .execute()
      .pipe(first());
  }

  public position(req: PositionReq): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .post(this.URL + '/position', req)
      .execute()
      .pipe(first());
  }
}
