import React from 'react'

function MesothThree() {
  return (
    <>
      {/* Mobile Version */}
      <div className="md:hidden bg-[#FAF3EC]">
        <div className="w-full px-4 py-8 relative">
          <hr className="w-full h-[1px] bg-[rgba(75,44,94,0.55)] mx-auto" />
          <p className="text-[#4B2C5E] text-center font-georgia italic text-3xl font-normal leading-normal underline decoration-[rgba(75,44,94,0.55)] underline-offset-4 my-6">
            Common Causes
          </p>

          <div className="flex flex-col items-center w-full">
            <div className="w-full flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Asbestos Exposure",
                "Environmental Exposure from Air or Soil",
                "Contaminated clothing",
                "Contaminated talc products",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex px-4 py-2 justify-center items-center rounded-[60px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] font-helvetica text-base font-normal"
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="w-full bg-white rounded-[20px] overflow-hidden p-6 mb-8">
              <div className="text-blue-900 text-2xl italic font-bold font-serif mb-4">Important:</div>
              <div className="text-blue-900 text-base font-normal font-helvetica">
                If you have been exposed to asbestos or experience any of these symptoms, please consult a medical professional immediately for proper diagnosis and treatment.
              </div>
            </div>

            <div className="w-full rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-amber-100 overflow-hidden p-6 relative">
              <div>
                <span className="text-blue-900 text-xl font-normal font-serif">A mesothelioma diagnosis</span>
                <span className="text-gray-700 text-base font-normal font-helvetica">
                  {" "}comes with overwhelming financial burdens. The costs associated with hospital visits, surgeries, chemotherapy, and other treatments can quickly add up. Many victims are also unable to work due to their illness, leading to lost wages that further strain their families.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop + 4K Version */}
      <div className="hidden md:block bg-[#FAF3EC]">
        <div className="w-full px-8 lg:px-16 xl:px-20 2xl:px-24 3xl:px-28 4xl:px-32 py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 4xl:py-32 relative">
          <p className="text-[#4B2C5E] text-center font-georgia italic text-4xl lg:text-5xl xl:text-[56px] 2xl:text-[72px] 3xl:text-[80px] 4xl:text-[96px] font-normal leading-normal underline decoration-[rgba(75,44,94,0.55)] underline-offset-[14%] [text-decoration-skip-ink:none] [font-feature-settings:'dlig'on] decoration-opacity-70 my-8 lg:my-10 2xl:my-16 3xl:my-20">
            Common Causes
          </p>

          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[1014px] 2xl:max-w-[1400px] 3xl:max-w-[1600px] 4xl:max-w-[1800px] flex flex-wrap justify-center gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 3xl:gap-7 4xl:gap-8 mb-16 lg:mb-24 xl:mb-32 2xl:mb-36 3xl:mb-40">
              {[
                "Asbestos Exposure",
                "Environmental Exposure from Air or Soil",
                "Contaminated clothing",
                "Contaminated talc products",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex px-6 py-3 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 3xl:px-12 3xl:py-6 4xl:px-14 4xl:py-7 justify-center items-center rounded-[60px] 2xl:rounded-[70px] 4xl:rounded-[80px] border border-[rgba(75,44,94,0.70)] bg-white bg-opacity-40 text-[#4B2C5E] [font-feature-settings:'dlig'on] font-helvetica text-xl lg:text-2xl 2xl:text-3xl 3xl:text-[34px] 4xl:text-[36px] font-normal leading-normal"
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="w-full max-w-[1280px] 2xl:max-w-[1600px] 3xl:max-w-[1700px] 4xl:max-w-[1800px] bg-white rounded-[20px] 2xl:rounded-[30px] overflow-hidden p-10 xl:p-12 2xl:p-16 3xl:p-20 4xl:p-24 mb-16 lg:mb-24 xl:mb-32 2xl:mb-40">
              <div className="text-blue-900 text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-[60px] 4xl:text-[64px] italic font-bold font-serif mb-10 2xl:mb-12">
                Important:
              </div>
              <div className="text-blue-900 text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-[36px] 4xl:text-[38px] font-normal font-helvetica leading-relaxed">
                If you have been exposed to asbestos or experience any of these symptoms, please consult a medical professional immediately for proper diagnosis and treatment.
              </div>
            </div>

            <div className="w-full max-w-[1377px] 2xl:max-w-[1800px] bg-white rounded-[20px] 2xl:rounded-[30px] outline outline-[5px] 2xl:outline-[6px] 3xl:outline-[7px] outline-offset-[-5px] 2xl:outline-offset-[-6px] 3xl:outline-offset-[-7px] outline-amber-100 overflow-hidden p-10 xl:p-12 2xl:p-16 3xl:p-20 4xl:p-24 relative">
              <div className="w-20 lg:w-32 2xl:w-40 3xl:w-44 4xl:w-48 h-0 absolute left-6 lg:left-[50px] 2xl:left-[60px] 3xl:left-[70px] top-[53px] 2xl:top-[70px] 3xl:top-[80px] origin-top-left rotate-90 outline outline-[5px] 2xl:outline-[6px] 3xl:outline-[7px] outline-offset-[-3px] outline-amber-100"></div>
              <div className="ml-12 2xl:ml-16 3xl:ml-20">
                <span className="text-blue-900 text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl 3xl:text-[38px] 4xl:text-[40px] font-normal font-serif">
                  A mesothelioma diagnosis
                </span>
                <span className="text-gray-700 text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[36px] 4xl:text-[38px] font-normal font-helvetica leading-relaxed">
                  {" "}comes with overwhelming financial burdens. The costs associated with hospital visits, surgeries, chemotherapy, and other treatments can quickly add up. Many victims are also unable to work due to their illness, leading to lost wages that further strain their families.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MesothThree
