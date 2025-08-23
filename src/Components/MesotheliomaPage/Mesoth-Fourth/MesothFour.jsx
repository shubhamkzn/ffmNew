// MesothFourth.jsx
import React from 'react';
import image1 from '../../../assets/riskfactor1.png';
import image2 from '../../../assets/riskfactor2.png';
import image3 from '../../../assets/riskfactor3.png';
import image4 from '../../../assets/riskfactor4.png';

const SYMPTOMS = [
    "Persistent Chest Pain",
    "Chronic Cough",
    "Severe Bloating",
    "Abdominal Pain",
    "Unexplained Tiredness",
    "Swelling & Lumps in the Testicles",
    "Fluid Buildup",
];

const RISK_FACTOR_IMAGES = [
    { src: image1, alt: "Asbestos Exposure Risk Factor" },
    { src: image2, alt: "Occupational Risk Factor" },
    { src: image3, alt: "Environmental Risk Factor" },
    { src: image4, alt: "Secondary Exposure Risk Factor" },
];

const MesothFourth = () => {
    return (
        <div className="flex flex-col items-center bg-[#f7ede3] overflow-x-hidden px-2 sm:px-4">
            {/* Main Heading */}
            <h1 className="w-full max-w-4xl relative text-3xl sm:text-4xl md:text-7xl lg:text-8xl 3xl:text-9xl 4xl:text-[10rem] 
                inline-block font-[Georgia] text-[#4b2c5e] text-center italic px-2 sm:px-4">
                Understanding Mesothelioma
            </h1>

            {/* Spacing Element */}
            <div className="text-sm sm:text-lg md:text-2xl 3xl:text-3xl 4xl:text-4xl text-center" 
                aria-hidden="true" />

            {/* Decorative Divider */}
            <div className="w-full h-6 sm:h-8 md:h-10 bg-white my-3 sm:my-4 md:my-5" role="separator" aria-hidden="true" />

            {/* Common Symptoms Section */}
            <section className="w-full flex flex-col items-center px-2 sm:px-4">
                <h2 className="text-[#4B2C5E] text-center font-georgia italic 
                    text-2xl sm:text-3xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-[9rem] 
                    font-normal leading-normal underline decoration-solid 
                    decoration-[rgba(75,44,94,0.55)] decoration-[3%] underline-offset-[14%] 
                    underline-from-font [text-decoration-skip-ink:none] [font-feature-settings:'dlig'on] 
                    decoration-opacity-70 mb-4 sm:mb-6">
                    Common Symptoms
                </h2>

                <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center items-center 
                    gap-y-2 sm:gap-y-3 gap-x-2 sm:gap-x-4 text-sm sm:text-base md:text-xl lg:text-2xl 3xl:text-3xl 4xl:text-4xl p-2 sm:p-4">
                    {SYMPTOMS.map((symptom, index) => (
                        <div 
                            key={`symptom-${index}`} 
                            className="rounded-full bg-white/40 border border-[#4b2c5e]/70 
                                flex items-center justify-center 
                                px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 3xl:px-8 3xl:py-5 4xl:px-10 4xl:py-6
                                transition-colors duration-200 hover:bg-white/60"
                        >
                            <span className="relative text-[#4b2c5e] font-medium text-center leading-tight">
                                {symptom}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Divider */}
            <div className="w-4/5 mx-auto border-t-2 md:border-t-3 border-[rgba(75,44,94,0.55)] 
                h-px my-6 sm:my-8 md:my-12 3xl:my-16 4xl:my-20" 
                role="separator" aria-hidden="true" />

            {/* Risk Factors Section */}
            <section className="w-full flex flex-col items-center px-2 sm:px-4">
                <h2 className="text-[#4B2C5E] text-center font-georgia italic 
                    text-2xl sm:text-3xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-[9rem] 
                    font-normal leading-normal underline decoration-solid 
                    decoration-[rgba(75,44,94,0.55)] decoration-[3%] underline-offset-[14%] 
                    underline-from-font [text-decoration-skip-ink:none] [font-feature-settings:'dlig'on] 
                    decoration-opacity-70 mb-4 sm:mb-6">
                    Risk Factors
                </h2>

                <div className="w-full max-w-[90rem] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 
                        gap-x-3 sm:gap-x-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20 3xl:gap-x-24 4xl:gap-x-28 
                        gap-y-4 sm:gap-y-6 mt-4 sm:mt-6 md:mt-10 place-items-center mb-6 sm:mb-8 md:mb-10">
                        {RISK_FACTOR_IMAGES.map((image, index) => (
                            <div
                                key={`risk-factor-${index}`}
                                className="p-2 sm:p-3 md:p-6 3xl:p-8 4xl:p-10 rounded-lg 
                                    flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-lg pb-0
                                    transition-transform duration-200 hover:scale-105"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-28 sm:h-32 md:h-36 3xl:h-44 4xl:h-52 
                                        object-cover rounded-lg mb-2 sm:mb-4 shadow-md"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MesothFourth;