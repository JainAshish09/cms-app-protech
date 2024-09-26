import Image from "next/image";
import MainContainer from "../features/main-container";
import { Property } from "../models/products";
import Link from "next/link";

export default function products() {

  const title = "PRO-TECH®: developed for maximum efficiency";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  const properties = [
    { name: 'Cloud-based platform', product1: 'optional', product2: '*' },
    { name: 'Import door schedules, hardware, projects, Excel and Openings Studio data', product1: '*', product2: '*' },
    { name: 'Real-time product updates', product1: '*', product2: '*' },
    { name: 'Advanced security protection and encryption with AWS', product1: '', product2: '*' },
    { name: 'Interactive drawing elevation tool', product1: '*', product2: '*' },
    { name: 'Real-time price books with product data, list prices and images', product1: '', product2: '*' },
    { name: 'Allows third-party accounting software integration', product1: '*', product2: '*' },
    { name: 'Reporting', product1: '*', product2: '*' },
    { name: 'Price books with custom price books', product1: '*', product2: '*' },
    { name: 'Advanced change management', product1: '', product2: '*' },
    { name: 'Automatic backup feature', product1: '*', product2: '*' },
    { name: 'Built-in knowledge base', product1: '*', product2: '*' },
    { name: 'Error checking', product1: '*', product2: '' },
    { name: 'On-premises installation', product1: '*', product2: '' },
    { name: 'RFIs/questions', product1: '*', product2: '*' },
  ];




  return <div>
    <div>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
    </div>
    <div className="container mx-auto">
      <div className="mt-10 mx-3 flex flex-wrap w-full p-16">
        <div className="xl:w-[60%] w-full mb-4 lg:mb-0">
          <p className="text-[20px] font-[500] tracking-widest">
            PRO-TECH is a time- and money-saving project management software that simplifies virtually every aspect of door and architectural hardware distributor operations.<br />

            Quickly and easily create submittals, estimates, quote templates and more. Increase the efficiency of your business operations by automating numerous tasks and procedures.<br />

            The PRO-TECH advantage includes:<br />

            Simplified project detailing with advanced features
            Default and custom price books for hardware and material
            Easily generate door, frame and hardware estimates and schedules
            Seamless integrations with accounting systems
            Quickly and accurately draw elevations
          </p>
        </div>
        <div className="relative xl:w-[40%] w-full h-full">
          <Image
            src="/images/products_img1.jpeg"
            alt="Action Image"
            layout="responsive"
            width={800}
            height={800}
            objectFit="cover"
            className="rounded-xl h-full"
          />
        </div>
      </div>

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <h1 className="font-bold mx-5 mb-5">Compare versions</h1>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left uppercase tracking-wider w-1/2">Properties</th>
              <th className="px-6 py-3 uppercase tracking-wider text-center">V8</th>
              <th className="px-6 py-3 uppercase tracking-wider text-center">TITAN</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">{property.product1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">{property.product2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" mx-3  w-full p-16">
        <h1>Choose the PRO-TECH version that best fits your business needs!</h1>
        <div className="flex ">
          <Link
            href="/about"
            className="mt-6 text-white hover:bg-[#404a52] bg-[#45637a] py-3 px-6 rounded-md mr-20"
          >
            PRO-TECH TITAN®
          </Link>
          <Link
            href="/about"
            className="mt-6 text-white hover:bg-[#404a52] bg-[#45637a] py-3 px-6 rounded-md"
          >
            PRO-TECH TITAN®
          </Link>
        </div>
      </div>

    </div>
  </div>
}
