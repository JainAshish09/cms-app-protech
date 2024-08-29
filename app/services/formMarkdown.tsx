import matter from 'gray-matter';
import { FormConfig } from '../models/form';
import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';
import breaks from 'remark-breaks';

async function parseMarkdown(): Promise<[FormConfig, string]> {
  const fileContent = fs.readFileSync("app/content/forms/demoForm.md", 'utf8');
  const { data } = matter(fileContent);
  const datalist = data as FormConfig;
  const content = (await remark().use(breaks).use(html).process(datalist.content)).toString();
  return [
    datalist, content
  ];

}

export async function getFormContent() {
  return await parseMarkdown();
}