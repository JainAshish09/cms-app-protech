'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <header className="fixed top-[20px] left-11 right-11 z-50 flex items-center justify-between p-4 shadow-md bg-white rounded-xl">
        <div className="flex items-center space-x-4 z-50">
          <button type='button' className="p-2  border-[1px] border-black rounded-md " onClick={toggleMenu}>
            <Image src={isMenuOpen ? "/icons/close-svgrepo-com.svg" : "/icons/menu.svg"} alt="Menu" width={24} height={24} />
          </button>
        </div>
        <div className='absolute flex justify-center  w-full h-full '>
          <Image src="/icons/assa-abloy-logo-header.svg" alt="ASSA ABLOY" width={150} height={24} />
          <span className="w-[132px] h-[18px] font-[400] text-[14px] ml-3 mt-[30px]">PRO-TECH TITAN®</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md px-2 py-1 text-sm">
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none px-2"
            />
            <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
          </div>
          <button className="p-2 border rounded-md text-sm">EN</button>
          <button type='button' className="p-2 bg-blue-500 text-white rounded-md text-sm">Login</button>
        </div>
      </header>
      {isMenuOpen && (<div className="fixed top-[110px] left-11 right-11 z-[1000] flex items-center justify-between p-0 shadow-md bg-white rounded-xl border-[1px] border-[#D8E5EF] ">
        <div className="w-[70%] mr-0 m-2">
          <nav>
            <div className="flex justify-between">
              {[
                { name: 'Home', path: '/' },
                { name: 'What is PRO-TECH?', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Features', path: '/features' },
                { name: 'Request a Demo', path: '/demo' },
              ].map(({ name, path }) => (
                <p
                  key={name}
                  className="flex-1 border border-[#D8E5EF] text-center mr-2 rounded-md py-2"
                >
                  <Link href={path}>
                    <p className="block h-full w-full" onClick={toggleMenu}>{name}</p>
                  </Link>
                </p>
              ))}
            </div>
          </nav>

          <div className="grid grid-cols-2 gap-4 mt-5">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white flex overflow-hidden rounded-xl border border-[#D8E5EF] p-2 aspect-[5/2]">
                <div className="relative w-[40%] ">
                  <Image
                    src="/images/protech-in-action.png"
                    alt="Action Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>

                <div className="flex flex-col w-2/3 p-4 pt-0">
                  <h2 className="text-2xl font-bold mb-2">See PRO-TECH in action</h2>
                  <p className="text-gray-700 flex-grow font-[500]">
                    Learn how PRO-TECH can accelerate your business to the next level.
                  </p>
                  <Link href="/demo">
                    <button className=' w-[172.38px]  bg-[#00A0D0] rounded-md px-[18px] py-[10px] mt-4 ' onClick={toggleMenu}>
                      <div className='flex items-center justify-between'>
                        <span className=' w-[167px] h-5 font-lato text-[16px] font-[600] leading-5 text-white'>
                          Request a Demo
                        </span>
                        <Image src={"/icons/chevron-right.svg"} alt="" height={15} width={10}></Image>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-[35%] h-[300px] ml-3">
          <Image
            src="/images/toggleMenuImage1.png"
            alt="toggle image"
            layout="fill"
            objectFit="cover"
            className="rounded-r-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center flex-col">
            <p className="bg-white bg-opacity-100 text-black text-sm font-bold p-2 rounded-md mb-4">
              Check out the latest versions of PRO-TECH TITAN®
            </p>
            <div className="flex justify-center w-full">
              <Image
                src="/images/protechLogo.png"
                alt="Protech Logo"
                width={150}
                height={150}
                className="w-2/3 rounded-md"
              />
            </div>
          </div>
        </div>


      </div >)}

    </>
  );
};

export default Header;
