import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SectionRendererProps {
  section: any;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  switch (section.type) {
    case 'hero':
      return (
        <div className="flex flex-col items-center justify-center bg-[#D8F2F9] p-24 rounded-lg shadow-md pt-[140px]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h1>
          <p className="text-gray-600 text-center mb-6">{section.content}</p>
          <div className="flex gap-4 w-full max-w-4xl">
            {section.images?.map((img: any, i: number) => (
              <div key={i} className="relative w-full h-[280px] rounded-2xl">
                <Image src={`/${img.image}`} alt="imageAlt" layout='fill' objectFit='cover' className='rounded-3xl' />
              </div>
            ))}
          </div>
        </div>
      );
    case 'features':
      return (
        <div className="container mx-auto py-16">
          <h2 className="font-lato text-[32px] text-3xl font-bold text-center mb-8">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
            {section.features?.map((feature: any, i: number) => (
              <div key={i} className="font-lato text-[15px] flex flex-col items-center text-center p-4 border rounded-lg shadow-md">
                <Image src={`/${feature.icon}`} alt={feature.title} width={64} height={64} className="mb-4" />
                <p>{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'imageWithText':
      return (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 rounded-lg p-8 bg-white">
              <div className="w-full lg:w-auto lg:flex-shrink-0 max-w-[500px]">
                <Image src={`/${section.image}`} alt="TITAN Software" width={768} height={507} className="rounded-lg w-full h-auto" />
              </div>
              <div className="w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                {section.buttonText && (
                  <a href={section.buttonLink || '#'} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-5 inline-block">{section.buttonText}</a>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case 'promo':
      return (
        <div className="relative py-8" style={{ backgroundImage: 'url(/images/Promo-background.png)', backgroundSize: 'cover' }}>
          <div className="flex justify-center space-x-6">
            {section.promos?.map((data: any, key: number) => (
              <div key={key} className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row max-w-md md:max-w-2xl">
                <div className="relative w-full h-64" style={{ height: '330px' }}>
                  <Image src={`/${data.image}`} alt="Action Image" layout="fill" objectFit="cover" className="rounded-t-lg md:rounded-t-none md:rounded-l-lg" />
                </div>
                <div className="p-6 flex flex-col justify-between w-[150%]">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                    <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                  <div>
                    <Link href={data.link} className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{data.linkText}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SectionRenderer;
