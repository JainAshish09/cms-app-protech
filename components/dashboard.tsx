import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Feature, Features } from '@/app/models/dashboard';
import { getExtractModel, getSection1Content } from '@/app/services/markdownConvert';

async function getFeatures() {
  return await getExtractModel('dashboard/dashboardFeatures.md');

}
async function section1Content() {
  return await getSection1Content('dashboard/section1.md');
}

const PromoSection: React.FC = () => {
  return (
    <div className="relative py-8" style={{ backgroundImage: 'url(/images/Promo-background.png)', backgroundSize: 'cover' }}>
      <div className="flex justify-center space-x-6">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row max-w-md md:max-w-2xl">
          <div className="relative w-full h-64" style={{ height: '330px' }}>
            <Image
              src="/images/protech-in-action.png"
              alt="Action Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">See PRO-TECH in action</h2>
              <p className="text-gray-700 mb-4">
                Learn how PRO-TECH can accelerate productivity and improve project accuracy by automating many time-consuming tasks. Schedule a software demonstration to see the advanced PRO-TECH features that will help take your business to the next level.
              </p>
            </div>
            <div>
              <Link href="/demo" className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Request a demo
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row max-w-md md:max-w-2xl">
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src="/images/training-sessions.png"
              alt="Training Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need help utilizing PRO-TECH to its full potential?</h2>
              <p className="text-gray-700 mb-4">
                Training sessions are available to assist you in getting the most out of the software. Our team of experts is happy to help!
              </p>
            </div>
            <div>
              <Link href="#" className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Further information on training
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC = async () => {

  const features = await getFeatures();
  const section1content = await section1Content();
  console.log(section1content.images[0].image);



  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#D8F2F9] p-24 rounded-lg shadow-md pt-[140px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {section1content.title}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {section1content.content}
        </p>
        {section1content?.images?.map((image, index) => (
          <div key={index} className="relative w-full h-[280px] rounded-2xl max-w-4xl">
            <Image
              src={`/${image.image}`}
              alt="imageAlt"
              layout='fill'
              objectFit='cover'
              className='rounded-3xl'

            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center py-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-1"></div>
              <div className="w-4 h-4 bg-blue-200 rounded-full mx-1"></div>
              <div className="w-4 h-4 bg-blue-200 rounded-full mx-1"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="container mx-auto py-16">
        <h2 className="font-lato text-[32px] text-3xl font-bold text-center mb-8">Robust Features Save Your Time and Money</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
          {features?.DashboardFeature.map((feature, index) => (
            <div key={index} className="font-lato text-[15px] flex flex-col items-center text-center p-4 border rounded-lg shadow-md">
              <Image
                src={`/${feature.icon}`}
                alt={feature.title} width={64} height={64} className="mb-4" />
              <p>{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 border rounded-lg shadow-md bg-white">
        <div className="lg:w-1/2 ml-[146px]">
          <Image
            src="/images/project-management-tool.png" // Make sure to put your image in the public/images directory
            alt="TITAN Software"
            width={768}
            height={507}
            className="rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4">Powerful project management tool made for the door and hardware industry</h2>
          <p className="mb-4">
            Managing the door openings on projects large and small can be a time-consuming and complex task for
            contract hardware distributors. Simplify the process and bring greater efficiency to your business with
            PRO-TECH software.
          </p>
          <p className="mb-4">
            Offered as on-premises software or cloud-based with PRO-TECH V8®, or exclusively on the cloud as PRO-TECH TITAN®.
            Help for your most time-consuming tasks is here!
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Simplified project detailing with advanced features</li>
            <li>Default and custom price books for hardware and material</li>
          </ul>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Check out the latest versions of PRO-TECH TITAN®
          </button>
        </div>
      </div>
      <PromoSection />
    </div >
  );
};

export default Dashboard;

