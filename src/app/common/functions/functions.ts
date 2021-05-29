import {
  Config,
  ConfigReq,
  Criterion,
  CriterionField,
  DynamicField,
  Field, FieldFile,
  FormConfig,
  FormFieldConfig, Institute, InstituteField
} from "../../dto/class.definition";

export function toConfig(req: ConfigReq): Config {
  const config: Config = new Config();
  config.idFormConfig = req.idFormConfig;
  config.name = req.name;
  config.json = JSON.parse(req.json);
  return config;
}

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

export function toDynamicFields(config: Config, criterion: Criterion): DynamicField[] {
  let fields: DynamicField[] = [];
  if (config) {
    const formConfig: FormConfig = config.json.find((f: FormConfig) => f.idCriterion === criterion.idCriterion);
    if (formConfig) {
      fields = fieldsByConfig(formConfig, criterion)
    } else {
      criterion.fields.forEach(f => {
        const dynamicField: DynamicField = toDynamicField(f.field);
        fields.push(dynamicField);
      });
    }
  }
  return fields;
}

export function fieldsByConfig(formConfig: FormConfig, criterion: Criterion): DynamicField[] {
  const fields: DynamicField[] = [];
  formConfig.fields.forEach((fC: FormFieldConfig) => {
    const criterionField: CriterionField = criterion.fields.find((field: CriterionField) =>
      field.idField === fC.idField);
    if (criterionField) {
      fields.push(toDynamicField(criterionField.field));
    }
  });
  criterion.fields.forEach((f: CriterionField) => {
    const field = fields.find((d: DynamicField) => d.idField === f.idField);
    if (!field) {
      fields.push(toDynamicField(f.field));
    }
  });
  return fields
}

export function setFieldsValue(fields: DynamicField[], institute: Institute): void {
  fields.forEach((field: DynamicField) => {
    const instituteField: InstituteField = institute.fields.find((f: InstituteField) => f.idField === field.idField);
    const fileField: FieldFile = institute.files.find((f: FieldFile) => f.idField === field.idField);
    field.value = valueByType(field.type, instituteField.value);
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
