import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Drawer from '../../assets/drawer.png';
import CallIcon from '../../assets/phoneIcon.png';
import logo from '../../assets/Meso logo-01 1.png';
import Marquee from "./Marquee";
import Marquee_Mobile from "./Marquee_Mobile";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("(888) 212-8149");

  useEffect(() => {
    // Updated padding to account for marquee height on mobile
    document.body.classList.add(
      'pt-[120px]', // Mobile - increased to accommodate navbar + marquee
      'md:pt-[130px]', // Tablet - increased for marquee
      'customDesktop:pt-[85px]', // Desktop - original
      '3xl:pt-[100px]', 
      '4xl:pt-[120px]'
    );
    return () => {
      document.body.classList.remove(
        'pt-[120px]', 
        'md:pt-[130px]', 
        'customDesktop:pt-[85px]', 
        '3xl:pt-[100px]', 
        '4xl:pt-[120px]'
      );
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handlePhoneClick = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    window.location.href = `tel:+1${cleanNumber}`;
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .nav-link-animation { opacity: 0; }
        .menu-open .nav-link-animation:nth-child(1) {
          animation: slideIn 0.4s forwards; animation-delay: 0.1s;
        }
        .menu-open .nav-link-animation:nth-child(2) {
          animation: slideIn 0.4s forwards; animation-delay: 0.2s;
        }
        .menu-open .nav-link-animation:nth-child(3) {
          animation: slideIn 0.4s forwards; animation-delay: 0.3s;
        }
        .menu-open .claim-button-animation {
          animation: fadeIn 0.5s forwards; animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>

      {/* Mobile & Tablet Navbar */}
      <div className={`customDesktop:hidden fixed top-0 left-0 w-full z-[1000] bg-[#FAF3EC] transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Main navbar content */}
        <div className="flex items-center justify-between p-[15px] relative z-[1001]">
          <div className="p-[8px] px-[15px] rounded-[4px]">
            <a href="/">
              <img src={logo} alt="Mesotheliamo Logo" className="w-[100px] md:w-[120px] h-auto" />
            </a>
          </div>
          <div className="flex items-center gap-[12px]">
            <div
              className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full border-2 border-[#4B2C5E] flex items-center justify-center cursor-pointer hover:bg-[rgba(75,44,94,0.1)]"
              onClick={handlePhoneClick}
            >
              <div className="relative w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                <img src={CallIcon} alt="Phone Icon" className="absolute top-0 left-0 w-full h-full" />
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="w-[40px] h-[40px] flex items-center justify-center border-none bg-transparent"
              aria-label="Toggle navigation menu"
            >
              <img src={Drawer} alt="Menu" className="w-[24px] h-[24px] object-contain" />
            </button>
          </div>
        </div>
        
        {/* Marquee with proper spacing */}
        <div className="w-full">
          <Marquee_Mobile />
        </div>
        
        {/* Add bottom padding to ensure separation from page content */}
        <div className="h-[8px] bg-[#FAF3EC]"></div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      <div className={`fixed top-0 left-0 w-full h-screen z-[1002] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-[5px]" onClick={closeMenu}></div>
        <div className={`fixed top-0 w-full h-screen bg-[rgba(255,255,255,0.97)] transition-all duration-300 z-[1003] ${isOpen ? 'right-0 menu-open' : 'right-[-100%]'}`}>
          <div className="absolute top-[20px] left-[20px] bg-white p-[8px] px-[15px] rounded-[4px] shadow">
            <a href="/" onClick={closeMenu}>
              <img src={logo} alt="Mesotheliamo Logo" className="w-[80px] md:w-[100px]" />
            </a>
          </div>
          <button
            onClick={closeMenu}
            className="absolute top-[20px] right-[20px] w-[45px] h-[45px] flex items-center justify-center bg-[#4B2C5E] rounded-full z-[1004] shadow-md"
            aria-label="Close navigation menu"
          >
            <IoClose size={28} className="text-white" />
          </button>

          <div className="flex flex-col items-center justify-center gap-[5vh] h-full px-[20px]">
            {[
              { to: "/", label: "Home" },
              { to: "/MesothMainPage", label: "Mesothelioma" },
              { to: "/AboutMain", label: "About us" },
            ].map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `nav-link-animation no-underline font-helvetica text-[7vw] max-w-[280px] md:text-[28px] lg:text-[32px] xl:text-[36px] 3xl:text-[40px] 4xl:text-[44px] ${isActive
                    ? `text-[#4B2C5E] font-semibold relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-[-5px] after:left-0 after:bg-gradient-to-r after:from-[#4B2C5E] after:to-[#2E4A7D]`
                    : 'text-[#4B2C5E]'
                  } transition-colors ease-in-out duration-300 max-[360px]:text-[24px]`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}

            <div
              className="claim-button-animation bg-[#4B2C5E] rounded-[60px] py-[12px] px-[30px] md:py-[14px] md:px-[36px] mt-[5vh] cursor-pointer hover:bg-[#3a2249] transition-colors"
              onClick={() => {
                closeMenu();
                navigate("/ClaimForm");
              }}
            >
              <span className="font-helvetica font-bold text-[18px] md:text-[20px] text-[#F5E7DA]">Claim Form</span>
            </div>

            <div className="flex items-center gap-[10px] mt-[5vh] claim-button-animation">
              <div
                className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full border-2 border-[#4B2C5E] flex items-center justify-center cursor-pointer"
                onClick={handlePhoneClick}
              >
                <div className="relative w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                  <img src={CallIcon} alt="Phone Icon" className="absolute top-0 left-0 w-full h-full" />
                </div>
              </div>
              <p className="font-helvetica font-bold text-[20px] md:text-[22px] text-[#4B2C5E] m-0">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar - Shows on customDesktop (≥1024px) */}
      <div className="hidden customDesktop:block fixed top-0 left-0 w-full bg-[#FAF3EC] z-[1000] shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex items-center justify-between 
                        px-[18px] sm:px-[28px] xl:px-[70px] 3xl:px-[100px] 4xl:px-[140px] 
                        py-[10px] lg:py-[14px] 3xl:py-[16px] 4xl:py-[20px] bg-[#FAF3EC] w-full">
          
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-[28px] lg:gap-[35px] 3xl:gap-[45px] 4xl:gap-[55px]">
            {/* Logo */}
            <div className="p-[4px] lg:p-[6px] 3xl:p-[8px] 4xl:p-[10px] rounded-[4px]">
              <a href="/">
                <img
                  src={logo}
                  alt="Mesotheliamo Logo"
                  className="w-[85px] sm:w-[105px] lg:w-[125px] 3xl:w-[150px] 4xl:w-[170px] h-auto"
                />
              </a>
            </div>

            {/* Nav Links */}
            <div className="flex gap-[18px] lg:gap-[28px] 3xl:gap-[35px] 4xl:gap-[42px]">
              {[
                { to: "/", label: "Home" },
                { to: "/MesothMainPage", label: "Mesothelioma" },
                { to: "/AboutMain", label: "About us" },
              ].map(({ to, label }) => (
                <NavLink
                  key={label}
                  to={to}
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    `font-helvetica font-normal text-[15px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] 
                     whitespace-nowrap cursor-pointer transition-colors 
                     ${isActive ? "text-[#4B2C5E]" : "text-[#4B2C5E]"}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Phone + CTA */}
          <div className="flex items-center gap-[18px] lg:gap-[22px] 3xl:gap-[28px] 4xl:gap-[32px]">
            {/* Phone */}
            <div className="flex items-center gap-[8px] lg:gap-[10px]">
              <div
                className="w-[36px] h-[36px] lg:w-[42px] lg:h-[42px] 3xl:w-[46px] 3xl:h-[46px] 4xl:w-[50px] 4xl:h-[50px] 
                           rounded-full border border-[#4B2C5E] flex items-center justify-center cursor-pointer"
                onClick={handlePhoneClick}
              >
                <img
                  src={CallIcon}
                  alt="Phone Icon"
                  className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] 3xl:w-[22px] 3xl:h-[22px]"
                />
              </div>
              <p className="font-helvetica font-bold text-[15px] lg:text-[17px] xl:text-[19px] 3xl:text-[21px] 4xl:text-[23px] text-[#4B2C5E] m-0">
                {phoneNumber}
              </p>
            </div>

            {/* CTA */}
            <div
              className="bg-[#4B2C5E] rounded-[50px] py-[8px] px-[18px] lg:py-[9px] lg:px-[22px] 3xl:py-[10px] 3xl:px-[26px] 4xl:py-[12px] 4xl:px-[30px] 
                         cursor-pointer hover:bg-[#3a2249] transition-colors"
              onClick={() => navigate("/ClaimForm")}
            >
              <span className="font-helvetica font-bold text-[15px] lg:text-[17px] xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#F5E7DA] whitespace-nowrap">
                Claim Form
              </span>
            </div>
          </div>
        </div>
        <Marquee />
      </div>
    </>
  );
};

export default Navbar;