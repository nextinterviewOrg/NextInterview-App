import react from "react";
import LandingHeader from "../../components/LandingPageComponents/LandingHeader/LandingHeader";
import LandingFooter from "../../components/LandingPageComponents/LandingFooter/LandingFooter";
import OurFeatures from "../../components/LandingPageComponents/OurFeatures/OurFeatures";

const LandingPage = () => {
    return (
        <>
            <LandingHeader />
            <OurFeatures/>
            <LandingFooter/>
        </>
    );
};

export default LandingPage;