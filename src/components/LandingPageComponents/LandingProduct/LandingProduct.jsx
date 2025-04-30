import React from "react";
import { UserLearningWrapper, Subheading} from "../LandingProduct/LandingProduct.style"
import LandingHeader from "../LandingHeader/LandingHeader";
import LandingCourse from "../LandingCourse/LandingCourse";
import LandingFeature from "../LandingFeature/LandingFeature";
import LandingFooter from "../LandingFooter/LandingFooter";

const LandingProduct = () => {
    return (
        <>
      <LandingHeader />
         <UserLearningWrapper>
                    <div className="courses-container">
                        <div className="header">
                            <h1 className='header-title'>Product</h1>
                          
                           
                        </div>
                        <Subheading>
                NextInterview is an innovative, experimental platform that makes interview prep feel like a breeze.
            </Subheading>
            </div>
            </UserLearningWrapper>
            <LandingFeature />
            <LandingFooter />
       
            </>
    )
};

export default LandingProduct;