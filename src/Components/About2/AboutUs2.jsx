import React from 'react';
import Vector1 from '../../assets/aboutus2(1).svg';
import Vector2 from '../../assets/aboutus2(1).svg';

const AboutUs2 = () => {
  return (
    <div className="relative flex flex-col justify-center items-center overflow-hidden px-4 min-h-[250px] sm:h-[300px] md:h-[376px] 4xl:min-h-[600px] bg-[#faf3ec]">
      
      {/* Background Images */}
      <img
        src={Vector1}
        alt=""
        className="absolute z-10 opacity-20 object-contain 
                   h-[70%] sm:h-[50%] md:h-[60%] 2xl:h-[80%] 4xl:h-[90%]
                   w-[60%] sm:w-[35%] md:w-[28.82%] 2xl:w-[20%] 4xl:w-[18%]
                   left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2"
      />
      <img
        src={Vector2}
        alt=""
        className="absolute z-10 opacity-20 object-contain 
                   h-[70%] sm:h-[50%] md:h-[60%] 2xl:h-[80%] 4xl:h-[90%]
                   w-[60%] sm:w-[35%] md:w-[28.82%] 2xl:w-[20%] 4xl:w-[18%]
                   left-1/2 top-1/2 -translate-x-[20%] -translate-y-1/2"
      />

      {/* Centered Text */}
      <i className="relative z-20 text-center font-bold text-[#2e4a7d] w-full max-w-[90%]  px-2 sm:px-4 4xl:max-w-[1800px]">
        <span
          className="block 4xl:text-[4rem]"
          style={{
            fontSize: 'clamp(1rem, 3vw, 3.5rem)',
            lineHeight: '1.3',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif'
          }}
        >
          Together, we fight for justice, awareness, and a future free from asbestos dangers.
        </span>
      </i>
    </div>
  );
};

export default AboutUs2;
