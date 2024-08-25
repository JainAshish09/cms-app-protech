import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Feature } from '../models/dashboard';

export async function getExtractModel<T>(filename: string) {
  const filePath = path.join(process.cwd(), 'app/content', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const dataList = (data as { DashboardFeature: Feature[] });

  return dataList;
}
