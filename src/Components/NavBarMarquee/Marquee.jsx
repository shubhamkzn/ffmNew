import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import starwhite from "../../assets/Star 2.png"
import starpurple from "../../assets/Star 2 (1).png"
import downloadpng from "../../assets/Group 1000009530.png"


const Marquee = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          cursor: pointer;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 4rem;
          animation: marqueeScroll 15s linear infinite;
        }
        .marquee.paused .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* 🔥 Dual-phase Infinite Marquee */}
      <div
        className={`group marquee fixed top-0 left-0 w-full h-[50px] flex items-center z-[1002] transition-colors duration-300 ${
          isHovered ? "bg-[#D7CBD0] paused" : "bg-[#4B2C5E]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Two tracks for seamless loop */}
        <div className="flex gap-6">
          {[0, 1].map((track) => (
            <div key={track} className="marquee-track">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-[#ffff] text-lg font-medium group-hover:text-[#4B2C5E] transition-colors">
                    <img 
                      src={isHovered ? starpurple : starwhite} 
                      alt="star" 
                      className="w-5 h-5 transition-all duration-300" 
                    />
                    Download Your Free Mesothelioma Guide Today
                  </span>
                  <button
                    onClick={() => navigate("/pdfFormpage")}
                    className="flex items-center gap-2 text-[#ffff] font-bold px-6 py-2 rounded-xl bg-[#4B2C5E] group-hover:border-[#4B2C5E] transition-colors border-[#fff] border-2"
                  >
                    <img 
                      src={downloadpng} 
                      alt="download" 
                      className="w-4 h-4" 
                    />
                    Get Now
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
          <div className="flex gap-6">
          {[0, 1].map((track) => (
            <div key={track} className="marquee-track">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-[#ffff] text-lg font-medium group-hover:text-[#4B2C5E] transition-colors">
                    <img 
                      src={isHovered ? starpurple : starwhite} 
                      alt="star" 
                      className="w-5 h-5 transition-all duration-300" 
                    />
                    Download Your Free Mesothelioma Guide Today
                  </span>
                  <button
                    onClick={() => navigate("/pdfFormpage")}
                    className="flex items-center gap-2 text-[#ffff] font-bold px-6 py-2 rounded-xl bg-[#4B2C5E] group-hover:border-[#4B2C5E] transition-colors border-[#fff] border-2"
                  >
                    <img 
                      src={downloadpng} 
                      alt="download" 
                      className="w-4 h-4" 
                    />
                    Get Now
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marquee;