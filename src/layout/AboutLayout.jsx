import React from "react";
import About from "../pages/components/about/index";
import Info from "../pages/components/about/Info";
import Accardion from "../pages/components/about/AccardionContext";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function AboutLayout() {
  return (
    <div className="about-section">
      <Helmet>
        <title>Smile Movie - About</title>
        <meta name="description" content="Smile Movies haqida hamma narsani bilib oling - Smile Movies" />
      </Helmet>
      <About />
      <Info />
      <Accardion />
      <Footer />
    </div>
  );
}

export default AboutLayout;
