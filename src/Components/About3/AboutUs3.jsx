import React from 'react';
import VectorSvg from '../../assets/au3(3).svg';
import VectorPng from '../../assets/au3(2).svg';
import GroupSvg from '../../assets/au3(1).svg';

const AboutUs3 = () => {
  return (
    <div className="relative w-full h-auto bg-[#faf3ec] flex items-center justify-center 
                    py-6 md:py-8 lg:py-12 xl:py-8 2xl:py-16 
                    [@media_(min-width:_2560px)]:py-20 
                    [@media_(min-width:_3840px)]:py-24
                    px-4 lg:px-8 xl:px-12 2xl:px-4 
                    [@media_(min-width:_2560px)]:px-6 
                    [@media_(min-width:_3840px)]:px-8">
      <div className="relative w-full max-w-[1280px] lg:max-w-[1400px] xl:max-w-[1500px] 2xl:max-w-[1600px] 
                      [@media_(min-width:_2560px)]:max-w-[2000px] 
                      [@media_(min-width:_3840px)]:max-w-[2800px] 
                      min-h-[900px] md:min-h-[1100px] lg:min-h-[1200px] xl:min-h-[1200px] 2xl:min-h-[1500px] 
                      [@media_(min-width:_2560px)]:min-h-[1800px] 
                      [@media_(min-width:_3840px)]:min-h-[2400px] 
                      mx-auto overflow-hidden bg-white 
                      text-base md:text-[20px] lg:text-[24px] xl:text-[24px] 2xl:text-[30px] 
                      [@media_(min-width:_2560px)]:text-[36px] 
                      [@media_(min-width:_3840px)]:text-[48px] 
                      font-helvetica px-4 md:px-8 lg:px-20 xl:px-24 2xl:px-8 
                      [@media_(min-width:_2560px)]:px-12 
                      [@media_(min-width:_3840px)]:px-16 
                      shadow-lg rounded-lg 2xl:rounded-xl 
                      [@media_(min-width:_3840px)]:rounded-2xl">
        
        {/* Mission Section */}
        <div className="relative md:absolute mt-8 md:mt-0 
                        md:top-[180px] 2xl:top-[220px] 
                        [@media_(min-width:_2560px)]:top-[280px] 
                        [@media_(min-width:_3840px)]:top-[360px] 
                        left-0 md:left-[calc(50%-350px)] lg:left-[calc(34%-320px)] xl:left-[calc(50%-560px)] 
                        2xl:left-[calc(50%-600px)] 
                        [@media_(min-width:_2560px)]:left-[calc(50%-700px)] 
                        [@media_(min-width:_3840px)]:left-[calc(50%-900px)] 
                        w-full md:w-[700px] lg:w-[640px] xl:w-[556px] 2xl:w-[700px] 
                        [@media_(min-width:_2560px)]:w-[850px] 
                        [@media_(min-width:_3840px)]:w-[1100px] 
                        h-auto md:h-[220px] lg:h-[205px] xl:h-[205px] 2xl:h-[260px] 
                        [@media_(min-width:_2560px)]:h-[320px] 
                        [@media_(min-width:_3840px)]:h-[420px] 
                        text-3xl md:text-5xl lg:text-6xl xl:text-[96px] 2xl:text-[120px] 
                        [@media_(min-width:_2560px)]:text-[140px] 
                        [@media_(min-width:_3840px)]:text-[180px] 
                        text-[#4b2c5e] font-georgia">
          <i className="block md:inline-block italic font-['Georgia'] mb-4 md:mb-0 md:px-4 lg:px-6 2xl:px-8 
                        [@media_(min-width:_2560px)]:px-10 
                        [@media_(min-width:_3840px)]:px-12">
            Our Mission
          </i>
          <div className="text-base md:text-lg lg:text-2xl xl:text-[24px] 2xl:text-[32px] 
                          [@media_(min-width:_2560px)]:text-[40px] 
                          [@media_(min-width:_3840px)]:text-[52px] 
                          font-helvetica text-black w-full md:w-[450px] lg:w-[640px] xl:w-[556px] 2xl:w-[700px] 
                          [@media_(min-width:_2560px)]:w-[850px] 
                          [@media_(min-width:_3840px)]:w-[1100px] 
                          md:px-4 lg:px-6 2xl:px-8 
                          [@media_(min-width:_2560px)]:px-10 
                          [@media_(min-width:_3840px)]:px-12 
                          leading-relaxed 2xl:leading-relaxed 
                          [@media_(min-width:_3840px)]:leading-loose">
            At Fight for Mesothelioma, our mission is to provide essential resources, legal guidance, and advocacy.
          </div>
          
          {/* Mobile image - visible only on mobile */}
          <div className="block md:hidden mt-6 2xl:mt-8 
                          [@media_(min-width:_3840px)]:mt-10 w-full">
            <img 
              src={GroupSvg} 
              alt="Mesothelioma mission illustration" 
              className="w-full max-w-[320px] 2xl:max-w-[400px] 
                         [@media_(min-width:_2560px)]:max-w-[500px] 
                         [@media_(min-width:_3840px)]:max-w-[640px] 
                         mx-auto object-cover" 
            />
          </div>
        </div>
        
        {/* Graphic Elements - Hidden on mobile, shown on desktop */}
        <img 
          src={VectorPng} 
          alt="" 
          className="hidden md:block absolute top-[calc(17%-231px)] 
                     2xl:top-[calc(17%-290px)] 
                     [@media_(min-width:_2560px)]:top-[calc(17%-360px)] 
                     [@media_(min-width:_3840px)]:top-[calc(17%-400px)] 
                     left-[calc(50%+119px)] 2xl:left-[calc(50%+150px)] 
                     [@media_(min-width:_2560px)]:left-[calc(50%+200px)] 
                     [@media_(min-width:_3840px)]:left-[calc(50%+220px)] 
                     w-[340px] md:w-[420px] lg:w-[540px] xl:w-[540px] 2xl:w-[680px] 
                     [@media_(min-width:_2560px)]:w-[820px] 
                     [@media_(min-width:_3840px)]:w-[900px] 
                     object-cover" 
        />
        
        <img 
          src={GroupSvg} 
          alt="" 
          className="hidden md:block absolute md:h-[29.5%] md:top-[209px] 
                     2xl:top-[260px] 
                     [@media_(min-width:_2560px)]:top-[320px] 
                     [@media_(min-width:_3840px)]:top-[420px] 
                     lg:h-[37.5%] 2xl:h-[40%] 
                     [@media_(min-width:_2560px)]:h-[40%] 
                     [@media_(min-width:_3840px)]:h-[38%] 
                     w-[60.08%] top-[-13.18%] right-[-25%] bottom-[60.68%] left-[48%] 
                     max-w-full max-h-full overflow-hidden lg:top-[185px] 
                     2xl:left-[50%] 
                     [@media_(min-width:_2560px)]:left-[52%] 
                     [@media_(min-width:_3840px)]:left-[50%] 
                     z-[30]" 
        />
        
        {/* Cards Section */}
        <div className="relative md:absolute top-auto md:top-[520px] lg:top-[602px] xl:top-[602px] 
                        2xl:top-[750px] 
                        [@media_(min-width:_2560px)]:top-[920px] 
                        [@media_(min-width:_3840px)]:top-[1200px] 
                        left-0 w-full h-auto md:h-[480px] 2xl:h-[600px] 
                        [@media_(min-width:_2560px)]:h-[750px] 
                        [@media_(min-width:_3840px)]:h-[960px] 
                        mt-8 md:mt-0">
          
          {/* Card 1 */}
          <div className="relative w-full h-[180px] sm:h-[200px] md:h-[200px] lg:h-[220px] xl:h-[220px] 
                          2xl:h-[280px] 
                          [@media_(min-width:_2560px)]:h-[340px] 
                          [@media_(min-width:_3840px)]:h-[440px] 
                          bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.32)] 
                          2xl:shadow-[0px_5px_30px_rgba(46,74,125,0.35)] 
                          [@media_(min-width:_3840px)]:shadow-[0px_7px_40px_rgba(46,74,125,0.4)] 
                          overflow-hidden mb-4 md:mb-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0 2xl:p-0">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[25px] 2xl:top-[30px] 
                         [@media_(min-width:_2560px)]:top-[40px] 
                         [@media_(min-width:_3840px)]:top-[50px] 
                         left-[70%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] 
                         2xl:w-[560px] 
                         [@media_(min-width:_2560px)]:w-[680px] 
                         [@media_(min-width:_3840px)]:w-[900px] 
                         h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px] 
                         2xl:h-[620px] 
                         [@media_(min-width:_2560px)]:h-[750px] 
                         [@media_(min-width:_3840px)]:h-[980px]" 
            />
            <div className="block w-[3px] 2xl:w-[4px] 
                            [@media_(min-width:_2560px)]:w-[5px] 
                            [@media_(min-width:_3840px)]:w-[6px] 
                            h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] 
                            2xl:left-[60px] 
                            [@media_(min-width:_2560px)]:left-[75px] 
                            [@media_(min-width:_3840px)]:left-[90px] 
                            bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] 
                            2xl:pl-[80px] 
                            [@media_(min-width:_2560px)]:pl-[100px] 
                            [@media_(min-width:_3840px)]:pl-[120px] 
                            flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10 
                            2xl:mt-14 
                            [@media_(min-width:_2560px)]:mt-16 
                            [@media_(min-width:_3840px)]:mt-20">
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] 
                            2xl:text-[30px] 
                            [@media_(min-width:_2560px)]:text-[36px] 
                            [@media_(min-width:_3840px)]:text-[48px] 
                            leading-relaxed 2xl:leading-relaxed 
                            [@media_(min-width:_3840px)]:leading-loose">
                Connecting victims with leading mesothelioma attorneys who specialize in asbestos-related claims, ensuring they receive the compensation they deserve.
              </b>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative w-full h-[140px] sm:h-[160px] md:h-[160px] lg:h-[180px] xl:h-[160px] 
                          2xl:h-[200px] 
                          [@media_(min-width:_2560px)]:h-[240px] 
                          [@media_(min-width:_3840px)]:h-[320px] 
                          bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.19)] 
                          2xl:shadow-[0px_5px_30px_rgba(46,74,125,0.25)] 
                          [@media_(min-width:_3840px)]:shadow-[0px_7px_40px_rgba(46,74,125,0.3)] 
                          overflow-hidden mb-4 md:mb-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0 2xl:p-0 mt-4 md:mt-0">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[-120px] 2xl:top-[-150px] 
                         [@media_(min-width:_2560px)]:top-[-180px] 
                         [@media_(min-width:_3840px)]:top-[-240px] 
                         left-[71%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] 
                         2xl:w-[560px] 
                         [@media_(min-width:_2560px)]:w-[680px] 
                         [@media_(min-width:_3840px)]:w-[900px] 
                         h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px] 
                         2xl:h-[620px] 
                         [@media_(min-width:_2560px)]:h-[750px] 
                         [@media_(min-width:_3840px)]:h-[980px]" 
            />
            <div className="block w-[3px] 2xl:w-[4px] 
                            [@media_(min-width:_2560px)]:w-[5px] 
                            [@media_(min-width:_3840px)]:w-[6px] 
                            h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] 
                            2xl:left-[60px] 
                            [@media_(min-width:_2560px)]:left-[75px] 
                            [@media_(min-width:_3840px)]:left-[90px] 
                            bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] 
                            2xl:pl-[80px] 
                            [@media_(min-width:_2560px)]:pl-[100px] 
                            [@media_(min-width:_3840px)]:pl-[120px] 
                            flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10 
                            2xl:mt-14 
                            [@media_(min-width:_2560px)]:mt-16 
                            [@media_(min-width:_3840px)]:mt-20">
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] 
                            2xl:text-[30px] 
                            [@media_(min-width:_2560px)]:text-[36px] 
                            [@media_(min-width:_3840px)]:text-[48px] 
                            leading-relaxed 2xl:leading-relaxed 
                            [@media_(min-width:_3840px)]:leading-loose">
                Raising awareness about the dangers of asbestos exposure, workplace safety, and the legal rights of those affected.
              </b>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="relative w-full h-[140px] sm:h-[160px] md:h-[160px] lg:h-[180px] xl:h-[160px] 
                          2xl:h-[200px] 
                          [@media_(min-width:_2560px)]:h-[240px] 
                          [@media_(min-width:_3840px)]:h-[320px] 
                          bg-[rgba(46,74,125,0.44)] shadow-[0px_3px_20px_rgba(46,74,125,0.19)] 
                          2xl:shadow-[0px_5px_30px_rgba(46,74,125,0.25)] 
                          [@media_(min-width:_3840px)]:shadow-[0px_7px_40px_rgba(46,74,125,0.3)] 
                          overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8 xl:p-0 2xl:p-0 mt-4 md:mt-0 mb-8 
                          2xl:mb-12 
                          [@media_(min-width:_2560px)]:mb-16 
                          [@media_(min-width:_3840px)]:mb-20">
            <img 
              src={VectorSvg} 
              alt="" 
              className="hidden md:block absolute top-[-240px] 2xl:top-[-300px] 
                         [@media_(min-width:_2560px)]:top-[-360px] 
                         [@media_(min-width:_3840px)]:top-[-480px] 
                         left-[72%] w-[200px] md:w-[320px] lg:w-[447.9px] xl:w-[447.9px] 
                         2xl:w-[560px] 
                         [@media_(min-width:_2560px)]:w-[680px] 
                         [@media_(min-width:_3840px)]:w-[900px] 
                         h-[180px] md:h-[320px] lg:h-[491.4px] xl:h-[491.4px] 
                         2xl:h-[620px] 
                         [@media_(min-width:_2560px)]:h-[750px] 
                         [@media_(min-width:_3840px)]:h-[980px]" 
            />
            <div className="block w-[3px] 2xl:w-[4px] 
                            [@media_(min-width:_2560px)]:w-[5px] 
                            [@media_(min-width:_3840px)]:w-[6px] 
                            h-[385%] absolute top-[0%] left-[18px] sm:left-[25px] md:left-[50px] lg:left-[70px] xl:left-[50px] 
                            2xl:left-[60px] 
                            [@media_(min-width:_2560px)]:left-[75px] 
                            [@media_(min-width:_3840px)]:left-[90px] 
                            bg-[#f7ede3] z-20"></div>
            <div className="w-full md:w-[80%] h-auto pl-[18px] sm:pl-[35px] md:pl-[70px] lg:pl-[90px] xl:pl-[70px] 
                            2xl:pl-[80px] 
                            [@media_(min-width:_2560px)]:pl-[100px] 
                            [@media_(min-width:_3840px)]:pl-[120px] 
                            flex items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-10 
                            2xl:mt-14 
                            [@media_(min-width:_2560px)]:mt-16 
                            [@media_(min-width:_3840px)]:mt-20">
              <b className="text-white font-helvetica text-left w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] 
                            2xl:text-[30px] 
                            [@media_(min-width:_2560px)]:text-[36px] 
                            [@media_(min-width:_3840px)]:text-[48px] 
                            leading-relaxed 2xl:leading-relaxed 
                            [@media_(min-width:_3840px)]:leading-loose">
                Preventing future cases by sharing vital information on how to recognize and minimize asbestos exposure risks.
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs3;