import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Feature, Section1 } from '../models/dashboard';
import { title } from 'process';

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
  const section1Content: Section1 = {
    title: data.title || '',
    content: data.content || '',
    images: data.images || []
  };
  return section1Content;
}