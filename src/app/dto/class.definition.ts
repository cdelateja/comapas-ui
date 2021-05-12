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
  public idRole: number;
}

export class UserReq {
  public id: number = 0;
  public username = '';
  public password = '';
  public email = '';
  public role: Role = null;
  public idRole: number;
}

export class IdReq {
  public id: number;
}

export class Role {
  public idRole: number = 0;
  public name = '';
  public codeName = '';
  public active: Boolean;
}

export class Field {
  public idField: number = 0;
  public name = '';
  public label = '';
  public type = '';
  public value = '';
  public caption = '';
  public catalog = '';
  public evidence = true;
  public score = 0;
}

export class FieldReq {
  public idField: number = 0;
  public name = '';
  public label = '';
  public type = '';
  public value = '';
  public caption = '';
  public catalog = '';
  public evidence = true;
  public score = 0;
}
