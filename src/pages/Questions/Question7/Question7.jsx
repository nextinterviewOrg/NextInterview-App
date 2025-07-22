import React, { useEffect, useState } from "react";
import HeaderWithLogo from "../../../components/HeaderWithLogo/HeaderWithLogo";
import { Question7Wrapper,SkipButton } from "./Question7.styles";
import { useLocation, useNavigate } from "react-router";
import { RxArrowLeft } from "react-icons/rx";
import { useUser } from "@clerk/clerk-react";
import { getCompanies } from "../../../api/comapniesApi";
import { getDesignations } from "../../../api/designationApi";
import { getTopics } from "../../../api/topicApi";
import { createUserProfile, getQuestionariesByUserId, getUserByClerkId } from "../../../api/userApi";
import Select from "react-select";
import { useLocale } from "antd/es/locale";

function Question7() {
  const [companyData, setCompanyData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const location = useLocation();
  const [companiesDetails, setCompaniesDetails] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();
  
  useEffect(() => {
    const apiCaller = async () => {
      if (!user) return;

      const userData = await getUserByClerkId(user.id);
      const questionariesData = await getQuestionariesByUserId(userData.data.user._id);

      if (questionariesData.data[0]?.data_past_interview_response.length > 0) {
        // Map API response to new array format
        const initialCompanies = questionariesData.data[0].data_past_interview_response.map(interview => ({
          selectedCompany: interview.company_Name?._id || "",
          selectedDesignation: interview.designation?._id || "",
          whatWentWell: interview.what_went_well || "",
          whatWentWrong: interview.what_went_bad || "",
          selectedTopics: interview.topics?.map(item => item._id) || [],
        }));

        // Set state once with complete array
        setCompaniesDetails(initialCompanies);
      }else{
        const initialCompanies = [{
          selectedCompany: "",
          selectedDesignation: "",
          whatWentWell: "",
          whatWentWrong: "",
          selectedTopics: [],
        }];
        setCompaniesDetails(initialCompanies);
      }
      if(userData.data.user.profile_status){
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
      const topics = await getTopics();
      setTopicData(topics.data);
    };
    apiCaller();
  }, []);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(location.state.backLink);
  };

  const handleCompanySelect = (company, index) => {
    const updatedCompaniesDetails = [...companiesDetails];
    updatedCompaniesDetails[index].selectedCompany = company.value;
    setCompaniesDetails(updatedCompaniesDetails);
  };

  const handleDesignationSelect = (designation, index) => {
    const updatedCompaniesDetails = [...companiesDetails];
    updatedCompaniesDetails[index].selectedDesignation = designation.value;
    setCompaniesDetails(updatedCompaniesDetails);
  };

  const handleTopicSelect = (topics, index) => {
    const updatedCompaniesDetails = [...companiesDetails];
    updatedCompaniesDetails[index].selectedTopics = topics.map(
      (topic) => topic.value
    );
    setCompaniesDetails(updatedCompaniesDetails);
  };

  const handleAddAnotherCompany = () => {
    setCompaniesDetails([
      ...companiesDetails,
      {
        selectedCompany: "",
        selectedDesignation: "",
        whatWentWell: "",
        whatWentWrong: "",
        selectedTopics: [],
      },
    ]);
  };

  const companyOptions = companyData.map((company) => ({
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

  const topicOptions = topicData.map((topic) => ({
    value: topic._id,
    label: topic.topic_name,
  }));

  const handleNext = async () => {
    const data = await getUserByClerkId(user.id);
    const pastData = companiesDetails.map((companyDetail) => {
      return {
        company_Name: companyDetail.selectedCompany,
        designation: companyDetail.selectedDesignation,
        what_went_well: companyDetail.whatWentWell,
        what_went_bad: companyDetail.whatWentWrong,
        topics: companyDetail.selectedTopics,
      };
    });
    const submissionData = {
      user_id: data.data.user._id,
      data_past_interview_response: pastData,
      profile_status:true,
    };

    const responseData = await createUserProfile(submissionData);
    navigate("/profileComplete", { state: { backLink: "/question7" } }, { replace: true });
  };
  const handleDeleteCompany = (indexToDelete) => {
    setCompaniesDetails(companiesDetails.filter((_, index) => index !== indexToDelete));
  };

  const handleSkip = async () => {
    const data = await getUserByClerkId(user.id);
    const submissionData = {
      user_id: data.data.user._id,
      profile_status: true,
    };
    const responseData = await createUserProfile(submissionData);
    navigate("/profileComplete", { state: { backLink: "/question7" } }, { replace: true });
  };

  return (
    <Question7Wrapper>
      <HeaderWithLogo />
      <div className="Container">
        <div className="BackIcon" onClick={handleGoBack}>
          <RxArrowLeft />
        </div>
        <div className="Title">Tell me about past interview experience</div>

        {companiesDetails.map((companyDetail, index) => (

          <div className="Form" key={index}>
            <label className="Label">Company Name</label>
            <Select
              options={companyOptions}
              onChange={(company) => handleCompanySelect(company, index)}
              placeholder="Select Company Name"
              value={companyOptions.find(
                (option) => option.value === companyDetail.selectedCompany
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  borderRadius: "4px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? "#3399cc" : "white",
                  color: state.isSelected ? "white" : "black",
                  padding: "10px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />

            <label className="Label">Role</label>
            <Select
              options={designationOptions}
              onChange={(designation) =>
                handleDesignationSelect(designation, index)
              }
              placeholder="Select Role"
              value={designationOptions.find(
                (option) => option.value === companyDetail.selectedDesignation
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  borderRadius: "4px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? "#3399cc" : "white",
                  color: state.isSelected ? "white" : "black",
                  padding: "10px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />

            <label className="Label">What went well?</label>
            <input
              type="text"
              value={companyDetail.whatWentWell}
              onChange={(e) => {
                const updatedCompaniesDetails = [...companiesDetails];
                updatedCompaniesDetails[index].whatWentWell = e.target.value;
                setCompaniesDetails(updatedCompaniesDetails);
              }}
              placeholder="What went well during the interview?"
              className="input"
              maxLength={5000}
            />

            <label className="Label">What went wrong?</label>
            <input
              type="text"
              value={companyDetail.whatWentWrong}
              onChange={(e) => {
                const updatedCompaniesDetails = [...companiesDetails];
                updatedCompaniesDetails[index].whatWentWrong = e.target.value;
                setCompaniesDetails(updatedCompaniesDetails);
              }}
              placeholder="What went wrong during the interview?"
              className="input"
              maxLength={5000}
            />

            <label className="Label">Topic asked</label>
            <Select
              options={topicOptions}
              onChange={(topics) => handleTopicSelect(topics, index)}
              placeholder="Select Topic"
              value={topicOptions.filter((option) =>
                companyDetail.selectedTopics.includes(option.value)
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  borderRadius: "4px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? "#3399cc" : "white",
                  color: state.isSelected ? "white" : "black",
                  padding: "10px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              isMulti
            />

            {index > 0 && (
              <button
                className="DeleteButton"
                onClick={() => handleDeleteCompany(index)}
              >
                Delete Company
              </button>
            )}
          </div>

        ))}

        <button className="NextButton" onClick={handleNext}>
          Next
        </button>
         <SkipButton onClick={handleSkip}>Skip</SkipButton>

        <button className="anotherCompany" onClick={handleAddAnotherCompany}>
          Add Another Company
        </button>
      </div>
    </Question7Wrapper>
  );
}

export default Question7;
