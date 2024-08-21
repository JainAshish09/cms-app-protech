import Image from "next/image"
import Link from "next/link"
export default function about() {

  const hardware = [
    ["Adams Rite", "dormakaba Commercial", "McKinney"],
    ["Zero International", "Alarm Controls", "dormakaba Simplex"],
    ["Medeco", "American Specialties", "Emtek"],
    ["National Guard", "Architectural Builders Hardware", "Falcon"],
    ["Norton", "Arrow Lock", "Folger Adam"],
    ["PBB Architectural", "ASSA ABLOY ACCENTRA™", "Gallery Specialty Hardware"],
    ["PDQ Manufacturing", "ASSA ABLOY ACCENTRA Residential Mechanical", "Glynn-Johnson"],
    ["Pemko", "ASSA ABLOY Glass Solutions", "Hager"],
    ["Reese Enterprises Inc", "HES", "Rixson"],
    ["Ives", "Rockwood", "Johnson Hardware"],
    ["Sargent", "K.N. Crowder", "Schlage"],
    ["Kaba Ilco", "Schlage Electronic Security", "Kwikset"],
    ["Schlage Residential", "Cal-Royal", "Lawrence Hardware"],
    ["Securitron", "LCN Closers", "Security Door Controls"],
    ["Locknetics", "Select Hinges", "Inc."],
    ["Trimco", "Detex Corporation", "Luxer One"],
    ["Trine Access Technology", "Markar", "Von Duprin"],
    ["dormakaba Arch Hdw", "Marks", "Weiser Lock"],
    ["Cal-Royal", "Centrios", "Corbin Russwin"],
    ["Design Hardware", "Lund Equipment Co., Inc.", "Don-Jo"]
  ];

  const doorAndFrame = [
    ["Hollow Metal Doors and Frames", "Wood Doors", "Aluminum Frames"],
    ["Ceco", "RITE Door", "RITE Slide"],
    ["Curries", "RITE Slide"],
    ["Fleming Baron", "Wood Door (generic WDMA)"],
    ["Pioneer"],
    ["RITE Door (doors only)"]

  ];


  return <div
    className="bg-white  ">
    <p className="relative m-auto w-full text-center font-[700] lg:text-[45px] sm:text-[30px] h-[50%] bg-black text-white pt-40 pb-10">Project management solution for distributors</p>
    <div className="container mx-auto">


      <div className="mt-20 mx-3 flex flex-wrap w-full p-16">
        <div className="lg:w-[60%] w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">What is PRO-TECH®?</p>
          <p className="text-[20px] font-[500] tracking-widest">
            PRO-TECH is a time- and money-saving enterprise project management software solution for door, frame, and architectural hardware distributors. The robust software automates most aspects of your business and fully integrates accounting and billing systems with the rest of your operations!
          </p>
        </div>
        <div className="relative lg:w-[40%] w-full">
          <Image
            src="/images/about-img-1.jpeg"
            alt="Action Image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="mx-3 flex flex-wrap w-full p-16">
        <div className="relative lg:w-[38%] w-full mr-5">
          <Image
            src="/images/about-img-2.jpeg"
            alt="Action Image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="cover"
            className="rounded-none "
          />
        </div>
        <div className="lg:w-[57%] w-full mb-4 lg:mb-0 pl-5">
          <p className="text-[30px] font-[600] mb-4">Why PRO-TECH?</p>
          <p className="text-[20px] font-[500] tracking-widest">
            We make it easy to run and manage your business! Easy scalability and automatic software updates,<b> including integrated price books,</b> means your team has the latest version and most up-to-date information. Use PRO-TECH'&nbsp;s 28 different reporting options including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg pl-6 mt-4">
            <li>Door schedules</li>
            <li>Elevations</li>
            <li>Costs</li>
            <li>Orders</li>
            <li>Projects</li>
            <li>Quote requests</li>
          </ul>

          <Link href="/demo">
            <button className=' w-[172.38px]  bg-[#45637a] rounded-sm px-[18px] py-[10px] mt-4 '>
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

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <div className="lg:w-[60%] w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">How does PRO-TECH work?</p>
          <p className="text-[20px] font-[500] tracking-widest">
            PRO-TECH collects product data from across the entire industry to make the process of submittals, estimating, specifying, quoting, ordering, reporting and more, completely seamless and efficient. PRO-TECH includes data from the product manufacturers listed below.
          </p>
        </div>
        <div className="relative lg:w-[40%] w-full">
          <Image
            src="/images/about-img-3.jpeg"
            alt="Action Image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <div className="lg:w-[100%] w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">Manufacturers price books by category</p>
          <p className="text-[20px] font-[500] tracking-widest">
            We make it easy to research manufacturers’ products, product images and list prices with our extensive collection of price books/catalogs. Quickly and accurately build hardware sets and door openings with instant access with our price book updates. Custom prices books are available with PRO-TECH.
          </p>
        </div>
      </div>

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <div className="w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">Hardware</p>
          <div className="w-full text-[20px] font-[500] tracking-widest">
            <div className="space-y-2">
              {hardware.map((group, index) => (
                <div key={index} className="p-4 bg-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    {group.map((brand, idx) => (
                      <div key={idx}>{brand}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <div className="w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">Electronic access control Hardware</p>
          <table className="w-full border-collapse text-[20px] font-[500] tracking-widest">
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-4">Corbin Russwin	</td>
              </tr>
              <tr>
                <td className="p-4">Hager</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-4">Sargent</td>
              </tr>
              <tr>
                <td className="p-4">ASSA ABLOY Accentra™</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className=" mx-3 flex flex-wrap w-full p-16">
        <div className="w-full mb-4 lg:mb-0">
          <p className="text-[30px] font-[600]  mb-4">Doors and frames</p>
          <div className="w-full text-[20px] font-[500] tracking-widest">
            <div className="space-y-2">
              {doorAndFrame.map((group, index) => (
                <div key={index} className="p-4 bg-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    {group.map((brand, idx) => (
                      <div key={idx}>{brand}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
}