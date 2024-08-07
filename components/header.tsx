import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-[20px] left-11 right-11 z-50 flex items-center justify-between p-4 shadow-md bg-white rounded-xl">
      <div className="flex items-center space-x-4">
        <button type='button' className="p-2  border-[1px] border-black rounded-md">
          <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
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
  );
};

export default Header;

