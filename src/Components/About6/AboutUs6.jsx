/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import aboutus6 from '../../assets/aboutus6Img.png';

function AboutUs6() {
  return (
    <div className="flex flex-col items-center justify-center 
                    min-h-[50vh] 2xl:min-h-[55vh] 
                    [@media_(min-width:_2560px)]:min-h-[60vh] 
                    [@media_(min-width:_3840px)]:min-h-[65vh] 
                    bg-[#F3E2C88F] 
                    px-4 py-8 sm:py-12 lg:py-16 2xl:px-6 2xl:py-20 
                    [@media_(min-width:_2560px)]:px-8 [@media_(min-width:_2560px)]:py-24 
                    [@media_(min-width:_3840px)]:px-12 [@media_(min-width:_3840px)]:py-32">
      <img
        src={aboutus6}
        alt="About Us Image"
        className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] 
                   [@media_(min-width:_2560px)]:w-[50%] 
                   [@media_(min-width:_3840px)]:w-[45%] 
                   max-w-[1440px] 2xl:max-w-[1800px] 
                   [@media_(min-width:_2560px)]:max-w-[2200px] 
                   [@media_(min-width:_3840px)]:max-w-[2800px] 
                   object-contain"
      />
    </div>
  );
}

export default AboutUs6;