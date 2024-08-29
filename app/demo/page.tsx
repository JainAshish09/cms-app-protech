import MainContainer from "../features/main-container";
import Link from "next/link";
import { getFormContent } from "../services/formMarkdown";
import { FormRow } from "../models/form";


const renderFormFields = (fields: FormRow[]) => {
  return fields?.map((row, key) => (
    <div key={key} className="w-full mt-7">
      {row.row.length === 1 ? row.row[0].type == "textarea" ? (
        <textarea
          className="w-[929px] h-[160px] rounded-lg p-4 border-[1px] border-[#C8C8C8] bg-[#FFFFFF] placeholder:w-[200px] placeholder:h-[21px] placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[27px]  placeholder:text-left"
          name={row.row[0].name}
          placeholder={row.row[0].label}
          required
        />
      ) : row.row[0].type === "dropdown" ? (
        <div className="flex">
          <p className="w-[15%] h-12 rounded-lg  px-5 py-4 text-2xl text-center align-middle">
            {row.row[0].name}:
          </p>
          <select
            className="w-[85%] ml-[20px] h-12 rounded-lg border border-gray-300 px-5 py-0"
            name={row.row[0].name}
            required
          >
            {row.row[0].dropdown_values.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          className="w-full h-12 rounded-lg border border-gray-300 px-5 py-4"
          type={row.row[0].type}
          name={row.row[0].name}
          placeholder={row.row[0].label}
          required
        />
      ) : (
        <div className="flex space-x-4">
          {row.row.map((data, i) => (
            data.type === "dropdown" ? (
              <select
                key={i}
                className="w-full h-12 rounded-lg border border-gray-300 px-5 py-4"
                name={data.name}
                required
              >
                <option value={""} selected disabled hidden>
                  {data.label}
                </option>
                {data.dropdown_values.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={i}
                className="w-full h-12 rounded-lg border border-gray-300 px-5 py-4"
                type={data.type}
                name={data.name}
                placeholder={data.label}
                required
              />
            )
          ))}
        </div>
      )}
    </div>
  ));
};


export default async function Demo() {

  const [formContent, content] = await getFormContent();

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
          <div className="relative w-[994px] min-h-[793px] top-[20px] mx-auto mb-8">
            <div>
              <p className="font-lato text-[22px] font-medium leading-[27.5px] text-left h-[28px] w-[521px]">{formContent?.title}</p>
              <div dangerouslySetInnerHTML={{ __html: content }} className="w-[931px] font-lato text-[14px] font-normal leading-[27px] text-left" />

            </div>
            <div className="w-[994px]  border-solid border-[1px] border-[#D8E5EF] rounded-3xl mt-4">
              <div className="w-[929.15px]  m-8">
                {formContent ? (
                  <form>
                    {renderFormFields(formContent.fields)}
                    {formContent.privacy ? (
                      <div className="w-full flex items-center mt-2">
                        <input
                          className="w-5 h-5 rounded border border-gray-300"
                          type="checkbox"
                          name="privacyPolicy"
                          required
                        />
                        <span className="w-[278px] h-[22px] font-lato text-[14px]text-center m-2">I agree to the
                          <Link href={formContent.privacy} passHref>
                            <span className="text-blue-500 hover:underline ml-1">privacy policy.*</span>
                          </Link>
                        </span>
                      </div>
                    ) : null}
                    <button className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-7" type="submit">
                      Submit
                    </button>
                  </form>
                ) : (
                  <form >
                    <div className="w-[929.15px] h-[50.36px]">
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="text" name="firstName" placeholder="First Name*" required />
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="lastName" placeholder="Last Name*" required />
                    </div>
                    <div className="w-[929.15px] h-[50.36px] mt-7">
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="email" name="email" placeholder="E-mail*" required />
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="tel" name="phone" placeholder="Phone number*" required />
                    </div>
                    <div className="w-[929.15px] h-[50.36px] mt-7">
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8] mr-10" type="text" name="companyName" placeholder="Company Name*" required />
                      <input className="w-[443.58px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="postalCode" placeholder="Postal Code*" required />
                    </div>
                    <div className="w-[929.15px] h-[50.36px] mt-7">
                      <input className="w-[929px] h-[50px] rounded-lg border-[1px] px-5 py-4 border-[#C8C8C8]" type="text" name="country" placeholder="Country*" required />
                    </div>
                    <div className="w-[929.15px] h-[160px] mt-7">
                      <textarea className="w-[929px] h-[160px] rounded-lg p-4 border-[1px] border-[#C8C8C8] bg-[#FFFFFF] placeholder:w-[200px] placeholder:h-[21px] placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[27px]  placeholder:text-left" name="question" placeholder="Ask a Question*" required />
                    </div>
                    <div className=" w-[308px] h-[22px] mt-2 rounded">
                      <input className="w-[22px] h-[22px] rounded border-[1px] border-[#C8C8C8]" type="checkbox" name="privacyPolicy" required />
                      <span className="w-[278px] h-[22px] font-lato text-[14px]text-center m-2" >I agree to the
                        <Link href="/privacy-policy" passHref>
                          <span className="text-blue-500 hover:underline ml-1">privacy policy.*</span>
                        </Link>
                      </span>
                    </div>
                    <button className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-7" type="submit">Submit</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
