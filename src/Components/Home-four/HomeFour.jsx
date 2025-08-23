import React from 'react';
import leftSvg from "../../assets/images/left.svg";
import rightSvg from "../../assets/images/left.svg";
import Frame from "../../assets/Frame 87.png";

function HomeFour() {
    return (
        <>
    {/* Desktop Version */}
<div className="hidden md:block">
    <div className="flex justify-center items-center h-auto bg-[#FAF3EC] 
                    py-8 md:py-6 lg:py-8 2xl:py-12 
                    [@media_(min-width:_2560px)]:py-16 
                    [@media_(min-width:_3840px)]:py-20">
        <div className="flex items-center text-center max-w-[1400px] 2xl:max-w-[1900px] 
                        [@media_(min-width:_2560px)]:max-w-[2400px] 
                        [@media_(min-width:_3840px)]:max-w-[3200px] 
                        p-10 md:p-6 lg:p-10 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-16 
                        [@media_(min-width:_3840px)]:p-20 
                        relative">
            <img src={leftSvg} alt="left" 
                 className="w-full h-full absolute z-10 ml-[-10%] md:ml-[-5%] lg:ml-[-10%] 
                            2xl:ml-[-12%] 
                            [@media_(min-width:_2560px)]:ml-[-14%] 
                            [@media_(min-width:_3840px)]:ml-[-16%]" />
            <p className="text-[#2E4A7D] text-center font-georgia italic font-bold 
                          text-[32px] md:text-[20px] lg:text-[32px] 2xl:text-[50px] 
                          [@media_(min-width:_2560px)]:text-[60px] 
                          [@media_(min-width:_3840px)]:text-[76px] 
                          leading-normal [font-feature-settings:'dlig'_on] 
                          px-10 md:px-6 lg:px-10 2xl:px-12 
                          [@media_(min-width:_2560px)]:px-16 
                          [@media_(min-width:_3840px)]:px-20">
                Decades ago, asbestos was everywhere on job sites, in homes, even in
                military uniforms. No one knew the dangers. No one said it could
                remain in the body for years, silently causing harm.
            </p>
            <img src={rightSvg} alt="right" 
                 className="w-full h-full absolute z-10 ml-16 md:ml-8 lg:ml-16 
                            2xl:ml-20 
                            [@media_(min-width:_2560px)]:ml-24 
                            [@media_(min-width:_3840px)]:ml-32" />
        </div>
    </div>
    <div className='bg-[#FAF3EC] py-16 md:py-8 lg:py-16 2xl:py-20 
                     [@media_(min-width:_2560px)]:py-24 
                     [@media_(min-width:_3840px)]:py-32'>
        <div className="flex items-center max-w-[105rem] 2xl:max-w-[120rem] 
                        [@media_(min-width:_2560px)]:max-w-[140rem] 
                        [@media_(min-width:_3840px)]:max-w-[180rem] 
                        mx-auto md:flex-col lg:flex-row md:max-w-[90%] lg:max-w-[105rem] 
                        2xl:lg:max-w-[120rem] 
                        [@media_(min-width:_2560px)]:lg:max-w-[140rem] 
                        [@media_(min-width:_3840px)]:lg:max-w-[180rem]">
            <div className="w-1/2 md:w-full lg:w-1/2 md:flex md:justify-center">
                <img src={Frame} alt="right" 
                     className="w-[393px] h-[563px] md:w-[280px] md:h-[400px] lg:w-[393px] lg:h-[563px] 
                                2xl:w-[560px] 2xl:h-[800px] 
                                [@media_(min-width:_2560px)]:w-[680px] [@media_(min-width:_2560px)]:h-[970px] 
                                [@media_(min-width:_3840px)]:w-[860px] [@media_(min-width:_3840px)]:h-[1230px] 
                                object-cover rounded-lg 2xl:rounded-xl 
                                [@media_(min-width:_3840px)]:rounded-2xl" />
            </div>
            <div className="w-2/3 md:w-full lg:w-2/3 pl-12 md:pl-0 lg:pl-4 xl:pl-4 2xl:pl-6 
                            [@media_(min-width:_2560px)]:pl-8 
                            [@media_(min-width:_3840px)]:pl-12 
                            mt-64 md:mt-8 lg:mt-64 2xl:mt-72 
                            [@media_(min-width:_2560px)]:mt-80 
                            [@media_(min-width:_3840px)]:mt-96 
                            md:text-center lg:text-left">
                <h1 className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-georgia italic font-normal 
                               text-[80px] md:text-[48px] lg:text-[80px] 2xl:text-[140px] 
                               [@media_(min-width:_2560px)]:text-[160px] 
                               [@media_(min-width:_3840px)]:text-[200px] 
                               leading-none">
                    <div>What is</div>
                    <div>Mesothelioma?</div>
                </h1>
                <p className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-helvetica 
                              text-[24px] md:text-[18px] lg:text-[24px] 2xl:text-[39px] 
                              [@media_(min-width:_2560px)]:text-[46px] 
                              [@media_(min-width:_3840px)]:text-[58px] 
                              leading-normal 2xl:leading-relaxed 
                              [@media_(min-width:_3840px)]:leading-loose 
                              mt-6 2xl:mt-8 
                              [@media_(min-width:_2560px)]:mt-10 
                              [@media_(min-width:_3840px)]:mt-12 
                              max-w-[900px] md:max-w-full lg:max-w-[900px] 2xl:max-w-[1200px] 
                              [@media_(min-width:_2560px)]:max-w-[1400px] 
                              [@media_(min-width:_3840px)]:max-w-[1800px]">
                    <span className="font-bold">Mesothelioma </span> is a rare and aggressive cancer caused by <span className="font-bold">asbestos exposure</span>,
                    affecting the lungs, abdomen, or heart. It can take decades to develop, but once diagnosed,
                    it progresses quickly. Legal options may help secure compensation.
                </p>
            </div>
        </div>
    </div>
</div>

         {/* Mobile Version - Fully Responsive */}
<div className="block md:hidden bg-[#FAF3EC] mt-[-20%] 2xl:mt-[-18%] 
                [@media_(min-width:_2560px)]:mt-[-16%] 
                [@media_(min-width:_3840px)]:mt-[-14%]">
    {/* Quote Section */}
    <div className="flex justify-center items-center h-auto bg-[#FAF3EC] 
                    py-4 sm:py-6 2xl:py-8 
                    [@media_(min-width:_2560px)]:py-10 
                    [@media_(min-width:_3840px)]:py-12">
        <div className="flex items-center text-center max-w-[1400px] 2xl:max-w-[1600px] 
                        [@media_(min-width:_2560px)]:max-w-[1900px] 
                        [@media_(min-width:_3840px)]:max-w-[2400px] 
                        p-6 sm:p-8 md:p-10 2xl:p-12 
                        [@media_(min-width:_2560px)]:p-14 
                        [@media_(min-width:_3840px)]:p-16 
                        relative">
            {/* Left SVG - Background decorative element */}
            <img src={leftSvg} alt="left" 
                 className="w-[100px] h-[146px] sm:w-[120px] sm:h-[176px] md:w-[153px] md:h-[224px] 2xl:w-[183px] 2xl:h-[268px] 
                            [@media_(min-width:_2560px)]:w-[220px] [@media_(min-width:_2560px)]:h-[322px] 
                            [@media_(min-width:_3840px)]:w-[275px] [@media_(min-width:_3840px)]:h-[403px] 
                            absolute z-10 ml-[14%] 2xl:ml-[15%] 
                            [@media_(min-width:_2560px)]:ml-[16%] 
                            [@media_(min-width:_3840px)]:ml-[17%]" />
            
            {/* Centered text content over background SVGs */}
            <p className="text-[#2E4A7D] text-center font-georgia italic font-bold 
                          text-sm sm:text-base md:text-[17px] 2xl:text-[20px] 
                          [@media_(min-width:_2560px)]:text-[24px] 
                          [@media_(min-width:_3840px)]:text-[30px] 
                          p-3 sm:p-4 md:p-5 2xl:p-6 
                          [@media_(min-width:_2560px)]:p-7 
                          [@media_(min-width:_3840px)]:p-8 
                          leading-normal [font-feature-settings:'dlig'_on] 
                          px-6 sm:px-8 md:px-10 2xl:px-12 
                          [@media_(min-width:_2560px)]:px-14 
                          [@media_(min-width:_3840px)]:px-16 
                          w-[280px] sm:w-[350px] md:w-[478px] 2xl:w-[550px] 
                          [@media_(min-width:_2560px)]:w-[650px] 
                          [@media_(min-width:_3840px)]:w-[800px] 
                          relative z-20">
                Decades ago, asbestos was everywhere on job sites, in homes, even in
                military uniforms. No one knew the dangers. No one said it could
                remain in the body for years, silently causing harm.
            </p>
            
            {/* Right SVG - Background decorative element */}
            <img src={rightSvg} alt="right" 
                 className="w-[100px] h-[146px] sm:w-[120px] sm:h-[176px] md:w-[153px] md:h-[224px] 2xl:w-[183px] 2xl:h-[268px] 
                            [@media_(min-width:_2560px)]:w-[220px] [@media_(min-width:_2560px)]:h-[322px] 
                            [@media_(min-width:_3840px)]:w-[275px] [@media_(min-width:_3840px)]:h-[403px] 
                            absolute z-10 ml-[45%] 2xl:ml-[46%] 
                            [@media_(min-width:_2560px)]:ml-[47%] 
                            [@media_(min-width:_3840px)]:ml-[48%]" />
        </div>
    </div>

    {/* Content Section */}
    <div className="px-4 sm:px-6 2xl:px-8 
                    [@media_(min-width:_2560px)]:px-10 
                    [@media_(min-width:_3840px)]:px-12 
                    pb-8 sm:pb-12 2xl:pb-16 
                    [@media_(min-width:_2560px)]:pb-20 
                    [@media_(min-width:_3840px)]:pb-24">
        <div className="flex flex-col items-center">
            <img
                src={Frame}
                alt="Mesothelioma"
                className="w-full max-w-[280px] sm:max-w-[300px] 2xl:max-w-[360px] 
                           [@media_(min-width:_2560px)]:max-w-[430px] 
                           [@media_(min-width:_3840px)]:max-w-[540px] 
                           h-auto mb-6 sm:mb-8 2xl:mb-10 
                           [@media_(min-width:_2560px)]:mb-12 
                           [@media_(min-width:_3840px)]:mb-16 
                           rounded-lg 2xl:rounded-xl 
                           [@media_(min-width:_3840px)]:rounded-2xl"
            />
            <div className="text-center w-full max-w-none">
                <h1 className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-georgia italic font-normal 
                               text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 
                               [@media_(min-width:_2560px)]:text-6xl 
                               [@media_(min-width:_3840px)]:text-7xl 
                               leading-tight mb-3 sm:mb-4 2xl:mb-5 
                               [@media_(min-width:_2560px)]:mb-6 
                               [@media_(min-width:_3840px)]:mb-8 
                               text-left">
                    What is<br />Mesothelioma?
                </h1>
                <p className="text-[#4B2C5E] [font-feature-settings:'dlig'_on] font-helvetica 
                              text-sm sm:text-base 2xl:text-lg 
                              [@media_(min-width:_2560px)]:text-xl 
                              [@media_(min-width:_3840px)]:text-2xl 
                              leading-normal 2xl:leading-relaxed 
                              [@media_(min-width:_3840px)]:leading-loose 
                              text-left">
                    <span className="font-bold">Mesothelioma </span> is a rare and aggressive cancer caused by <span className="font-bold">asbestos exposure</span>,
                    affecting the lungs, abdomen, or heart. It can take decades to develop, but once diagnosed,
                    it progresses quickly. Legal options may help secure compensation.
                </p>
            </div>
        </div>
    </div>
</div>
        </>
    );
}

export default HomeFour;