import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { generateSlug } from '../blog/utils/generateSlug';
import { Image } from '@/app/models/blogs';

interface BlogPost {
  title: string;
  date: string;
  content: string;
  image: Image[];
}

export async function getBlogPosts() {
  const filePath = path.join(process.cwd(), 'app/content', 'blogs.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const blogPosts = (data as { blog: BlogPost[] }).blog;
  const htmlContent = await remark().use(html).process(content);
  const htmlString = htmlContent.toString();

  return { blogPosts, htmlString };
}

export async function getBlogPostBySlug(slug: string) {
  const { blogPosts } = await getBlogPosts();

  const blogPost = blogPosts.find(post => generateSlug(post.title) === slug);

  if (blogPost) {
    const htmlContent = await remark().use(html).process(blogPost.content);
    const inString = htmlContent.toString();
    const htmlString = inString.replace(/<\/p>/g, '</p><br>');
    return { ...blogPost, htmlString };
  }
  else {
    return null;
  }
}
