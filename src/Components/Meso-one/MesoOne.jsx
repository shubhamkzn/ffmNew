import React from "react";
import image1 from "../../assets/Group 35579 (1).png";
import image2 from "../../assets/Group 35579.png";
import image3 from "../../assets/Group 35636.png";
import image4 from "../../assets/Group 35.png";


function MesoOne() {
  return (
    <>
    <div
      style={{ backgroundColor: "#FAF3EC" }}
      className="flex justify-center p-1 lg:w-[100%] xl:w-[100%] 4xl:w-[100vw]"
    >

      
      <div className="max-w-[105rem] w-full px-10 sm:px-6 lg:w-[110%] 4xl:max-w-[180rem] 4xl:px-32">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center py-8">
          <h1 className="text-[#4B2C5E] font-georgia text-4xl md:text-5xl italic font-normal leading-tight text-left">
            Compassion in every moment, support when you need it most!
          </h1>
          {/* <p className="text-lg text-[#4B2C5E] my-6 leading-relaxed text-left">
            We connect individuals and families impacted by mesothelioma or asbestos exposure with the <b>nation's most trusted legal services.</b> ensuring you secure the <b>justice and support you rightfully deserve</b> .
          </p> */}

          <div className="relative w-[395px] h-[200px] max-w-lg mt-4 p-10">
            <img src={image3} className="w-full" alt="Support illustration" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center ml-[30%]">
              {/* <p className="text-[#4B2C5E] font-georgia text-xl italic font-normal underline mb-2">
                We're Here for You!
              </p>
              <p className="text-[#4B2C5E] font-helvetica text-sm mb-4 leading-none">
                Let's discuss your legal options. We'll support you every step of the way.
              </p> */}
<button className="px-2 py-1 rounded-lg bg-[#2E4A7D] text-[#F5E7DA] font-helvetica text-xs font-semibold mt-12 ml-[-36%]" onClick={() => window.scrollBy(0, 1700)}>
  Reach Out Today
</button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <img
              src={image1}
              className="w-full max-w-md"
              alt="Mesothelioma illustration"
            />
          </div>
        </div>

        {/* Desktop Layout - Proper 4K Responsive */}
<div className="hidden lg:flex flex-col lg:flex-row items-center justify-between 
  py-12 2xl:py-16 4xl:py-24 
  2xl:w-[100%] 2xl:mt-[0%] xl:w-[100%] 
  4xl:gap-24">
  
  {/* Left column - text content */}
  <div className="w-full lg:w-[69%] 2xl:w-[100%] 4xl:w-[60%]">
    
    <h1 className="text-[#4B2C5E] font-georgia text-[50px] 
      lg:text-[56px] xl:text-[64px] 2xl:text-[80px] 4xl:text-[120px] 
      italic font-normal leading-tight 4xl:leading-[1.1]
      mb-6 2xl:mb-8 4xl:mb-12">
      Compassion in every moment, support when you need it most!
    </h1>
    
    {/* Image container */}
    <div className="relative w-full 
      max-w-[799px] 2xl:max-w-[799px] 4xl:max-w-[1400px]
      h-[238px] 2xl:h-[338px] 4xl:h-[500px] 
      flex justify-end ml-auto 
      2xl:ml-[5%] 2xl:mt-[5%] 
      4xl:ml-[10%] 4xl:mt-[3%]">
      
      <img
        src={image4}
        className="w-full h-full object-contain 
          4xl:max-w-[1400px] 4xl:max-h-[500px]"
        alt="Mesothelioma illustration"
      />
      
<button
  className="absolute z-10 -translate-x-1/2 -translate-y-1/2
    top-[65%] left-[60%]
    sm:top-[65%] sm:left-[60%]
    md:top-[70%] md:left-[55%]
    lg:top-[75%] lg:left-[50%]
    xl:top-[70%] xl:left-[55%]
    2xl:top-[71%] 2xl:left-[50%]
    4xl:top-[75%] 4xl:left-[55%]
    px-4 py-2
    sm:px-6 sm:py-2.5
    md:px-7 md:py-3
    lg:px-8 lg:py-3.5
    xl:px-9 xl:py-4
    2xl:px-10 2xl:py-4
    4xl:px-12 4xl:py-10 4xl:rounded-[32px]
    rounded-[20px]
    bg-[#2E4A7D] text-[#F5E7DA]
    font-helvetica font-semibold
    text-base sm:text-lg md:text-xl 
    2xl:text-2xl 4xl:text-4xl
    shadow-lg 4xl:shadow-2xl
    transition-all duration-300
    hover:bg-[#3A5A8F] hover:scale-105"
  onClick={() => window.scrollBy(0, 1300)}
>
  Reach Out Today
</button>

    </div>  
  </div>

  {/* Right column - image */}
  <div className="w-full lg:w-[45%] 2xl:w-[60%] 4xl:w-[40%] 
    flex justify-center lg:justify-end">
    
    <img
      src={image1}
      className="max-w-full h-auto 
        lg:max-w-[90%] xl:max-w-full 
        4xl:max-w-[1100px] 4xl:h-[700px] 
        object-contain"
      alt="Mesothelioma illustration"
    />
  </div>
</div>
     
     
      </div>

      
    </div>
    </>
  );
}

export default MesoOne;
