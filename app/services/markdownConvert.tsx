import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Feature, Section } from '../models/dashboard';
import { remark } from 'remark';
import html from 'remark-html';
import breaks from 'remark-breaks';



export async function getExtractModel<T>(filename: string) {
  const filePath = path.join(process.cwd(), 'app/content', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const dataList = (data as { DashboardFeature: Feature[] });

  return dataList;
}

export async function getSection1Content<T>(filename: string) {
  const filePath = path.join(process.cwd(), 'app/content', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const section1Content: Section = {
    title: data.title || '',
    content: data.content || '',
    images: data.images || []
  };
  return section1Content;
}

export async function getSection3Content(filename: string) {
  const filePath = path.join(process.cwd(), 'app/content', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const contentHtml = (await remark().use(breaks).use(html).process(data.content)).toString();
  const manualBreaks = contentHtml.replace(/<\/p>/g, '</p><br>');

  const section1Content = {
    title: data.title || '',
    content: manualBreaks,
    image: data.image || []
  };

  return section1Content;
}