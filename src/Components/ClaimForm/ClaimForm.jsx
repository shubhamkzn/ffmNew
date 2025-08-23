import React from 'react'
import Header from "../Header/Header";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import ClaimOne from "./Claim-one/ClaimOne";
import HomeEight from '../Home-Eight/HomeEight';
import { useEffect } from 'react';
function ClaimForm() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <ClaimOne />
      <HomeEight />
      <Footer />
    </div>
  )
}

export default ClaimForm