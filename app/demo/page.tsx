'use client'
import { useState } from "react";
import MainContainer from "../features/main-container";
import Link from "next/link";

export default function Demo() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    postalCode: '',
    country: '',
    question: '',
    privacyPolicy: false
  });


  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      postalCode: '',
      country: '',
      question: '',
      privacyPolicy: false
    });
  };

  const title = "Request a PRO-TECH TITAN® Demo";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Request a Demo', href: '/demo' },
  ];

  return (
    <div>
      <div>
        <MainContainer title={title} breadcrumbs={breadcrumbs} />
      </div>
      <div className="relative h-300 bg-white">
        <div className="absolute top-0 right-0 w-44 h-40 opacity-100  origin-top-right bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/demoFormBackground1.png")' }}>
        </div>
        <div className="absolute top-40 left-0 right-0 bottom-0 bg-cover bg-center w-full h-[710px]"
          style={{ backgroundImage: 'url("/images/demoFormBackground.png")' }}>
        </div>
        <div className="relative z-10 p-8">
          <div className="relative w-[994px] h-[793px] top-[20px] mx-auto mb-8">
            <div>
              <p className="font-lato text-[22px] font-medium leading-[27.5px] text-left h-[28px] w-[521px]">We are Here To Provide 24x7 Support</p>
              <p className="w-[931px] h-[54px] font-lato text-[14px] font-normal leading-[27px] text-left">Schedule a live demo with one of our PRO-TECH TITAN® product specialists. We can answer questions and show you the advanced features that will simplify many labor-intensive tasks and bring greater efficiency to your business.</p>
              <p className="w-[931px] h-[27px] font-lato text-[14px] font-normal leading-[27px] text-left">Please complete the form or give us a call at 800-344-7269.</p>
            </div>
            <div className="w-[994px] h-[645px] border-solid border-[1px] border-[#D8E5EF] rounded-3xl mt-4">
              <div className="w-[929.15px] h-[581px] m-8">
                <form onSubmit={handleSubmit}>
                  <div className="w-[929.15px] h-[50.36px]">
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleChange} required />
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="w-[929.15px] h-[50.36px] mt-7">
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="email" name="email" placeholder="E-mail*" value={formData.email} onChange={handleChange} required />
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="tel" name="phone" placeholder="Phone number*" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="w-[929.15px] h-[50.36px] mt-7">
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="text" name="companyName" placeholder="Company Name*" value={formData.companyName} onChange={handleChange} required />
                    <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="postalCode" placeholder="Postal Code*" value={formData.postalCode} onChange={handleChange} required />
                  </div>
                  <div className="w-[929.15px] h-[50.36px] mt-7">
                    <input className="w-[929px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="country" placeholder="Country*" value={formData.country} onChange={handleChange} required />
                  </div>
                  <div className="w-[929.15px] h-[160px] mt-7">
                    <textarea className="w-[929px] h-[160px] rounded-lg p-4 border-[1px] border-[#C8C8C8] bg-[#FFFFFF] placeholder:w-[200px] placeholder:h-[21px] placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[27px]  placeholder:text-left" name="question" placeholder="Ask a Question*" value={formData.question} onChange={handleChange} required />
                  </div>
                  <div className=" w-[308px] h-[22px] mt-2 rounded">
                    <input className="w-[22px] h-[22px] rounded border-[1px] border-[#C8C8C8]" type="checkbox" name="privacyPolicy" required />
                    <span className="w-[278px] h-[22px] font-lato text-[14px]text-center m-2" onChange={handleChange}>I agree to the
                      <Link href="/privacy-policy" passHref>
                        <span className="text-blue-500 hover:underline ml-1">privacy policy.*</span>
                      </Link>
                    </span>
                  </div>
                  <button className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-7" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
