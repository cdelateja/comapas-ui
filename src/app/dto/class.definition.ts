import {FieldConfig} from 'cdelateja';

export class DynamicField implements FieldConfig {
  public label: string;
  public placeHolder: string;
  public formControlName: string;
  public collections: any;
  public validations: string[];
  public type: string;
  public value: any;
  public itemCaption: string;
  public eqVal: string;
  public catalog: string;
  public score = 0;
  public required = false;
  public evidence = false;
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
  public idField: number = null;
  public name = '';
  public label = '';
  public type = null;
  public catalog = '';
  public evidence = false;
  public required = false;
  public score = 0;
}

export class FieldReq {
  public idField: number = null;
  public name = '';
  public label = '';
  public type = null;
  public catalog = null;
  public evidence = false;
  public required = false;
  public score = 0;
}

export class Criterion {
  public idCriterion: number = null;
  public name = '';
  public code = '';
  public fields: CriterionField[] = [];
}

export class CriterionField {
  public idCriterion: number = null;
  public idField: number = null;
  public field: Field = null;
}

export class CriterionReq {
  public idCriterion: number = null;
  public name = '';
}

export class CriterionFieldReq {
  public idCriterion: number = null;
  public fields: number[] = [];
}

export class SelectField extends Field {
  public select = false;
}

export class SelectCriterion extends Criterion {
  public select = false;
}
