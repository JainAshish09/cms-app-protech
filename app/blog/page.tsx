import Link from 'next/link';
import MainContainer from '../features/main-container';
import { getBlogPosts } from '../services/blogMarkdown';
import React from 'react';
import { generateSlug } from './utils/generateSlug';
import SearchBar from '../components/SearchBar';

const DEFAULT_IMAGE_URL = '/images/default-blog-img.jpg';

export default async function Page() {
  const title = "PRO-TECH TITAN® Blogs";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blog' },
  ];

  const { blogPosts } = await getBlogPosts();

  return (
    <div className='min-h-screen bg-gray-100 pb-6'>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
      <SearchBar blogPosts={blogPosts || []} />
      <div className='flex justify-center mt-10'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-[80%] px-4 sm:px-6 lg:px-8'>
          {(blogPosts || []).map((post) => (
            <Link key={generateSlug(post.title)} href={`/blog/${generateSlug(post.title)}`} className='bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col xl:h-[400px] sm:h-[300px] md:h-[350px] transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-blue-300'>
              <div className='flex-shrink-0 h-[65%]'>
                <img
                  src={(post.image && post.image.length > 0) ? post.image[0].image : DEFAULT_IMAGE_URL}
                  alt={post.image && post.image.length > 0 ? 'error fetching image' : 'Default image'}
                  className='w-full h-[95%] object-cover'
                />
              </div>
              <div className='flex-shrink-0 h-[20%] flex items-center justify-center bg-gray-50 p-4'>
                <h2 className='text-lg font-semibold text-gray-900'>{post.title || 'Untitled'}</h2>
              </div>
              <div className='flex-shrink-0 h-[15%] flex items-center justify-start p-4'>
                <p className='text-sm text-gray-600 font-medium'>{post.date ? new Date(post.date).toLocaleString() : 'Date not available'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
