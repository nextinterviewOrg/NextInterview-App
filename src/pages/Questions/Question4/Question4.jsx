import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Option,
  OptionLabel,
  NextButton,
  CirclePointer,
  BackIcon,
  Section,
  SkipButton,
} from "../../Questions/Question4/Question4.styles";
import logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";
import { useUser } from "@clerk/clerk-react";
import { getJobById, getJobs } from "../../../api/jobApi";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";

const QuestionPage4 = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    const apiCaller = async () => {
      if (!user) {
        return;
      }
      const userData = await getUserByClerkId(user.id);
      const questionariesData = await getQuestionariesByUserId(userData.data.user._id)
      console.log("questionaries Data qq ", questionariesData)
      if (questionariesData.data[0]?.data_scheduled_interview_response!==null) {
        console.log("questionaries Data jjj ", questionariesData.data[0].data_scheduled_interview_response?"true":"false")
       setSelectedOption(questionariesData.data[0].data_scheduled_interview_response?"true":"false");
      }
      if(userData.data.user.profile_status){
        navigate("/user")
      }
    };
    apiCaller();
  }, [user]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleOnlClick = async () => {
    const data = await getUserByClerkId(user.id);
    const submissionData = {
      user_id: data.data.user._id,
      data_scheduled_interview_response: selectedOption,
      // profile_status:true
    };
    await createUserProfile(submissionData);
    if (selectedOption === "true") {
      navigate("/question5");
    } else {
      navigate("/question6");
    }
  };
  const handleGoBack = () => {
    navigate("/question3");
  };

  return (
    <div>
      <HeaderWithLogo />

      <Container>
        <Section>
          <BackIcon
            onClick={handleGoBack}
            style={{
              borderRadius: "10%",
              border: "1px solid grey",
              padding: "8px",
            }}
          >
            <RxArrowLeft />
          </BackIcon>

          <Title>
            Do you have interview scheduled <br /> currently?
          </Title>

          <Option
            $isSelected={selectedOption === "true"}
            onClick={() => handleOptionChange("true")}
          >
            <CirclePointer $isSelected={selectedOption === "true"} />
            <OptionLabel $isSelected={selectedOption === "true"}>
              Yes
            </OptionLabel>
          </Option>

          <Option
            $isSelected={selectedOption === "false"}
            onClick={() => handleOptionChange("false")}
          >
            <CirclePointer $isSelected={selectedOption === "false"} />
            <OptionLabel $isSelected={selectedOption === "false"}>
              No
            </OptionLabel>
          </Option>

          <NextButton disabled={!selectedOption} onClick={handleOnlClick}>
            Next
          </NextButton>
          {/* <SkipButton onClick={() => navigate("/question6")}>Skip</SkipButton> */}
        </Section>
      </Container>
    </div>
  );
};

export default QuestionPage4;
