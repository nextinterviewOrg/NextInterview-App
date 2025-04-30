import react from "react";
import LandingHeader from "../../components/LandingPageComponents/LandingHeader/LandingHeader";
import LandingFooter from "../../components/LandingPageComponents/LandingFooter/LandingFooter";
import OurFeatures from "../../components/LandingPageComponents/OurFeatures/OurFeatures";
import HeroSection from "../../components/LandingPageComponents/HeroSection/HeroSection";
import Arsenal from "../../components/LandingPageComponents/Arsenal/Arsenal";

const LandingPage = () => {
    return (
        <>
            <LandingHeader />

            <HeroSection />
            <Arsenal />
            <OurFeatures/>
            <LandingFooter/>
        </>
    );
};

export default LandingPage;