import React from "react";
import frame2 from "../../assets/Frame 115.png";

const ImageComponent = () => {
  return (
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
        <h1 className="text-3xl md:text-5xl font-serif text-white leading-snug">
          Support. Justice. <br /> Peace of mind.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white">
          That’s what we’re here to offer
        </p>
        <button
          className="mt-6 px-5 py-2 bg-white text-blue-700 font-medium rounded-xl shadow-md 
                     transition duration-300 hover:bg-gray-100"
        >
          Explore Your Legal Options
        </button>
      </div>
    </div>
  );
};

export default ImageComponent;
