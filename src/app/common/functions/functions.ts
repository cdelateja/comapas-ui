import {
  Criterion, CriterionField,
  DynamicField,
  Field,
  FieldFile,
  Institute,
  InstituteField,
  PositionReq
} from "../../dto/class.definition";

export function toDynamicField(field: Field): DynamicField {
  const dynamicField: DynamicField = new DynamicField();
  dynamicField.catalog = field.catalog;
  dynamicField.score = field.score;
  dynamicField.evidence = field.evidence;
  dynamicField.required = field.required;
  dynamicField.label = field.label;
  dynamicField.formControlName = field.name;
  dynamicField.type = field.type;
  dynamicField.idField = field.idField;
  if (field.required) {
    dynamicField.validations = validationByType(field.type);
  }
  return dynamicField;
}

export function toDynamicFields(criterion: Criterion): DynamicField[] {
  let fields: DynamicField[] = [];
  criterion.fields.sort((a: CriterionField, b: CriterionField) => a.position - b.position)
  criterion.fields.forEach(f => {
    const dynamicField: DynamicField = toDynamicField(f.field);
    fields.push(dynamicField);
  });
  return fields;
}

export function setFieldsValue(fields: DynamicField[], institute: Institute): void {
  fields.forEach((field: DynamicField) => {
    const instituteField: InstituteField = institute.fields.find((f: InstituteField) => f.idField === field.idField);
    const fileField: FieldFile = institute.files.find((f: FieldFile) => f.idField === field.idField);
    if (instituteField) field.value = valueByType(field.type, instituteField.value);
    field.file = fileField;
  });

}

export function valueByType(type: string, valor: string): any {
  switch (type) {
    case 'date':
      return valor ? toStringDate(new Date(valor)) : null;
    case 'checkbox':
      return valor === 'true';
    case 'number':
    case 'decimal':
    case 'percentage':
      return valor ? Number(valor) : null;
    case 'select':
      return valor;
    default:
      return valor ? valor : '';
  }
}

function validationByType(type: string): any {
  switch (type) {
    case 'date':
    case 'number':
    case 'decimal':
    case 'select':
    case 'percentage':
      return ['NotNull'];
    case 'checkbox':
      return [];
    default:
      return ['NotEmpty'];
  }
}

export function toStringDate(date: Date): string {
  return date.toISOString();
}

export function getPositionReq(date: any[], property: string): PositionReq {
  const request = new PositionReq();
  date.forEach(c => request.order.push(c[property]))
  return request;
}
