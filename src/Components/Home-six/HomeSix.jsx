/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import how from "../../assets/how we help.png"
import how2 from "../../assets/how we help (1).png"
import { useNavigate } from 'react-router-dom';
import frame from "../../assets/c.png"
import frame2 from "../../assets/Frame 115.png"
import home6_1 from "../../assets/home6_1.png"
import home6_2 from "../../assets/home6_2.png"
import home6_3 from "../../assets/home6_3.png"
import ImageComponent from './ImageComponenet';

function HomeSix() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ClaimForm');
  };

  const handleScrollToTop = () => {
    window.scrollBy(0, -4500);
  };

  return (
    <>
      {/* Desktop and Tablet Version */}
      <div className="hidden md:flex flex-col items-center w-full bg-[#F5E7DA80] 
                      py-8 lg:py-12 2xl:py-20 
                      [@media_(min-width:_2560px)]:py-24 
                      [@media_(min-width:_3840px)]:py-32">
        <div className="bg-white w-[95%] max-w-6xl lg:max-w-7xl 2xl:max-w-[1400px] 
                        [@media_(min-width:_2560px)]:max-w-[1700px] 
                        [@media_(min-width:_3840px)]:max-w-[2200px] 
                        mx-auto mb-6 lg:mb-8 2xl:mb-12 
                        [@media_(min-width:_2560px)]:mb-16 
                        [@media_(min-width:_3840px)]:mb-20 
                        rounded-xl 2xl:rounded-2xl 
                        [@media_(min-width:_3840px)]:rounded-3xl 
                        p-4 lg:p-6 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20">
          <div className="flex justify-center mb-6 lg:mb-8 2xl:mb-16 
                          [@media_(min-width:_2560px)]:mb-20 
                          [@media_(min-width:_3840px)]:mb-24">
            <h1
              className="text-[#4B2C5E] font-normal italic font-georgia 
                         text-3xl md:text-4xl lg:text-6xl 2xl:text-8xl 
                         [@media_(min-width:_2560px)]:text-9xl 
                         [@media_(min-width:_3840px)]:text-[10rem] 
                         text-center"
              style={{ fontFeatureSettings: "'dlig' on" }}
            >
              How can we help
            </h1>
          </div>
          
          <div className="w-full max-w-5xl lg:max-w-6xl 2xl:max-w-7xl 
                          [@media_(min-width:_2560px)]:max-w-[90rem] 
                          [@media_(min-width:_3840px)]:max-w-[110rem] 
                          mx-auto grid grid-cols-1 md:grid-cols-1 md:justify-items-center lg:grid-cols-3 
                          gap-4 md:gap-5 lg:gap-6 2xl:gap-8 
                          [@media_(min-width:_2560px)]:gap-12 
                          [@media_(min-width:_3840px)]:gap-16">
            
            {/* Service Card 1 - File Your Legal Case */}
            <div className="bg-[#F5E7DA] rounded-xl 2xl:rounded-2xl 
                            [@media_(min-width:_3840px)]:rounded-3xl 
                            flex flex-col h-[300px] md:h-[320px] lg:h-[360px] 2xl:h-[450px] 
                            [@media_(min-width:_2560px)]:h-[540px] 
                            [@media_(min-width:_3840px)]:h-[680px]
                            md:w-[400px] lg:w-full">
              <div className="h-1/3 flex items-center justify-start border-b border-[#e0cdb7] 
                              px-4 md:px-5 lg:px-6 2xl:px-8 
                              [@media_(min-width:_2560px)]:px-10 
                              [@media_(min-width:_3840px)]:px-12">
                <img 
                  src={home6_1} 
                  className="w-12 h-14 md:w-20 md:h-20 lg:w-16 lg:h-18 2xl:w-20 2xl:h-22 
                             [@media_(min-width:_2560px)]:w-24 [@media_(min-width:_2560px)]:h-26 
                             [@media_(min-width:_3840px)]:w-32 [@media_(min-width:_3840px)]:h-36 
                             flex-shrink-0" 
                  alt="Legal Case Icon" 
                />
              </div>
              
              <div className="h-1/3 flex justify-center items-center border-b border-[#b4895b] 
                              px-2 md:px-2.5 lg:px-2 2xl:px-3 
                              [@media_(min-width:_2560px)]:px-4 
                              [@media_(min-width:_3840px)]:px-5">
<span className="text-[#4B2C5E] font-normal italic font-georgia 
                                 text-xl md:text-3xl lg:text-2xl 2xl:text-3xl 
                                 [@media_(min-width:_2560px)]:text-4xl 
                                 [@media_(min-width:_3840px)]:text-5xl 
                                 text-center">
                  File Your Legal Case
                </span>
              </div>
              
              <div className="h-1/3 flex justify-center items-center 
                              px-3 md:px-4 lg:px-4 2xl:px-6 
                              [@media_(min-width:_2560px)]:px-8 
                              [@media_(min-width:_3840px)]:px-10">
                <button
                  className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[200px] 2xl:max-w-[280px] 
                             [@media_(min-width:_2560px)]:max-w-[340px] 
                             [@media_(min-width:_3840px)]:max-w-[420px] 
                             h-10 md:h-11 lg:h-12 2xl:h-16 
                             [@media_(min-width:_2560px)]:h-20 
                             [@media_(min-width:_3840px)]:h-24 
                             flex justify-center items-center text-[#FAF3EC] font-helvetica 
                             text-sm md:text-base lg:text-base 2xl:text-lg 
                             [@media_(min-width:_2560px)]:text-xl 
                             [@media_(min-width:_3840px)]:text-2xl 
                             font-bold rounded-xl 2xl:rounded-2xl 
                             [@media_(min-width:_3840px)]:rounded-3xl 
                             bg-[#2E4A7D] hover:bg-[#1E3558] transition-colors duration-300"
                  style={{ fontFeatureSettings: "'dlig' on" }}
                  onClick={handleButtonClick}
                >
                  File Your Claim Now
                </button>
              </div>
            </div>

            {/* Service Card 2 - Financial Compensation */}
            <div className="bg-[#F5E7DA] rounded-xl 2xl:rounded-2xl 
                            [@media_(min-width:_3840px)]:rounded-3xl 
                            flex flex-col h-[300px] md:h-[320px] lg:h-[360px] 2xl:h-[450px] 
                            [@media_(min-width:_2560px)]:h-[540px] 
                            [@media_(min-width:_3840px)]:h-[680px]
                            md:w-[400px] lg:w-full">
              <div className="h-1/3 flex items-center justify-start border-b border-[#b4895b] 
                              px-4 md:px-5 lg:px-6 2xl:px-8 
                              [@media_(min-width:_2560px)]:px-10 
                              [@media_(min-width:_3840px)]:px-12">
                <img 
                  src={home6_2} 
                  className="w-12 h-14 md:w-20 md:h-20 lg:w-16 lg:h-18 2xl:w-20 2xl:h-22 
                             [@media_(min-width:_2560px)]:w-24 [@media_(min-width:_2560px)]:h-26 
                             [@media_(min-width:_3840px)]:w-32 [@media_(min-width:_3840px)]:h-36 
                             flex-shrink-0" 
                  alt="Financial Compensation Icon" 
                />
              </div>
              
              <div className="h-1/3 flex justify-center items-center border-b border-[#e0cdb7] 
                              px-2 md:px-2.5 lg:px-2 2xl:px-3 
                              [@media_(min-width:_2560px)]:px-4 
                              [@media_(min-width:_3840px)]:px-5">
                <span className="text-[#4B2C5E] font-normal italic font-georgia 
                                 text-xl md:text-3xl lg:text-2xl 2xl:text-3xl 
                                 [@media_(min-width:_2560px)]:text-4xl 
                                 [@media_(min-width:_3840px)]:text-5xl 
                                 text-center">
                  Financial Compensation
                </span>
              </div>
              
              <div className="h-1/3 flex justify-center items-center 
                              px-3 md:px-4 lg:px-4 2xl:px-6 
                              [@media_(min-width:_2560px)]:px-8 
                              [@media_(min-width:_3840px)]:px-10">
                <button 
                  className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[200px] 2xl:max-w-[280px] 
                             [@media_(min-width:_2560px)]:max-w-[340px] 
                             [@media_(min-width:_3840px)]:max-w-[420px] 
                             h-10 md:h-11 lg:h-12 2xl:h-16 
                             [@media_(min-width:_2560px)]:h-20 
                             [@media_(min-width:_3840px)]:h-24 
                             flex justify-center items-center text-[#FAF3EC] font-helvetica 
                             text-sm md:text-base lg:text-base 2xl:text-lg 
                             [@media_(min-width:_2560px)]:text-xl 
                             [@media_(min-width:_3840px)]:text-2xl 
                             font-bold rounded-xl 2xl:rounded-2xl 
                             [@media_(min-width:_3840px)]:rounded-3xl 
                             bg-[#4B2C5E] hover:bg-[#3A1D4D] transition-colors duration-300"
                  onClick={handleScrollToTop}
                >
                  Connect With Us
                </button>
              </div>
            </div>

            {/* Service Card 3 - Expert Legal Advice */}
            <div className="bg-[#F5E7DA] rounded-xl 2xl:rounded-2xl 
                            [@media_(min-width:_3840px)]:rounded-3xl 
                            flex flex-col h-[300px] md:h-[320px] lg:h-[360px] 2xl:h-[450px] 
                            [@media_(min-width:_2560px)]:h-[540px] 
                            [@media_(min-width:_3840px)]:h-[680px]
                            md:w-[400px] lg:w-full">
              <div className="h-1/3 flex items-center justify-start border-b border-[#e0cdb7] 
                              px-4 md:px-5 lg:px-6 2xl:px-8 
                              [@media_(min-width:_2560px)]:px-10 
                              [@media_(min-width:_3840px)]:px-12">
                <img 
                  src={home6_3} 
                  className="w-12 h-14 md:w-20 md:h-20 lg:w-16 lg:h-18 2xl:w-20 2xl:h-22 
                             [@media_(min-width:_2560px)]:w-24 [@media_(min-width:_2560px)]:h-26 
                             [@media_(min-width:_3840px)]:w-32 [@media_(min-width:_3840px)]:h-36 
                             flex-shrink-0" 
                  alt="Legal Advice Icon" 
                />
              </div>
              
              <div className="h-1/3 flex justify-center items-center border-b border-[#b4895b] 
                              px-2 md:px-2.5 lg:px-2 2xl:px-3 
                              [@media_(min-width:_2560px)]:px-4 
                              [@media_(min-width:_3840px)]:px-5">
                <span className="text-[#4B2C5E] font-normal italic font-georgia 
                                 text-xl md:text-3xl lg:text-2xl 2xl:text-3xl 
                                 [@media_(min-width:_2560px)]:text-4xl 
                                 [@media_(min-width:_3840px)]:text-5xl 
                                 text-center">
                  Expert Legal Advice
                </span>
              </div>
              
              <div className="h-1/3 flex justify-center items-center 
                              px-3 md:px-4 lg:px-4 2xl:px-6 
                              [@media_(min-width:_2560px)]:px-8 
                              [@media_(min-width:_3840px)]:px-10">
                <button 
                  className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[200px] 2xl:max-w-[280px] 
                             [@media_(min-width:_2560px)]:max-w-[340px] 
                             [@media_(min-width:_3840px)]:max-w-[420px] 
                             h-10 md:h-11 lg:h-12 2xl:h-16 
                             [@media_(min-width:_2560px)]:h-20 
                             [@media_(min-width:_3840px)]:h-24 
                             flex justify-center items-center text-[#FAF3EC] font-helvetica 
                             text-sm md:text-base lg:text-base 2xl:text-lg 
                             [@media_(min-width:_2560px)]:text-xl 
                             [@media_(min-width:_3840px)]:text-2xl 
                             font-bold rounded-xl 2xl:rounded-2xl 
                             [@media_(min-width:_3840px)]:rounded-3xl 
                             bg-[#C49A6C] hover:bg-[#B4895B] transition-colors duration-300"
                  onClick={handleButtonClick}
                >
                  Call Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Frame with Improved Tablet Spacing */}
<div className="px-6 md:px-12 lg:px-8">
  <div className="relative w-full">
    {/* Background Image */}
    <img
      src={frame2}
      className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-7xl 
                 [@media_(min-width:_2560px)]:max-w-[90rem] 
                 [@media_(min-width:_3840px)]:max-w-[110rem] 
                 h-auto mx-auto"
      alt="Decorative Frame"
    />

    {/* Centered Text + Button */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-serif text-white leading-snug">
        Support. Justice. <br /> Peace of mind.
      </h1>
      <p className="mt-4 text-lg md:text-2xl lg:text-3xl text-white">
        That’s what we’re here to offer
      </p>
      <button
        onClick={() => {
          navigate("/AboutMain");
        }}
        className="mt-6 px-5 py-2.5 text-base md:text-lg lg:text-xl bg-white text-blue-700 font-medium rounded-xl shadow-md 
                   transition duration-300 hover:bg-gray-100"
      >
        Explore Your Legal Options
      </button>
    </div>
  </div>
</div>

      </div>

      {/* Mobile Version */}
      <div className="block md:hidden bg-[#FAF3EC] 
                      py-6 2xl:py-8 
                      [@media_(min-width:_2560px)]:py-10 
                      [@media_(min-width:_3840px)]:py-12">
        {/* Header Section */}
        <div className="px-4 2xl:px-6 
                        [@media_(min-width:_2560px)]:px-8 
                        [@media_(min-width:_3840px)]:px-10 
                        pt-8 2xl:pt-10 
                        [@media_(min-width:_2560px)]:pt-12 
                        [@media_(min-width:_3840px)]:pt-16 
                        pb-4 2xl:pb-5 
                        [@media_(min-width:_2560px)]:pb-6 
                        [@media_(min-width:_3840px)]:pb-8">
          <h1
            className="text-[#4B2C5E] font-normal italic font-georgia 
                       text-3xl sm:text-4xl 2xl:text-5xl 
                       [@media_(min-width:_2560px)]:text-6xl 
                       [@media_(min-width:_3840px)]:text-7xl 
                       text-center mb-6 2xl:mb-8 
                       [@media_(min-width:_2560px)]:mb-10 
                       [@media_(min-width:_3840px)]:mb-12"
            style={{ fontFeatureSettings: "'dlig' on" }}
          >
            How can we help
          </h1>
        </div>

        {/* Mobile Service Cards */}
        <div className="px-4 2xl:px-6 
                        [@media_(min-width:_2560px)]:px-8 
                        [@media_(min-width:_3840px)]:px-10 
                        space-y-4 2xl:space-y-6 
                        [@media_(min-width:_2560px)]:space-y-8 
                        [@media_(min-width:_3840px)]:space-y-10 
                        mb-6 2xl:mb-8 
                        [@media_(min-width:_2560px)]:mb-10 
                        [@media_(min-width:_3840px)]:mb-12">
          
          {/* Card 1 - File Your Legal Case */}
          <div className="bg-white rounded-xl 2xl:rounded-2xl 
                          [@media_(min-width:_3840px)]:rounded-3xl">
            <div className="flex items-center p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12 
                            border-b border-[#e0cdb7]">
              <img 
                src={home6_1} 
                className="w-10 h-12 sm:w-12 sm:h-14 2xl:w-16 2xl:h-18 
                           [@media_(min-width:_2560px)]:w-20 [@media_(min-width:_2560px)]:h-22 
                           [@media_(min-width:_3840px)]:w-24 [@media_(min-width:_3840px)]:h-26 
                           mr-4 2xl:mr-6 
                           [@media_(min-width:_2560px)]:mr-8 
                           [@media_(min-width:_3840px)]:mr-10 
                           flex-shrink-0" 
                alt="Legal Case Icon" 
              />
              <span className="text-[#4B2C5E] font-normal italic font-georgia 
                               text-xl sm:text-2xl 2xl:text-3xl 
                               [@media_(min-width:_2560px)]:text-4xl 
                               [@media_(min-width:_3840px)]:text-5xl">
                File Your Legal Case
              </span>
            </div>
            <div className="p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12">
              <button
                className="w-full h-12 sm:h-16 2xl:h-20 
                           [@media_(min-width:_2560px)]:h-24 
                           [@media_(min-width:_3840px)]:h-28 
                           flex justify-center items-center text-[#FAF3EC] font-helvetica 
                           text-base sm:text-xl 2xl:text-2xl 
                           [@media_(min-width:_2560px)]:text-3xl 
                           [@media_(min-width:_3840px)]:text-4xl 
                           font-bold rounded-xl 2xl:rounded-2xl 
                           [@media_(min-width:_3840px)]:rounded-3xl 
                           bg-[#2E4A7D] hover:bg-[#1E3558] transition-colors duration-300"
                onClick={handleButtonClick}
              >
                File Your Claim Now
              </button>
            </div>
          </div>

          {/* Card 2 - Financial Compensation */}
          <div className="bg-white rounded-xl 2xl:rounded-2xl 
                          [@media_(min-width:_3840px)]:rounded-3xl">
            <div className="flex items-center p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12 
                            border-b border-[#b4895b]">
              <img 
                src={home6_2} 
                className="w-10 h-12 sm:w-12 sm:h-14 2xl:w-16 2xl:h-18 
                           [@media_(min-width:_2560px)]:w-20 [@media_(min-width:_2560px)]:h-22 
                           [@media_(min-width:_3840px)]:w-24 [@media_(min-width:_3840px)]:h-26 
                           mr-4 2xl:mr-6 
                           [@media_(min-width:_2560px)]:mr-8 
                           [@media_(min-width:_3840px)]:mr-10 
                           flex-shrink-0" 
                alt="Financial Compensation Icon" 
              />
              <span className="text-[#4B2C5E] font-normal italic font-georgia 
                               text-xl sm:text-2xl 2xl:text-3xl 
                               [@media_(min-width:_2560px)]:text-4xl 
                               [@media_(min-width:_3840px)]:text-5xl">
                Financial Compensation
              </span>
            </div>
            <div className="p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12">
              <button 
                className="w-full h-12 sm:h-16 2xl:h-20 
                           [@media_(min-width:_2560px)]:h-24 
                           [@media_(min-width:_3840px)]:h-28 
                           flex justify-center items-center text-[#FAF3EC] font-helvetica 
                           text-base sm:text-xl 2xl:text-2xl 
                           [@media_(min-width:_2560px)]:text-3xl 
                           [@media_(min-width:_3840px)]:text-4xl 
                           font-bold rounded-xl 2xl:rounded-2xl 
                           [@media_(min-width:_3840px)]:rounded-3xl 
                           bg-[#4B2C5E] hover:bg-[#3A1D4D] transition-colors duration-300"
                onClick={handleScrollToTop}
              >
                Connect With Us
              </button>
            </div>
          </div>

          {/* Card 3 - Expert Legal Advice */}
          <div className="bg-white rounded-xl 2xl:rounded-2xl 
                          [@media_(min-width:_3840px)]:rounded-3xl">
            <div className="flex items-center p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12 
                            border-b border-[#e0cdb7]">
              <img 
                src={home6_3} 
                className="w-10 h-12 sm:w-12 sm:h-14 2xl:w-16 2xl:h-18 
                           [@media_(min-width:_2560px)]:w-20 [@media_(min-width:_2560px)]:h-22 
                           [@media_(min-width:_3840px)]:w-24 [@media_(min-width:_3840px)]:h-26 
                           mr-4 2xl:mr-6 
                           [@media_(min-width:_2560px)]:mr-8 
                           [@media_(min-width:_3840px)]:mr-10 
                           flex-shrink-0" 
                alt="Legal Advice Icon" 
              />
              <span className="text-[#4B2C5E] font-normal italic font-georgia 
                               text-xl sm:text-2xl 2xl:text-3xl 
                               [@media_(min-width:_2560px)]:text-4xl 
                               [@media_(min-width:_3840px)]:text-5xl">
                Expert Legal Advice
              </span>
            </div>
            <div className="p-4 sm:p-6 2xl:p-8 
                            [@media_(min-width:_2560px)]:p-10 
                            [@media_(min-width:_3840px)]:p-12">
              <button 
                className="w-full h-12 sm:h-16 2xl:h-20 
                           [@media_(min-width:_2560px)]:h-24 
                           [@media_(min-width:_3840px)]:h-28 
                           flex justify-center items-center text-[#FAF3EC] font-helvetica 
                           text-base sm:text-xl 2xl:text-2xl 
                           [@media_(min-width:_2560px)]:text-3xl 
                           [@media_(min-width:_3840px)]:text-4xl 
                           font-bold rounded-xl 2xl:rounded-2xl 
                           [@media_(min-width:_3840px)]:rounded-3xl 
                           bg-[#C49A6C] hover:bg-[#B4895B] transition-colors duration-300"
                onClick={handleButtonClick}
              >
                Call Us Today
              </button>
            </div>
          </div>
        </div>

{/* Bottom Frame - Mobile Only */}
<div className="block md:hidden px-6 mt-6 pb-6">
  <div className="relative w-full">
    {/* Background Image */}
    <img
      src={frame2}
      className="w-full max-w-sm h-auto mx-auto"
      alt="Decorative Frame"
    />

    {/* Centered Text + Button */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-serif text-white leading-snug">
        Support. Justice. <br /> Peace of mind.
      </h1>
      <p className="mt-3 text-base text-white">
        That’s what we’re here to offer
      </p>
      <button
      onClick={()=>{
        navigate("/AboutMain")
      }}
        className="mt-4 px-3 py-1.5 bg-white text-blue-700 text-sm font-medium 
                   rounded-lg shadow-md transition duration-300 hover:bg-gray-100"
      >
        Explore Your Legal Options
      </button>
    </div>
  </div>
</div>


      </div>
    </>
  )
}

export default HomeSix