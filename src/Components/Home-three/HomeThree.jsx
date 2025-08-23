import React from 'react';
import SeniorImage from '../../assets/Vector (1).png';
import heart from '../../assets/Frame 84.png';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'

function HomeThree() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ClaimForm');
  };

  return (

    <>
      {/* Desktop Version - customDesktop and up (≥1024px) */}
      <section className="hidden customDesktop:block w-full bg-[#FAF3EC] font-helvetica text-[#4B2C5E] overflow-hidden">
        <div className="relative w-full py-[10px] 2xl:py-[15px] 
                        [@media_(min-width:_2560px)]:py-[20px] 
                        [@media_(min-width:_3840px)]:py-[30px]">
          <div className="relative max-w-[1200px] 2xl:max-w-[1600px] 
                          [@media_(min-width:_2560px)]:max-w-[2000px] 
                          [@media_(min-width:_3840px)]:max-w-[2800px] 
                          mx-auto px-[40px] 2xl:px-[50px] 
                          [@media_(min-width:_2560px)]:px-[60px] 
                          [@media_(min-width:_3840px)]:px-[80px]">
            <h3 className="font-georgia text-[clamp(60px,7vw,80px)] 2xl:text-[clamp(80px,8vw,96px)] 
                           [@media_(min-width:_2560px)]:text-[clamp(96px,9vw,110px)] 
                           [@media_(min-width:_3840px)]:text-[clamp(110px,10vw,120px)] 
                           font-normal italic leading-[1.14] text-[#4B2C5E] text-left 
                           mt-[50%] 
                           [@media_(min-width:_2560px)]:mt-[20%] 
                           [@media_(min-width:_3840px)]:mt-[15%] 
                           ml-[4%]">
              <div className=" text-left ml-[-8%]">YOU GAVE EVERYTHING, </div>
              <div className="text-[#4B2C5E]/60 ml-[-8%]">BUT NO ONE WARNED YOU ABOUT ASBESTOS</div>
            </h3>

            <div className="flex mt-10 2xl:mt-12 
                            [@media_(min-width:_2560px)]:mt-16 
                            [@media_(min-width:_3840px)]:mt-20">
              <div className="w-1/2 max-w-[690px] 2xl:max-w-[900px] 
                              [@media_(min-width:_2560px)]:max-w-[1100px] 
                              [@media_(min-width:_3840px)]:max-w-[1400px] 
                              flex-shrink-0">
                <p className="text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                              [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                              [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                              leading-[1.5] mt-[21px] 2xl:mt-[28px] 
                              [@media_(min-width:_2560px)]:mt-[35px] 
                              [@media_(min-width:_3840px)]:mt-[42px] 
                              text-[#4B2C5E]">
                  You gave your all-for your family, your future, even your country. But no one warned you that a single invisible fiber could change everything.
                </p>
                <p className="text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                              [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                              [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                              leading-[1.5] mb-[20px] 2xl:mb-[26px] 
                              [@media_(min-width:_2560px)]:mb-[32px] 
                              [@media_(min-width:_3840px)]:mb-[40px] 
                              text-[#4B2C5E]">
                  Asbestos was everywhere-on job sites, in homes, even in uniforms. Decades later, mesothelioma now reveals the danger no one saw coming.
                </p>
                <p className="text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                              [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                              [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                              leading-[1.5] mb-[20px] 2xl:mb-[26px] 
                              [@media_(min-width:_2560px)]:mb-[32px] 
                              [@media_(min-width:_3840px)]:mb-[40px] 
                              text-[#4B2C5E]">
                  Nearly two-thirds of those diagnosed are over 65. The disease can stay hidden for decades, making the journey especially difficult for seniors. But you don't have to face it alone.
                </p>
                <p className="text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                              [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                              [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                              leading-[1.5] mb-[20px] 2xl:mb-[26px] 
                              [@media_(min-width:_2560px)]:mb-[32px] 
                              [@media_(min-width:_3840px)]:mb-[40px] 
                              text-[#4B2C5E]">
                  With the right medical support, legal guidance, and compassionate care-there's a way forward.
                </p>
                <p className="text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                              [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                              [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                              leading-[1.5] mb-[20px] 2xl:mb-[26px] 
                              [@media_(min-width:_2560px)]:mb-[32px] 
                              [@media_(min-width:_3840px)]:mb-[40px] 
                              text-[#4B2C5E]">
                  Our experienced legal experts don't just support you-they &nbsp;
                  <NavLink
                    to="/ClaimForm"
                    className={({ isActive }) =>
                      `font-helvetica font-normal text-[clamp(20px,2.2vw,24px)] 2xl:text-[clamp(28px,2.5vw,32px)] 
                       [@media_(min-width:_2560px)]:text-[clamp(36px,3vw,40px)] 
                       [@media_(min-width:_3840px)]:text-[clamp(46px,3.5vw,52px)] 
                       italic cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                      }`
                    }
                  >
                    <span><b>fight for you with compassion and clarity</b></span>.
                  </NavLink>
                </p>
              </div>
              <div className="w-1/2 flex justify-center items-center 
                              min-w-[180px] min-h-[180px] md:min-w-[220px] md:min-h-[220px] 
                              2xl:min-w-[280px] 2xl:min-h-[280px] 
                              [@media_(min-width:_2560px)]:min-w-[340px] [@media_(min-width:_2560px)]:min-h-[340px] 
                              [@media_(min-width:_3840px)]:min-w-[420px] [@media_(min-width:_3840px)]:min-h-[420px] 
                              md:overflow-x-auto">
                <img
                  src={SeniorImage}
                  alt="Senior patient"
                  className="object-cover md:object-fill lg:object-contain rounded-[8px] 2xl:rounded-[12px] 
                             [@media_(min-width:_2560px)]:rounded-[16px] 
                             [@media_(min-width:_3840px)]:rounded-[20px] 
                             w-full h-full min-w-[180px] min-h-[180px] md:min-w-[340px] md:min-h-[340px] 
                             2xl:min-w-[420px] 2xl:min-h-[420px] 
                             [@media_(min-width:_2560px)]:min-w-[500px] [@media_(min-width:_2560px)]:min-h-[500px] 
                             [@media_(min-width:_3840px)]:min-w-[640px] [@media_(min-width:_3840px)]:min-h-[640px] 
                             max-w-full max-h-[690px] 2xl:max-h-[900px] 
                             [@media_(min-width:_2560px)]:max-h-[1100px] 
                             [@media_(min-width:_3840px)]:max-h-[1400px] 
                             aspect-square"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet Version - md to customDesktop (768px to 1023px) */}
      <section className="hidden md:block customDesktop:hidden w-full bg-[#FAF3EC] font-helvetica text-[#4B2C5E] 
                          py-12 2xl:py-16 
                          [@media_(min-width:_2560px)]:py-20 
                          [@media_(min-width:_3840px)]:py-24 
                          px-8 2xl:px-12 
                          [@media_(min-width:_2560px)]:px-16 
                          [@media_(min-width:_3840px)]:px-20">
        <div className="flex flex-col items-center max-w-4xl 2xl:max-w-5xl 
                        [@media_(min-width:_2560px)]:max-w-6xl 
                        [@media_(min-width:_3840px)]:max-w-7xl 
                        mx-auto">
          {/* Content - image first on tablet (following mobile logic) */}
          <div className="w-full flex justify-center mb-10 2xl:mb-12 
                          [@media_(min-width:_2560px)]:mb-16 
                          [@media_(min-width:_3840px)]:mb-20">
            <img
              src={SeniorImage}
              alt="Senior patient"
              className="w-full max-w-[500px] 2xl:max-w-[600px] 
                         [@media_(min-width:_2560px)]:max-w-[720px] 
                         [@media_(min-width:_3840px)]:max-w-[900px] 
                         rounded-[8px] 2xl:rounded-[12px] 
                         [@media_(min-width:_2560px)]:rounded-[16px] 
                         [@media_(min-width:_3840px)]:rounded-[20px]"
            />
          </div>

          {/* Headings - centered on tablet */}
          <h3 className="font-georgia text-[clamp(40px,6vw,48px)] lg:text-[clamp(48px,6.5vw,56px)] 2xl:text-[clamp(60px,7vw,68px)] 
                         [@media_(min-width:_2560px)]:text-[clamp(72px,7.5vw,80px)] 
                         [@media_(min-width:_3840px)]:text-[clamp(86px,8vw,96px)] 
                         font-normal italic leading-[1.2] text-[#4B2C5E] 
                         mb-10 2xl:mb-12 
                         [@media_(min-width:_2560px)]:mb-16 
                         [@media_(min-width:_3840px)]:mb-20 
                         text-center">
            <div className="text-[#4B2C5E] mb-2 2xl:mb-3 
                            [@media_(min-width:_2560px)]:mb-4 
                            [@media_(min-width:_3840px)]:mb-5">
              YOU GAVE EVERYTHING,
            </div>
            <div className="text-[#4B2C5E]/60">
              BUT NO ONE WARNED YOU ABOUT ASBESTOS
            </div>
          </h3>

          {/* Text content - centered and responsive on tablet */}
          <div className="w-full max-w-3xl 2xl:max-w-4xl 
                          [@media_(min-width:_2560px)]:max-w-5xl 
                          [@media_(min-width:_3840px)]:max-w-6xl 
                          text-center">
            <p className="text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              You gave your all-for your family, your future, even your country. But no one warned you that a single invisible fiber could change everything.
            </p>
            <p className="text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Asbestos was everywhere-on job sites, in homes, even in uniforms. Decades later, mesothelioma now reveals the danger no one saw coming.
            </p>
            <p className="text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Nearly two-thirds of those diagnosed are over 65. The disease can stay hidden for decades, making the journey especially difficult for seniors. But you don't have to face it alone.
            </p>
            <p className="text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              With the right medical support, legal guidance, and compassionate care-there's a way forward.
            </p>
            <p className="text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Our experienced legal experts don't just support you-they &nbsp;
              <NavLink
                to="/ClaimForm"
                className={({ isActive }) =>
                  `font-helvetica font-normal text-[clamp(18px,2.5vw,20px)] lg:text-[clamp(20px,2.8vw,22px)] 2xl:text-[clamp(24px,3vw,28px)] 
                   [@media_(min-width:_2560px)]:text-[clamp(30px,3.2vw,34px)] 
                   [@media_(min-width:_3840px)]:text-[clamp(38px,3.5vw,42px)] 
                   italic cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                  }`
                }
              >
                <span><b>fight for you with compassion and clarity</b></span>.
              </NavLink>
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Version - below md (<768px) */}
      <section className="block md:hidden w-full bg-[#FAF3EC] font-helvetica text-[#4B2C5E] 
                          py-10 2xl:py-12 
                          [@media_(min-width:_2560px)]:py-16 
                          [@media_(min-width:_3840px)]:py-20 
                          px-5 2xl:px-6 
                         
                          [@media_(min-width:_2560px)]:px-8 
                          [@media_(min-width:_3840px)]:px-10">
        <div className="flex flex-col items-center">
          {/* Content - image first on mobile */}
          <div className="w-full flex justify-center mb-8 2xl:mb-10 
                          [@media_(min-width:_2560px)]:mb-12 
                          [@media_(min-width:_3840px)]:mb-16">
            <img
              src={SeniorImage}
              alt="Senior patient"
              className="w-full max-w-[400px] 2xl:max-w-[480px] 
                         [@media_(min-width:_2560px)]:max-w-[580px] 
                         [@media_(min-width:_3840px)]:max-w-[720px] 
                         rounded-[8px] 2xl:rounded-[10px] 
                         [@media_(min-width:_2560px)]:rounded-[12px] 
                         [@media_(min-width:_3840px)]:rounded-[16px]"
            />
          </div>

          {/* Headings - stacked and centered */}
          <h3 className="font-georgia text-[clamp(28px,8vw,32px)] 2xl:text-[clamp(34px,8.5vw,38px)] 
                         [@media_(min-width:_2560px)]:text-[clamp(42px,9vw,46px)] 
                         [@media_(min-width:_3840px)]:text-[clamp(50px,9.5vw,56px)] 
                         font-normal italic leading-[1.2] text-[#4B2C5E] 
                         mb-8 2xl:mb-10 
                         [@media_(min-width:_2560px)]:mb-12 
                         [@media_(min-width:_3840px)]:mb-16 
                         text-center">
            <div className="text-[#4B2C5E] font-georgia text-[clamp(20px,6vw,24px)] 2xl:text-[clamp(24px,6.5vw,28px)] 
                            [@media_(min-width:_2560px)]:text-[clamp(30px,7vw,34px)] 
                            [@media_(min-width:_3840px)]:text-[clamp(38px,7.5vw,42px)] 
                            italic font-normal leading-tight 
                            mb-2 2xl:mb-3 
                            [@media_(min-width:_2560px)]:mb-4 
                            [@media_(min-width:_3840px)]:mb-5">
              YOU GAVE EVERYTHING,
            </div>
            <div className="text-[#4B2C5E]/70 font-georgia text-[clamp(20px,6vw,24px)] 2xl:text-[clamp(24px,6.5vw,28px)] 
                            [@media_(min-width:_2560px)]:text-[clamp(30px,7vw,34px)] 
                            [@media_(min-width:_3840px)]:text-[clamp(38px,7.5vw,42px)] 
                            italic font-normal leading-tight">
              BUT NO ONE WARNED YOU ABOUT ASBESTOS
            </div>
          </h3>

          {/* Text content - full width on mobile */}
          <div className="w-full">
            <p className="text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              You gave your all-for your family, your future, even your country. But no one warned you that a single invisible fiber could change everything.
            </p>
            <p className="text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Asbestos was everywhere-on job sites, in homes, even in uniforms. Decades later, mesothelioma now reveals the danger no one saw coming.
            </p>
            <p className="text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Nearly two-thirds of those diagnosed are over 65. The disease can stay hidden for decades, making the journey especially difficult for seniors. But you don't have to face it alone.
            </p>
            <p className="text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              With the right medical support, legal guidance, and compassionate care-there's a way forward.
            </p>
            <p className="text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                          [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                          [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                          leading-[1.5] text-[#4B2C5E] 
                          mb-6 2xl:mb-8 
                          [@media_(min-width:_2560px)]:mb-10 
                          [@media_(min-width:_3840px)]:mb-12">
              Our experienced legal experts don't just support you-they &nbsp;
              <NavLink
                to="/ClaimForm"
                className={({ isActive }) =>
                  `font-helvetica font-normal text-[clamp(14px,4vw,16px)] 2xl:text-[clamp(18px,4.2vw,20px)] 
                   [@media_(min-width:_2560px)]:text-[clamp(22px,4.5vw,24px)] 
                   [@media_(min-width:_3840px)]:text-[clamp(28px,5vw,30px)] 
                   cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                  }`
                }
              >
                <span><b>fight for you with compassion and clarity</b></span>.
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeThree;