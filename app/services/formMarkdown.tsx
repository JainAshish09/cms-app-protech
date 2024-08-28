import matter from 'gray-matter';
import { FormConfig } from '../models/form';
import fs from 'fs';
import path from 'path';

function parseMarkdown(): FormConfig {
  const fileContent = fs.readFileSync("app/content/forms/demoForm.md", 'utf8');
  const { data } = matter(fileContent);
  if (isFormConfig(data)) {
    return data as FormConfig;
  } else {
    throw new Error('Invalid form configuration');
  }
}

function isFormConfig(obj: any): obj is FormConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.fields) &&
    obj.fields.every((fieldGroup: any) =>
      typeof fieldGroup.rows === 'string' &&
      Array.isArray(fieldGroup.row) &&
      fieldGroup.row.every((field: any) =>
        typeof field.name === 'string' &&
        typeof field.label === 'string' &&
        typeof field.type === 'string' &&
        ['text', 'email', 'number', 'password', 'url', 'tel', 'color', 'date', 'time', 'datetime-local', 'month', 'week', 'textarea', 'file'].includes(field.type)
      )
    )
  );
}


export async function getFormContent() {
  return await parseMarkdown();
}