import React from "react";
import Img1 from "../../assets/meso-eight-img.svg";
import Img2 from "../../assets/meso-eight-img2.svg";
import { useNavigate } from "react-router-dom";

const AboutUs7 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/ClaimForm");
  };

  return (
    <div className="w-full relative bg-[#faf3ec] 
                    min-h-[400px] 2xl:min-h-[500px] 
                    [@media_(min-width:_2560px)]:min-h-[600px] 
                    [@media_(min-width:_3840px)]:min-h-[750px] 
                    py-10 sm:py-14 lg:py-20 2xl:py-24 
                    [@media_(min-width:_2560px)]:py-28 
                    [@media_(min-width:_3840px)]:py-36 
                    px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 
                    [@media_(min-width:_2560px)]:px-20 
                    [@media_(min-width:_3840px)]:px-28 
                    flex items-center justify-center text-[#4b2c5e] font-helvetica">
      
      {/* Main Container */}
      <div className="w-full max-w-7xl 2xl:max-w-[90rem] 
                      [@media_(min-width:_2560px)]:max-w-[100rem] 
                      [@media_(min-width:_3840px)]:max-w-[120rem] 
                      mx-auto">
        
        {/* Layout Grid - Consistent across all breakpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 
                        [@media_(min-width:_2560px)]:gap-20 
                        [@media_(min-width:_3840px)]:gap-24 
                        items-center">
          
          {/* Image Section */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <img
              className="w-32 h-auto sm:w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-72 
                         [@media_(min-width:_2560px)]:w-80 
                         [@media_(min-width:_3840px)]:w-96 
                         max-w-full"
              alt="Mesothelioma awareness"
              src={Img1}
            />
          </div>

          {/* Content Section */}
          <div className="lg:col-span-9 text-center lg:text-left">
            
            {/* Title - Consistent scaling */}
            <h2 className="font-georgia italic text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 
                           2xl:text-7xl 
                           [@media_(min-width:_2560px)]:text-8xl 
                           [@media_(min-width:_3840px)]:text-9xl 
                           text-[#4b2c5e] mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 
                           [@media_(min-width:_2560px)]:mb-16 
                           [@media_(min-width:_3840px)]:mb-20 
                           leading-tight">
              Let's Act Together!
            </h2>

            {/* Description Text - Smooth responsive scaling */}
            <div className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl 
                            [@media_(min-width:_2560px)]:text-3xl 
                            [@media_(min-width:_3840px)]:text-4xl 
                            leading-relaxed 2xl:leading-relaxed 
                            [@media_(min-width:_3840px)]:leading-loose 
                            mb-8 sm:mb-10 lg:mb-12 2xl:mb-16 
                            [@media_(min-width:_2560px)]:mb-20 
                            [@media_(min-width:_3840px)]:mb-24 
                            max-w-4xl lg:max-w-none 2xl:max-w-none">
              <span>
                If you or a family member has been diagnosed with mesothelioma, we are here to support you. Whether you seek legal guidance or vital prevention resources,{" "}
              </span>
              <strong className="font-bold">Fight for Mesothelioma</strong>
              <span>
                {" "}is dedicated to advocating for your rights and making a meaningful impact.
              </span>
            </div>

            {/* Call-to-Action Button - Consistent sizing */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleButtonClick}
                className="bg-[#4b2c5e] text-[#f8f2e9] font-bold rounded-2xl 2xl:rounded-3xl 
                           [@media_(min-width:_3840px)]:rounded-[2rem] 
                           px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 lg:px-14 lg:py-7 
                           2xl:px-16 2xl:py-8 
                           [@media_(min-width:_2560px)]:px-20 [@media_(min-width:_2560px)]:py-10 
                           [@media_(min-width:_3840px)]:px-24 [@media_(min-width:_3840px)]:py-12 
                           text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl 
                           [@media_(min-width:_2560px)]:text-3xl 
                           [@media_(min-width:_3840px)]:text-4xl 
                           hover:bg-[#3d2347] transition-colors duration-300 
                           focus:outline-none focus:ring-4 focus:ring-[#4b2c5e] focus:ring-opacity-50 
                           w-full sm:w-auto max-w-xs sm:max-w-sm 2xl:max-w-md 
                           [@media_(min-width:_2560px)]:max-w-lg 
                           [@media_(min-width:_3840px)]:max-w-xl"
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs7;