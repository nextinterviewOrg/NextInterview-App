import React, { useState,useEffect } from "react";
import {
  Container,
  Title,
  Option,
  OptionLabel,
  NextButton,
  CirclePointer,
  BackIcon,
  Section,
  SkipButton
} from "../../Questions/Question2/Question2.styles";
import { useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";
import { getJobById, getJobs } from "../../../api/jobApi";
import { useUser } from "@clerk/clerk-react";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";

const QuestionPage2 = () => {
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
        if (questionariesData.data[0]?.data_ai_job_response) {
          console.log("questionaries Data ", questionariesData.data[0].data_ai_job_response)
         setSelectedOption(questionariesData.data[0].data_ai_job_response);
        }
        if(userData.data.user.profile_status){
          navigate("/user")
        }
      };
      apiCaller();
    }, [user]);

  const handleOptionChange = async (option) => {
    setSelectedOption(option);
  };
  const handleClick = async () => {
    const data = await getUserByClerkId(user.id);
    const submissionData = {
      user_id: data.data.user._id,
      data_ai_job_response: selectedOption,
    };
    await createUserProfile(submissionData);
    navigate("/question3");
  };

  const handleGoBack = () => {
    navigate("/question1");
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
          <Title>Are you currently in a data/AI job?</Title>

          <Option
            $isSelected={selectedOption === "Yes"}
            onClick={() => handleOptionChange("Yes")}
          >
            <CirclePointer $isSelected={selectedOption === "Yes"} />
            <OptionLabel $isSelected={selectedOption === "Yes"}>
              Yes
            </OptionLabel>
          </Option>

          <Option
            $isSelected={
              selectedOption === "No, planning to Switch to data/ai role"
            }
            onClick={() =>
              handleOptionChange("No, planning to Switch to data/ai role")
            }
          >
            <CirclePointer
              $isSelected={
                selectedOption === "No, planning to Switch to data/ai role"
              }
            />
            <OptionLabel
              $isSelected={
                selectedOption === "No, planning to Switch to data/ai role"
              }
            >
              No, planning to Switch to data/AI role
            </OptionLabel>
          </Option>

          <Option
            $isSelected={selectedOption === "No, looking for my 1st job"}
            onClick={() => handleOptionChange("No, looking for my 1st job")}
          >
            <CirclePointer
              $isSelected={selectedOption === "No, looking for my 1st job"}
            />
            <OptionLabel
              $isSelected={selectedOption === "No, looking for my 1st job"}
            >
              No, looking for my 1st job
            </OptionLabel>
          </Option>

          <NextButton disabled={!selectedOption} onClick={handleClick}>
            Next
          </NextButton>
          {/* <SkipButton onClick={() => navigate("/question3")}>Skip</SkipButton> */}
        </Section>
      </Container>
    </div>
  );
};

export default QuestionPage2;
