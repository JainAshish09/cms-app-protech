import Image from 'next/image';
import Link from 'next/link';

export default function ToggleMenu() {
  return (
    <div className="fixed top-[110px] left-11 right-11 z-[1000] flex items-center justify-between p-0 shadow-md bg-white rounded-xl border-[1px] border-[#D8E5EF] ">
      <div className="w-[70%] mr-0 m-2">
        <nav>
          <ul className="flex justify-between">
            {['Home', 'What is PRO-TECH?', 'Products', 'Features', 'Request a Demo'].map((item) => (
              <li
                key={item}
                className="flex-1 border border-[#D8E5EF] text-center mr-2 rounded-md py-2"
              >
                {item}
              </li>
            ))}
          </ul>
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
                  <span className="inline-block px-4 py-2 mt-4 bg-[#00A0D0] text-white rounded-md hover:bg-blue-600">
                    Request a demo
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* <Image
        src="/images/toggleMenuImage1.png"
        alt="toggle image"
        layout="reponsive"
        width={1000}
        height={1000}
        className=" rounded-r-xl w-[35%] h-[100%]  m-0 p-0 ml-3"
      /> */}


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
              width={150}  // Adjust width as needed
              height={150} // Adjust height as needed
              className="w-2/3 rounded-md"
            />
          </div>
        </div>
      </div>


    </div >
  );
}
