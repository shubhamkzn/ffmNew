import React from "react";
import MainImg from "../../assets/Frame 113.png";

// const AboutUsPage = () => {
//   return (
//     <div>
//       {/* mobile view */}
//       <div className="md:hidden block w-full relative bg-[#faf3ec] h-auto overflow-x-hidden text-left text-base sm:text-lg text-[#4b2c5e] font-georgia px-4 pt-16 sm:pt-20 pb-12 sm:pb-16">
//         <div className="space-y-6 pt-4">
//           <img
//             className="w-[90%] max-w-[400px] h-auto mx-auto"
//             alt="Main"
//             src={MainImg}
//           />

//           <div className="space-y-4 text-center">
//             <i className="block text-[28px] sm:text-[32px] md:text-[36px] font-georgia italic">
//               Who we are
//             </i>
//             <p className="text-sm sm:text-base font-helvetica max-w-[600px] mx-auto">
//               At Fight for Mesothelioma, we are committed to standing with
//               individuals and families affected by <b>asbestos exposure</b>.
//             </p>
//           </div>

//           <div className="space-y-4 text-sm sm:text-base font-helvetica max-w-[600px] mx-auto">
//             <p>
//               Our aim is to provide <b>expert legal guidance</b>,{" "}
//               <b>advocate</b> for victims' rights, and <b>raise awareness</b>{" "}
//               about the devastating impact of mesothelioma.
//             </p>
//             <p>
//               <b>We believe that no one should face this battle alone.</b> Through
//               dedicated legal support, we help victims pursue the compensation they
//               deserve while working to hold negligent parties accountable.
//             </p>
//             <p>
//               Beyond legal assistance, we strive to <b>educate the public</b>,{" "}
//               <b>promote safety</b>, and{" "}
//               <b>prevent future asbestos-related harm</b>.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* desktop view */}
//       <div className="hidden md:flex w-full h-auto bg-[#faf3ec] font-georgia text-[#4b2c5e] overflow-hidden flex-col md:flex-row items-center justify-center px-4 lg:px-12 xl:px-20 2xl:px-32 3xl:px-48 4xl:px-64 py-16 md:py-20 lg:py-24 xl:py-32 2xl:py-40 3xl:py-48 4xl:py-56">
//         {/* Left Side: Image */}
//         <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
//           <img
//             src={MainImg}
//             alt="Who we are"
//             className="md:max-h-[63vh] lg:max-h-[75vh] xl:max-h-[85vh] 2xl:max-h-[90vh] 3xl:max-h-[92vh] 4xl:max-h-[94vh] w-auto object-contain"
//           />
//         </div>

//         {/* Right Side: Content */}
//         <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-28 3xl:px-32 4xl:px-40 space-y-6 text-center md:text-left">
//           <h2 className="text-[32px] md:text-[48px] lg:text-[64px] xl:text-[80px] 2xl:text-[100px] 3xl:text-[120px] 4xl:text-[160px] italic leading-tight">
//             Who we are
//           </h2>
//           <p className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[44px] font-helvetica">
//             At Fight for Mesothelioma, we are committed to standing with individuals
//             and families affected by <b>asbestos exposure</b>.
//           </p>
//           <div className="text-[15px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[30px] 4xl:text-[38px] font-helvetica space-y-4">
//             <p>
//               Our aim is to provide <b>expert legal guidance</b>,{" "}
//               <b>advocate</b> for victims' rights, and <b>raise awareness</b>{" "}
//               about the devastating impact of mesothelioma.
//             </p>
//             <p>
//               <b>We believe that no one should face this battle alone.</b>{" "}
//               Through dedicated legal support, we help victims pursue the
//               compensation they deserve while working to hold negligent parties
//               accountable.
//             </p>
//             <p>
//               Beyond legal assistance, we strive to <b>educate the public</b>,{" "}
//               <b>promote safety</b>, and{" "}
//               <b>prevent future asbestos-related harm</b>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsPage;






const AboutUsPage = () => {
  return (
    <div>
      {/* mobile view */}
      <div className="md:hidden block w-full relative bg-[#faf3ec] h-auto overflow-x-hidden text-left text-base sm:text-lg text-[#4b2c5e] font-georgia px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="space-y-6 sm:space-y-8 pt-4">
          <img
            className="w-[90%] sm:w-[85%] max-w-[320px] sm:max-w-[400px] h-auto mx-auto"
            alt="Main"
            src={MainImg}
          />

          <div className="space-y-4 sm:space-y-6 text-center">
            <i className="block text-[28px] sm:text-[32px] font-georgia italic leading-tight">
              Who we are
            </i>
            <p className="text-sm sm:text-base lg:text-lg font-helvetica max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mx-auto leading-relaxed">
              At Fight for Mesothelioma, we are committed to standing with
              individuals and families affected by <b>asbestos exposure</b>.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg font-helvetica max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mx-auto leading-relaxed">
            <p>
              Our aim is to provide <b>expert legal guidance</b>,{" "}
              <b>advocate</b> for victims' rights, and <b>raise awareness</b>{" "}
              about the devastating impact of mesothelioma.
            </p>
            <p>
              <b>We believe that no one should face this battle alone.</b> Through
              dedicated legal support, we help victims pursue the compensation they
              deserve while working to hold negligent parties accountable.
            </p>
            <p>
              Beyond legal assistance, we strive to <b>educate the public</b>,{" "}
              <b>promote safety</b>, and{" "}
              <b>prevent future asbestos-related harm</b>.
            </p>
          </div>
        </div>
      </div>

      {/* desktop view */}
     <div className="hidden md:flex w-full bg-[#faf3ec] font-georgia text-[#4b2c5e] overflow-hidden flex-col md:flex-row items-center justify-center px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-32 3xl:px-40 4xl:px-48 py-16 md:py-20 lg:py-24 xl:py-32 2xl:py-40 3xl:py-50 4xl:py-60">
  {/* Left Side: Image */}
  <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
    <img
      src={MainImg}
      alt="Who we are"
      className="md:max-h-[63vh] lg:max-h-[75vh] xl:max-h-[85vh] 2xl:max-h-[90vh] 3xl:max-h-[92vh] 4xl:max-h-[95vh] w-auto object-contain"
    />
  </div>

  {/* Right Side: Content */}
  <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 3xl:space-y-14 4xl:space-y-16 text-center md:text-left">
    <h2 className="text-[32px] md:text-[36px] lg:text-[48px] xl:text-[64px] 2xl:text-[80px] 3xl:text-[100px] 4xl:text-[120px] italic leading-tight md:leading-none">
      Who we are
    </h2>
    <p className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] 4xl:text-[48px] font-helvetica leading-relaxed">
      At Fight for Mesothelioma, we are committed to standing with individuals
      and families affected by <b>asbestos exposure</b>.
    </p>
    <div className="text-[14px] md:text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px] 4xl:text-[36px] font-helvetica space-y-4 md:space-y-5 lg:space-y-6 3xl:space-y-7 4xl:space-y-8 leading-relaxed">
      <p>
        Our aim is to provide <b>expert legal guidance</b>,{" "}
        <b>advocate</b> for victims' rights, and <b>raise awareness</b>{" "}
        about the devastating impact of mesothelioma.
      </p>
      <p>
        <b>We believe that no one should face this battle alone.</b>{" "}
        Through dedicated legal support, we help victims pursue the
        compensation they deserve while working to hold negligent parties
        accountable.
      </p>
      <p>
        Beyond legal assistance, we strive to <b>educate the public</b>,{" "}
        <b>promote safety</b>, and{" "}
        <b>prevent future asbestos-related harm</b>.
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default AboutUsPage;