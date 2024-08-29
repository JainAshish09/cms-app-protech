export type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'url'
  | 'tel'
  | 'color'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'textarea'
  | 'file'
  | 'dropdown';

export interface FormField {
  name: string;
  label: string;
  type: InputType;
  dropdown_values: Dropdown_values[];
}

export interface FormRow {
  row_name: string;
  row: FormField[];
}

export interface FormConfig {
  title: string;
  content: any;
  fields: FormRow[];
  privacy: string;
}

export interface Dropdown_values {
  label: string;
  value: string;
}
