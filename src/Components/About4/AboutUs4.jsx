import React from 'react';

const AboutUs4 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto 
                    p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20 
                    [@media_(min-width:_2560px)]:p-24 
                    [@media_(min-width:_3840px)]:p-32 
                    font-georgia bg-[#F3E2C88F]">
      
      {/* Title Section */}
      <i className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 
                    [@media_(min-width:_2560px)]:text-9xl 
                    [@media_(min-width:_3840px)]:text-[10rem] 
                    text-center w-full md:w-[70%] 2xl:w-[80%] 
                    [@media_(min-width:_3840px)]:w-[85%] 
                    block mb-4 sm:mb-6 md:mb-6 lg:mb-8 2xl:mb-12 
                    [@media_(min-width:_2560px)]:mb-16 
                    [@media_(min-width:_3840px)]:mb-20 
                    font-['Georgia'] italic text-[#4B2C5E] leading-tight">
        How We Make a Difference?
      </i>
      
      {/* Description Section */}
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 
                      [@media_(min-width:_2560px)]:text-5xl 
                      [@media_(min-width:_3840px)]:text-6xl 
                      font-helvetica text-center mb-6 sm:mb-8 md:mb-8 lg:mb-12 2xl:mb-16 
                      [@media_(min-width:_2560px)]:mb-20 
                      [@media_(min-width:_3840px)]:mb-24 
                      text-[#4B2C5E] max-w-4xl 2xl:max-w-6xl 
                      [@media_(min-width:_2560px)]:max-w-7xl 
                      [@media_(min-width:_3840px)]:max-w-[100rem] 
                      leading-relaxed 2xl:leading-relaxed 
                      [@media_(min-width:_3840px)]:leading-loose">
        <p className="m-0 mb-2 2xl:mb-4 [@media_(min-width:_3840px)]:mb-6">
          At Fight for Mesothelioma, our commitment extends beyond legal assistance.
        </p>
        <p className="m-0">
          We advocate, educate, and work toward a future free from asbestos related harm.
        </p>
      </div>
      
      {/* Cards Section */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 
                      [@media_(min-width:_2560px)]:gap-16 
                      [@media_(min-width:_3840px)]:gap-20 
                      relative z-10 w-full max-w-6xl 2xl:max-w-7xl 
                      [@media_(min-width:_2560px)]:max-w-[90rem] 
                      [@media_(min-width:_3840px)]:max-w-[152rem]">
        
        {/* Card 1: Legal Advocacy & Compensation */}
        <div className="w-full lg:w-1/3 h-auto 
                        min-h-[300px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[450px] 2xl:min-h-[550px] 
                        [@media_(min-width:_2560px)]:min-h-[650px] 
                        [@media_(min-width:_3840px)]:min-h-[800px] 
                        bg-white rounded-2xl 2xl:rounded-3xl 
                        [@media_(min-width:_3840px)]:rounded-[2rem] 
                        shadow-[0px_4px_25px_rgba(39,29,46,0.25)] 
                        2xl:shadow-[0px_6px_35px_rgba(39,29,46,0.3)] 
                        [@media_(min-width:_3840px)]:shadow-[0px_8px_45px_rgba(39,29,46,0.35)] 
                        overflow-hidden p-4 sm:p-6 md:p-6 lg:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20 
                        box-border flex flex-col transition-all duration-300 hover:scale-105">
          <i className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 
                        [@media_(min-width:_2560px)]:text-7xl 
                        [@media_(min-width:_3840px)]:text-8xl 
                        text-[#2e4a7d] block text-center mb-4 sm:mb-6 md:mb-6 lg:mb-8 2xl:mb-12 
                        [@media_(min-width:_2560px)]:mb-16 
                        [@media_(min-width:_3840px)]:mb-20 
                        font-['Georgia'] italic leading-tight">
            Legal Advocacy & Compensation
          </i>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                          [@media_(min-width:_2560px)]:text-4xl 
                          [@media_(min-width:_3840px)]:text-5xl 
                          font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center 
                          leading-relaxed 2xl:leading-relaxed 
                          [@media_(min-width:_3840px)]:leading-loose">
            Our legal partners have successfully recovered millions in compensation, helping families cover medical expenses, lost wages, and other financial burdens.
          </div>
        </div>
        
        {/* Card 2: Awareness & Education */}
        <div className="w-full lg:w-1/3 h-auto 
                        min-h-[300px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[450px] 2xl:min-h-[550px] 
                        [@media_(min-width:_2560px)]:min-h-[650px] 
                        [@media_(min-width:_3840px)]:min-h-[800px] 
                        bg-white rounded-2xl 2xl:rounded-3xl 
                        [@media_(min-width:_3840px)]:rounded-[2rem] 
                        shadow-[0px_4px_25px_rgba(39,29,46,0.25)] 
                        2xl:shadow-[0px_6px_35px_rgba(39,29,46,0.3)] 
                        [@media_(min-width:_3840px)]:shadow-[0px_8px_45px_rgba(39,29,46,0.35)] 
                        overflow-hidden p-4 sm:p-6 md:p-6 lg:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20 
                        box-border flex flex-col transition-all duration-300 hover:scale-105">
          <i className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 
                        [@media_(min-width:_2560px)]:text-7xl 
                        [@media_(min-width:_3840px)]:text-8xl 
                        text-[#2e4a7d] block text-center mb-4 sm:mb-6 md:mb-6 lg:mb-8 2xl:mb-12 
                        [@media_(min-width:_2560px)]:mb-16 
                        [@media_(min-width:_3840px)]:mb-20 
                        font-['Georgia'] italic leading-tight">
            Awareness & Education
          </i>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                          [@media_(min-width:_2560px)]:text-4xl 
                          [@media_(min-width:_3840px)]:text-5xl 
                          font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center 
                          leading-relaxed 2xl:leading-relaxed 
                          [@media_(min-width:_3840px)]:leading-loose">
            We provide crucial information about asbestos exposure risks, workplace safety regulations, and legal rights, empowering individuals to protect themselves and their loved ones.
          </div>
        </div>
        
        {/* Card 3: Prevention Strategies */}
        <div className="w-full lg:w-1/3 h-auto 
                        min-h-[300px] sm:min-h-[350px] md:min-h-[300px] lg:min-h-[450px] 2xl:min-h-[550px] 
                        [@media_(min-width:_2560px)]:min-h-[650px] 
                        [@media_(min-width:_3840px)]:min-h-[800px] 
                        bg-white rounded-2xl 2xl:rounded-3xl 
                        [@media_(min-width:_3840px)]:rounded-[2rem] 
                        shadow-[0px_4px_25px_rgba(39,29,46,0.25)] 
                        2xl:shadow-[0px_6px_35px_rgba(39,29,46,0.3)] 
                        [@media_(min-width:_3840px)]:shadow-[0px_8px_45px_rgba(39,29,46,0.35)] 
                        overflow-hidden p-4 sm:p-6 md:p-6 lg:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20 
                        box-border flex flex-col transition-all duration-300 hover:scale-105">
          <i className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 
                        [@media_(min-width:_2560px)]:text-7xl 
                        [@media_(min-width:_3840px)]:text-8xl 
                        text-[#2e4a7d] block text-center mb-4 sm:mb-6 md:mb-6 lg:mb-8 2xl:mb-12 
                        [@media_(min-width:_2560px)]:mb-16 
                        [@media_(min-width:_3840px)]:mb-20 
                        font-['Georgia'] italic leading-tight">
            Prevention Strategies
          </i>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                          [@media_(min-width:_2560px)]:text-4xl 
                          [@media_(min-width:_3840px)]:text-5xl 
                          font-helvetica text-[#4b2c5e] text-center flex-grow flex items-center justify-center 
                          leading-relaxed 2xl:leading-relaxed 
                          [@media_(min-width:_3840px)]:leading-loose">
            We educate workers, homeowners, and businesses to reduce asbestos risks. Our guidance helps identify and handle asbestos safely to prevent future cases.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs4;