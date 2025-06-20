import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  FormSection,
  Form,
  FormField,
  Label,
  Input,
  Button,
  BackIcon,
} from "./CompaniesPlan.styles";
import logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import { getCompanies } from "../../../api/comapniesApi";
import { getDesignations } from "../../../api/designationApi";
import { getInterviewRounds } from "../../../api/interviewRoundApi";
import Select from "react-select";
import { useUser } from "@clerk/clerk-react";
import { getJobById, getJobs } from "../../../api/jobApi";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";

const CompaniesPlan = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedInterview, setSelectedInterview] = useState("");
  const [comapnyData, setCompanyData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [interviewData, setInterviewData] = useState([]);
  const [interviewDate, setInterviewDate] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const apiCaller = async () => {
      const data = await getCompanies();
      setCompanyData(data.data);
      const desgnation = await getDesignations();
      setDesignationData(desgnation.data);
      const interviewRound = await getInterviewRounds();
      setInterviewData(interviewRound);
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
      console.log("questionaries Data qq ", questionariesData)
      if (questionariesData.data[0]?.data_interview_scheduled_response) {
        console.log("questionaries Data ", questionariesData.data[0].data_interview_scheduled_response);
        setSelectedCompany(questionariesData.data[0].data_interview_scheduled_response.company._id);
        setSelectedDesignation(questionariesData.data[0].data_interview_scheduled_response.designation._id);
        setSelectedInterview(questionariesData.data[0].data_interview_scheduled_response.interviewRound || null);
        setInterviewDate(
          questionariesData.data[0].data_interview_scheduled_response
            ? questionariesData.data[0].data_interview_scheduled_response.interviewDate.split('T')[0]
            : ''
        );
      }
      if (userData.data.user.profile_status) {
        navigate("/user")
      }
    };
    apiCaller();
  }, [user]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.value);
  };
  const handleDesignationSelect = (designation) => {
    console.log("designation", designation);
    setSelectedDesignation(designation.value);
  };

  const handleInterviewSelect = (interview) => {
    setSelectedInterview(interview.value);
  };
  const handleGoBack = () => {
    navigate("/question4");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getUserByClerkId(user.id);

    const submitionData = {
      company: selectedCompany,
      designation: selectedDesignation,
      interviewRound: selectedInterview,
      interviewDate: interviewDate,
    };
    console.log("submitionData", submitionData);
    const submissionData = {
      user_id: data.data.user._id,
      data_interview_scheduled_response: submitionData,
      // profile_status:true
    };
    await createUserProfile(submissionData);

    navigate("/question7", { state: { backLink: "/question5" } });
  };


  const companyOptions = comapnyData.map((company) => {
    return ({
      value: company._id,
      label: (
        <div style={{ display: "flex", alignItems: "center", color: "black" }}>
          <img
            src={company.company_logo}
            alt={company.company_name}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          {company.company_name}
        </div>
      ),
    })
  });

  const designationOptions = designationData.map((desgnation) => ({
    value: desgnation._id,
    label: desgnation.designation_name,
  }));

  const interviewRoundOptions = interviewData.map((interview) => ({
    value: interview._id,
    label: interview.roundName,
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "white",
      borderColor: "#ccc",
      borderRadius: "4px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "black", // Change text color of selected value
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#3399cc" : "white",
      color: state.isSelected ? "white" : "black", // Change text color of options
      padding: "10px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999, // Ensure the dropdown is above other elements
    }),
  };
  const handleSkip = async (e) => {
    e.preventDefault();
    console.log("handleSkip");
    navigate("/question7", { state: { backLink: "/question5" } });
  }
  return (
    <>
      <HeaderWithLogo />

      <Container>
        <BackIcon onClick={handleGoBack}>
          <RxArrowLeft className="BackIcon" />
        </BackIcon>

        <FormSection>
          <Title>Tell us about your Interview Schedule</Title>

          <Form>
            <FormField>
              <Label>Company Name</Label>
              <Select
                options={companyOptions}
                onChange={handleCompanySelect}
                placeholder="Select Company Name"
                value={companyOptions.find(
                  (option) => option.value === selectedCompany
                )}
                styles={customStyles}
              />
            </FormField>

            <FormField>
              <Label>Date of Interview (Optional)</Label>
              <Input
                type="date"
                min={new Date().toISOString().split('T')[0]} // Ensures only future dates are selectable
                value={interviewDate}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Reset time to compare dates only

                  if (selectedDate >= today) {
                    setInterviewDate(e.target.value);
                  } else {
                    // Optional: Show an error message
                    alert("Please select a future date.");
                    setInterviewDate(""); // Reset if invalid
                  }
                }}
              />
            </FormField>

            <FormField>
              <Label>Role type</Label>
              <Select
                options={designationOptions}
                onChange={handleDesignationSelect}
                placeholder="Select Role"
                value={designationOptions.find(
                  (option) => option.value === selectedDesignation
                )}
                styles={customStyles}
              />
            </FormField>

            <FormField>
              <Label>Round type</Label>
              <Select
                options={interviewRoundOptions}
                onChange={handleInterviewSelect}
                placeholder="Select Round"
                styles={customStyles}
                value={interviewRoundOptions.find(
                  (option) => option.value === selectedInterview
                )}
              />
            </FormField>

            <Button type="submit" onClick={handleSubmit}>
              Next
            </Button>
            <Button
              secondary
              onClick={(e) => { e.preventDefault(); handleSkip(e) }}
              type="button"
            >
              Not scheduled yet
            </Button>
          </Form>
        </FormSection>
      </Container>
    </>
  );
};

export default CompaniesPlan;
