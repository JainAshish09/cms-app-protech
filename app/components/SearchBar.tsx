"use client";

import Link from 'next/link';
import { useState, useRef, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { generateSlug } from '../blog/utils/generateSlug';
import { BlogEntry } from '../models/blogs';

interface SearchBarProps {
  blogPosts: BlogEntry[];
}

export default function SearchBar({ blogPosts }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setDropdownVisible(event.target.value.length > 0);
  };

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setDropdownVisible(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    // Timeout is used to ensure dropdown closes only after the click event has been handled
    setTimeout(() => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.relatedTarget as Node) &&
        !searchInputRef.current?.contains(event.relatedTarget as Node)
      ) {
        setDropdownVisible(false);
      }
    }, 100);
  };

  // Safely filter blog posts, ensuring blogPosts is an array
  const filteredPosts = Array.isArray(blogPosts)
    ? blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div className="relative p-0 m-0 mr-[10%] flex justify-end items-center pt-3">
      <div
        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-2 transition-transform transform hover:scale-105 hover:shadow-xl"
        onBlur={handleBlur}
        tabIndex={0} // To ensure onBlur fires when clicking outside
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          className="border-none outline-none w-full text-gray-700 placeholder-gray-500 pl-2 focus:ring-0"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
        />
        <img
          src="/icons/search.svg"
          alt="Search"
          className="w-5 h-5 text-gray-500 ml-2"
        />
      </div>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full"
          style={{ top: '100%', left: 0 }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link key={post.title} href={`/blog/${generateSlug(post.title)}`}>
                <div className="border-b border-gray-200 py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-gray-600">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 p-2">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}