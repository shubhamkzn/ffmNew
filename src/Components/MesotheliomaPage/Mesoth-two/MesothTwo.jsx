import React, { useRef, useState } from 'react';
import image2 from "../../../assets/Frame 76 (3).png";
import image3 from "../../../assets/Frame 76 (4).png";
import image4 from "../../../assets/Frame 76 (5).png";
import image5 from "../../../assets/Frame 76 (6).png";
import "./MesothTwo.css";
function MesothTwo() {
    const cards = [
        { image: image2, alt: "Construction Workers" },
        { image: image3, alt: "Shipyard Workers" },
        { image: image4, alt: "Auto Mechanics" },
        { image: image5, alt: "Fire Fighter" }
    ];

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="mx-auto p-6 max-w-[90%] 2xl:max-w-[1600px]">
            <h1 className="text-[#2E4A7D] text-center font-[Georgia] text-5xl md:text-6xl lg:text-8xl 2xl:text-[150px] italic font-normal leading-tight py-4">
                Who is at risk?
            </h1>

            <p className="text-[#4B2C5E] mt-5 text-center font-[Helvetica] text-[24px] 2xl:text-[32px] font-normal leading-none">
                Each year, more than <span className="font-bold">3,000 people</span> in the United States are diagnosed with mesothelioma.
                The disease primarily <span className="font-bold">affects individuals aged 55 and older, with men being diagnosed more often than women</span>.
                Certain occupations and environments increase mesothelioma risk. People exposed to asbestos fibers at work or home are the most vulnerable.
            </p>

            {/* Horizontal scroll container with drag */}
            <div
                ref={scrollRef}
                className="hidden md:flex overflow-x-auto space-x-6 py-6 px-2 scroll-smooth cursor-grab"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[340px] xl:w-[390px] 2xl:w-[440px] h-[418px] 2xl:h-[600px] rounded-[20px]"
                    >
                        <img
                            src={card.image}
                            alt={card.alt}
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    </div>
                ))}
            </div>

            {/* Mobile stacked view */}
            <div className="md:hidden flex flex-col space-y-4 mt-4">
                {cards.map((card, index) => (
                    <div key={index} className="w-full rounded-[20px]">
                        <img
                            src={card.image}
                            alt={card.alt}
                            className="w-full h-[418px] object-cover rounded-[20px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MesothTwo;
