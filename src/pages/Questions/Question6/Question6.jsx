import React, { useEffect, useState } from "react";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";
import { Question6Wrapper, SkipButton } from "./Question6.Styles";
import { useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import { useUser } from "@clerk/clerk-react";
import { getJobById, getJobs } from "../../../api/jobApi";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";
import { getCompanies } from "../../../api/comapniesApi";
import { getDesignations } from "../../../api/designationApi";
import { getInterviewRounds } from "../../../api/interviewRoundApi";
import Select from "react-select";

function Question6() {
  const [comapnyData, setCompanyData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [interviewData, setInterviewData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [companyImageList, setCompanyImageList] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const apiCaller = async () => {
      if (!user) {
        return;
      }
      const userData = await getUserByClerkId(user.id);
      const questionariesData = await getQuestionariesByUserId(userData.data.user._id)
      console.log("questionaries Data qq ", questionariesData)
      if (questionariesData.data[0]?.data_planned_interview_response) {
        console.log(" lala ", questionariesData.data[0].data_planned_interview_response.designations);
        setSelectedCompany(questionariesData.data[0].data_planned_interview_response.companies);
        setSelectedDesignation(questionariesData.data[0].data_planned_interview_response.designations);
      }
      if (userData.data.user.profile_status) {
        navigate("/user")
      }
    };
    apiCaller();
  }, [user]);

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
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/question4");
  };
  const handleCompanySelect = (companies) => {
    setSelectedCompany(companies.map((company) => company.value));
    const datad = companies.map((company) => {
      return comapnyData.find((copm) => {
        if (copm._id === company.value) {
          return copm;
        }
      });
    });
    setCompanyImageList(datad);
  };
  const handleDesignationSelect = (designation) => {
    setSelectedDesignation(designation.value);
  };

  const companyOptions = comapnyData.map((company) => ({
    value: company._id,
    label: company.company_name,
    customLabel: (
      <div style={{ display: "flex", alignItems: "center", color: "black" }}>
        <img
          src={company.company_logo}
          alt={company.company_name}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        {company.company_name}
      </div>
    ),
  }));
  const designationOptions = designationData.map((desgnation) => ({
    value: desgnation._id,
    label: desgnation.designation_name,
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
const handleNext = async () => {
  if (!selectedCompany || selectedCompany.length === 0) {
    setErrorMessage("Please select a company and role or choose 'Not sure yet'.");
    return;
  }

  setErrorMessage(""); // clear error if all good

  const data = await getUserByClerkId(user.id);
  const submissionData = {
    user_id: data.data.user._id,
    data_planned_interview_response: {
      companies: selectedCompany,
      designations: selectedDesignation,
    },
  };
  await createUserProfile(submissionData);
  navigate("/question7", { state: { backLink: "/question6" } });
};


  return (
    <Question6Wrapper>
      <HeaderWithLogo />
      <div className="Container">
        <div className="BackIcon" onClick={handleGoBack}>
          <RxArrowLeft />
        </div>
        <div className="Title">Companies you plan to interview with</div>
        <div className="Form">
          <label className="Label">Company Name</label>
          <Select
            options={companyOptions}
            onChange={handleCompanySelect}
            placeholder="Select Company Name"
            value={companyOptions.filter(
              (option) => selectedCompany.includes(option.value)
            )}
            styles={customStyles}
            isMulti
          />
          <label className="Label">Role</label>

          <Select
            options={designationOptions}
            onChange={handleDesignationSelect}
            placeholder="Select Role"
            styles={customStyles}
            value={designationOptions.find(
              (option) => option.value === selectedDesignation
            )}
          />

          <div className="Selected">
            Selected – {selectedCompany ? selectedCompany.length : 0}
            <div className="SelectedList">
              {companyImageList &&
                companyImageList.map((company) => {
                  return (
                    <img
                      className="image"
                      // src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      src={company.company_logo}
                      alt="Amazon"
                      height="30px"
                    />
                  );
                })}
            </div>
          </div>

{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

          <button className="NextButton" onClick={handleNext}>
            Next
          </button>

         <button
  className="anotherCompany"
  onClick={() => {
    setErrorMessage(""); // clear error if user chooses to skip
    navigate("/question7", { state: { backLink: "/question6" } });
  }}
>
  Not sure yet
</button>
          {/* <SkipButton onClick={() => navigate("/question7")}>Skip</SkipButton> */}
        </div>
      </div>
    </Question6Wrapper>
  );
}

export default Question6;
