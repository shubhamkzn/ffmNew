import React from 'react';
import whyus1 from '../../assets//whyUs1.jpg';
import whyus1png from '../../assets/whyus1svg.png';
import whyus2 from '../../assets/whyus2.png';
import whyus3 from '../../assets/whyus3.png';

const AboutUs5 = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[100px] md:pt-[200px] 2xl:pt-[300px] relative -top-[100px] md:-top-[150px] 2xl:-top-[200px] px-4 md:px-8 2xl:px-12">

      {/* Header */}
      <div className="mb-8 md:mb-12 2xl:mb-16 mt-5">
        <h1 className="text-[48px] md:text-[96px] 2xl:text-[140px] text-[#2e4a7d] text-center font-georgia italic inline-block
                       [&_@media_(min-width:_2560px)]:text-[180px] 
                       [&_@media_(min-width:_3840px)]:text-[220px]">
          Why Us?
        </h1>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-12 
                      max-w-7xl 2xl:max-w-[1400px] w-full
                      [@media_(min-width:_2560px)]:max-w-[1800px] [@media_(min-width:_2560px)]:gap-16
                      [@media_(min-width:_3840px)]:max-w-[2800px] [@media_(min-width:_3840px)]:gap-20">
        
        {/* Card 1 */}
        <div className="bg-[#F3E2C88F] rounded-2xl 2xl:rounded-3xl overflow-hidden 
                        p-6 md:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20
                        text-left transition-all duration-300 hover:scale-105">
          <img src={whyus1png} alt="Legal Support" 
               className="w-full h-[120px] md:h-[150px] 2xl:h-[200px] 
                          [@media_(min-width:_2560px)]:h-[250px] 
                          [@media_(min-width:_3840px)]:h-[320px] 
                          object-contain mb-4 2xl:mb-6 
                          [@media_(min-width:_3840px)]:mb-8" />
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl 
                         [@media_(min-width:_2560px)]:text-5xl 
                         [@media_(min-width:_3840px)]:text-6xl 
                         text-[#2e4a7d] mb-3 md:mb-4 2xl:mb-6 
                         [@media_(min-width:_3840px)]:mb-8 
                         font-['Georgia'] italic">
            Top-Tier Legal Support
          </h2>
          <p className="text-base md:text-lg 2xl:text-xl 
                        [@media_(min-width:_2560px)]:text-2xl 
                        [@media_(min-width:_3840px)]:text-3xl 
                        text-[#4b2c5e] font-helvetica leading-relaxed 
                        2xl:leading-relaxed [@media_(min-width:_3840px)]:leading-loose">
            Our partnered mesothelioma attorneys specialize in asbestos-related lawsuits and have a proven track record of success.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F3E2C88F] rounded-2xl 2xl:rounded-3xl overflow-hidden 
                        p-6 md:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20
                        text-left transition-all duration-300 hover:scale-105">
          <img src={whyus2} alt="No Upfront Costs" 
               className="w-full h-[120px] md:h-[150px] 2xl:h-[200px] 
                          [@media_(min-width:_2560px)]:h-[250px] 
                          [@media_(min-width:_3840px)]:h-[320px] 
                          object-contain mb-4 2xl:mb-6 
                          [@media_(min-width:_3840px)]:mb-8" />
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl 
                         [@media_(min-width:_2560px)]:text-5xl 
                         [@media_(min-width:_3840px)]:text-6xl 
                         text-[#2e4a7d] mb-3 md:mb-4 2xl:mb-6 
                         [@media_(min-width:_3840px)]:mb-8 
                         font-['Georgia'] italic">
            No Upfront Costs
          </h2>
          <p className="text-base md:text-lg 2xl:text-xl 
                        [@media_(min-width:_2560px)]:text-2xl 
                        [@media_(min-width:_3840px)]:text-3xl 
                        text-[#4b2c5e] font-helvetica leading-relaxed 
                        2xl:leading-relaxed [@media_(min-width:_3840px)]:leading-loose">
            You pay nothing unless we win your case.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F3E2C88F] rounded-2xl 2xl:rounded-3xl overflow-hidden 
                        p-6 md:p-8 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20
                        text-left transition-all duration-300 hover:scale-105">
          <img src={whyus3} alt="Comprehensive Resources" 
               className="w-full h-[120px] md:h-[150px] 2xl:h-[200px] 
                          [@media_(min-width:_2560px)]:h-[250px] 
                          [@media_(min-width:_3840px)]:h-[320px] 
                          object-contain mb-4 2xl:mb-6 
                          [@media_(min-width:_3840px)]:mb-8" />
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl 
                         [@media_(min-width:_2560px)]:text-5xl 
                         [@media_(min-width:_3840px)]:text-6xl 
                         text-[#2e4a7d] mb-3 md:mb-4 2xl:mb-6 
                         [@media_(min-width:_3840px)]:mb-8 
                         font-['Georgia'] italic">
            Comprehensive Resources
          </h2>
          <p className="text-base md:text-lg 2xl:text-xl 
                        [@media_(min-width:_2560px)]:text-2xl 
                        [@media_(min-width:_3840px)]:text-3xl 
                        text-[#4b2c5e] font-helvetica leading-relaxed 
                        2xl:leading-relaxed [@media_(min-width:_3840px)]:leading-loose">
            Get access to the latest information on legal rights, compensation, and asbestos exposure.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs5;