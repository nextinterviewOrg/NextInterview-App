import react from "react";
import LandingHeader from "../../components/LandingPageComponents/LandingHeader/LandingHeader";
import LandingFooter from "../../components/LandingPageComponents/LandingFooter/LandingFooter";
import OurMission from "../../components/AboutComponents/OurMission/OurMission";
import OurTeam from "../../components/AboutComponents/OurTeam/OurTeam";

const AboutPage = () => {
    return (
        <>
            <LandingHeader />
            <OurMission />
            <OurTeam />
            <LandingFooter/>
        </>
    );
};

export default AboutPage;