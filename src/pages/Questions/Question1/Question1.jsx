import React, { useEffect, useState } from "react";
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
} from "../Question1/Question1.styles";
import { data, useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";
import { getJobById, getJobs } from "../../../api/jobApi";
import { useUser } from "@clerk/clerk-react";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";

const QuestionPage1 = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
const defaultOptions = [
  { _id: "1", response_name: "Prepare for interviews" },
  { _id: "2", response_name: "Level up my data / AI skills" },
];

const [options, setOptions] = useState(defaultOptions); // fallback prevents flicker

  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    const apiCaller = async () => {

      const data = await getJobs();
      setOptions(data.data);
    };
    apiCaller();
  }, []);
  useEffect(() => {
    const apiCaller = async () => {
      if (!user) {
        return;
      }
      const userData = await getUserByClerkId(user.id);

      const questionariesData = await getQuestionariesByUserId(userData.data.user._id)
      if(userData.data.user.profile_status){
        navigate("/user")
      }
      console.log("questionaries Data ", questionariesData)
      if (questionariesData.data[0]?.data_job_response) {
        setSelectedOption(questionariesData.data[0].data_job_response._id);
      }

    };
    apiCaller();
  }, [user]);



  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleClick = async () => {
    const data = await getUserByClerkId(user.id);
    const submissionData = {
      user_id: data.data.user._id,
      data_job_response: selectedOption,
    };
    await createUserProfile(submissionData);
    const jobData = await getJobById(selectedOption);
    console.log("jobData", jobData);
    // if(jobData.data.response_name === "Prepare for interviews"){
    //   navigate("/question2");

    // }else if(jobData.data.response_name === "Level up my data / AI skill"){
    // }
    navigate("/question2");
  };

  const handleGoBack = () => {
    navigate("/personalinfo");
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
            What brings you to Next <br /> Interview?
          </Title>
          {options &&
            options.map((job) => {
              return (
                <Option
                  $isSelected={selectedOption === job._id}
                  onClick={() => handleOptionChange(job._id)}
                >
                  <CirclePointer $isSelected={selectedOption === job._id} />
                  <OptionLabel $isSelected={selectedOption === job._id}>
                    {job.response_name}
                  </OptionLabel>
                </Option>
              );
            })}

          {/* <Option
            $isSelected={selectedOption === "interviews"}
            onClick={() => handleOptionChange("interviews")}
          >
            <CirclePointer $isSelected={selectedOption === "interviews"} />
            <OptionLabel $isSelected={selectedOption === "interviews"}>
              Prepare for interviews
            </OptionLabel>
          </Option>

          <Option
            $isSelected={selectedOption === "skills"}
            onClick={() => handleOptionChange("skills")}
          >
            <CirclePointer $isSelected={selectedOption === "skills"} />
            <OptionLabel $isSelected={selectedOption === "skills"}>
              Level up my data / AI skills
            </OptionLabel>
          </Option> */}

          <NextButton disabled={!selectedOption} onClick={handleClick}>
            Next
          </NextButton>
          {/* <SkipButton onClick={() => navigate("/question2")}>Skip</SkipButton> */}
        </Section>
      </Container>
    </div>
  );
};

export default QuestionPage1;
