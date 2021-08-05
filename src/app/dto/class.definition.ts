import {Equals, FieldConfig, ifEquals} from 'cdelateja';

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
  public idField: number = null;
  public idCriterion: number = null;
  public file: FieldFile;
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
  public admin = false;
}

export class UserReq {
  public id: number = 0;
  public username = '';
  public password = '';
  public email = '';
  public role: Role = null;
  public idRole: number;
  public idCompany: number;
}

export class IdReq {
  public id: number;
}

export class Role extends Equals {
  public idRole: number = 0;
  public name = '';
  public codeName = '';
  public active: Boolean;

  equals(o2: any): boolean {
    return ifEquals('idRole', this, o2);
  }
}

export class Field extends Equals {
  public idField: number = null;
  public name = '';
  public label = '';
  public type = null;
  public catalog = '';
  public evidence = false;
  public required = false;
  public score = 0;
  public scoreValue = '';

  equals(o2: any): boolean {
    return ifEquals('idField', this, o2);
  }
}

export class FieldReq extends Equals {
  public idField: number = null;
  public name = '';
  public label = '';
  public type = null;
  public catalog = null;
  public evidence = false;
  public required = false;
  public score = 0;
  public scoreValue = '';

  equals(o2: any): boolean {
    return ifEquals('idField', this, o2);
  }
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
  public position: number = null;
}

export class Category {
  public idCategory: number = null;
  public name = '';
  public criterionList: Criterion[] = [];
}

export class CriterionReq {
  public idCriterion: number = null;
  public name = '';
}

export class CategoryReq {
  public idCategory: number = null;
  public name = '';
}

export class PositionReq {
  public order: number[] = [];
}

export class CriterionFieldReq {
  public idCriterion: number = null;
  public fields: number[] = [];
}

export class CategoryCriterionReq {
  public idCategory: number = null;
  public criterionList: number[] = [];
}

export class CriterionConfig extends Criterion {
  public dynamicFields: DynamicField[] = [];
}

export class ConfigReq {
  public idFormConfig: number = null;
  public name = '';
  public json = '';
}

export class Company {
  public idCompany: number = null;
  public name = '';
  public address: Address = new Address();
}

export class Address {
  public idAddress: number = null;
  public street = '';
  public city = '';
  public state = '';
  public zipCode = '';
}

export class CompanyReq {
  public idCompany: number = null;
  public name = '';
  public email = '';
  public address: AddressReq = null;
}

export class AddressReq {
  public idAddress: number = null;
  public street = '';
  public city = '';
  public state = '';
  public zipCode = '';
}

export class CompanyDetailRes {
  public idCompany: number = null;
  public name = '';
  public users: CompanyDetailUserRes[] = [];
  public addresses: CompanyDetailAddressRes[] = [];
}

export class CompanyDetailUserRes {
  public id: number;
  public username = '';
  public email = '';
  public admin = false;
}

export class CompanyDetailAddressRes {
  public idAddress: number = null;
  public street = '';
  public city = '';
  public state = '';
  public zipCode = '';
}

export class CompanyRes {
  public idCompany: number = null;
  public name = '';
  public users: CompanyUserRes[] = [];
  // For expand detail table purpose
  public show = false;
}

export class CompanyUserRes {
  public id: number;
  public username = '';
  public email = '';
  public admin = false;
}

export class TestReq {
  public idInstitute: number;
  public criterion: TestCriterionReq[] = [];
}

export class TestCriterionReq {
  public fields: TestFieldReq[] = [];
}

export class TestFieldReq {
  public name = '';
  public value = '';
}

export class Institute {
  public idInstitute: number;
  public fields: InstituteField[] = [];
  public files: FieldFile[] = [];
}

export class InstituteField {
  public idInstitute: number;
  public idField: number;
  public value: string;
}

export class FieldFile {
  public idInstitute: number;
  public idField: number;
  public filename: string;
  public contentType: string;
  public mbSize: number;
}

export class FieldsInfoRes {
  public totalScore: number;
  public totalFields: number;
}

export class InstituteInfoRes {
  public idInstitute: number;
  public totalScore: number = 0;
  public totalFields: number = 0;
}
