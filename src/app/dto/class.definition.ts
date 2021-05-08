import {FieldConfig} from 'cdelateja';

export class CampoConfig implements FieldConfig {
  public label: string;
  public placeHolder: string;
  public formControlName: string;
  public collections: any;
  public validations: string[];
  public type: string;
  public value: any;
  public itemCaption: string;
  public eqVal: string;
  public catAuxiliar: string;
  public catalogo: string;
  public porInstrumento = false;
  public orden: number = null;
  public campoReferencia: string;
  public campoEditable: CampoConfig;
  public campoRequerido: CampoConfig;
}


export class User {
  public id: number;
  public username = '';
  public password = '';
  public email = '';
  public secretKey = '';
  public ip = '';
  public active = true;
}

export class UserReq {
  public id: number = 0;
  public username = '';
  public password = '';
  public email = '';
}
