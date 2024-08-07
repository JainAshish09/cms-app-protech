'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
  label: string;
  href: string;
}

interface CenteredTextImageProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const MainContainer: React.FC<CenteredTextImageProps> = ({ title, breadcrumbs }) => {
  const pathname = usePathname() 
  return (
    <div className="relative w-full h-[380px]">
      <Image src="/images/header.png" alt="ASSA ABLOY" width={1920} height={578} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
        <h1 className="text-white text-[46px] font-[700] leading-[57.51px] mb-2">{title}</h1>
        <div className="text-white font-[500] text[22px] leading-[26.4px]">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              <Link href={breadcrumb.href} className={`link ${pathname === breadcrumb.href ? 'active' : ''}`}>
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && ' / '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

