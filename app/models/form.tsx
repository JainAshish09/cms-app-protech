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
  | 'file';

export interface FormField {
  name: string;
  label: string;
  type: InputType;
}

export interface FormRow {
  rows: string;
  row: FormField[];
}

export interface FormConfig {
  title: string;
  fields: FormRow[];
}
