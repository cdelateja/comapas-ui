import {Injectable} from '@angular/core';
import {ClientService, ConfigService} from 'cdelateja';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly URL: string;

  constructor(private clientService: ClientService,
              private configService: ConfigService) {
    this.URL = configService.get('servers.comapasWs.url') + '/file';
  }

  public uploadFile(formData: FormData): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .upload(this.URL + '/uploadFieldFile', formData)
      .execute();
  }

  public find(idInstitute: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .get(this.URL + '/find?idInstitute=' + idInstitute)
      .execute();
  }

  public findFieldFile(idInstitute: number, idField: number): Observable<any> {
    return this.clientService
      .create()
      .withToken()
      .asResponseBlob()
      .get(this.URL + `/fieldFile?idInstitute=${idInstitute}&idField=${idField}`)
      .execute();
  }
}
