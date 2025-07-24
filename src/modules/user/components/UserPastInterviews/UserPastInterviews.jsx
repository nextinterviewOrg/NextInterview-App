// UserPastInterviews.js
import React, { useEffect, useState } from "react";
import { UserPastInterviewsWrapper } from "./UserPastInterviews.styles";
import { useUser } from "@clerk/clerk-react";
import {
  addPastInterview,
  getUserByClerkId,
  getUserQuestionariesByUserId,
  deletePastInterview
} from "../../../../api/userApi";
import { getCompanies } from "../../../../api/comapniesApi";
import { getDesignations } from "../../../../api/designationApi";
import Select from "react-select";
import { getTopics } from "../../../../api/topicApi";
import { RiDeleteBinLine} from "react-icons/ri";
import DeleteModule from "../../../admin/components/DeleteModule/DeleteModule";
const UserPastInterviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewData, setInterviewData] = useState({
    companyName: "",
    jobRole: "",
    attendedDate: "",
    whatWentWell: "",
    whatDidntGoWell: "",
    questionsAsked: [],
  });
  const { isSignedIn, user, isLoaded } = useUser();
  const [pastInterview, setPastInterview] = useState([]);
  const [userId, setUserId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [interviewToDelete, setInterviewToDelete] = useState(null);
  const pastInterviews = [
    {
      company: "ABCD Private LTD",
      role: "Data Analyst",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      company: "ABCD Private LTD",
      role: "Data Analyst",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Flipkart_logo.png",
    },
  ];
  const [comapnyData, setCompanyData] = useState([]);
  const [jobRoleData, setJobRoleData] = useState([]);
  const [topicData, setTopicData] = useState([]);

useEffect(() => {
  const apiCaller = async () => {
    console.log("Clerk user.id:", user._id); // ✅

    const data = await getUserByClerkId(user.id);
    setUserId(data.data.user._id);

    const questionariesResponse = await getUserQuestionariesByUserId(
      data.data.user._id
    );

const pastInterviews =
  questionariesResponse.data.data_past_interview_response?.map((interview) => {
    return {
      id: interview._id, // ✅ Add this line to store MongoDB document ID
      company: interview.company_Name?.company_Name || "Unknown Company",
      role: interview.designation?.designation_name || "N/A",
      logo: interview.company_Name?.company_logo || "",
    };
  }) || [];

    setPastInterview(pastInterviews);
  };
  apiCaller();
}, [user]);

  useEffect(() => {
    const apiCaller = async () => {
      const company = await getCompanies();
      setCompanyData(
        company.data.map((item) => {
          return {
            value: item._id,
            label: item.company_name,
          };
        })
      );
      const job = await getDesignations();
      setJobRoleData(
        job.data.map((item) => {
          return {
            value: item._id,
            label: item.designation_name,
          };
        })
      );
      const topics = await getTopics();
      setTopicData(
        topics.data.map((topic) => ({
          value: topic._id,
          label: topic.topic_name,
        }))
      );
    };
    apiCaller();
  }, []);

  const confirmDeleteInterview = async () => {
  try {
    await deletePastInterview(userId, interviewToDelete);
    setPastInterview((prev) => prev.filter((int) => int.id !== interviewToDelete));
    setShowDeleteModal(false);
    setInterviewToDelete(null);
  } catch (err) {
    console.error("Failed to delete interview:", err);
  }
};



  const handleDeleteInterview = async (interviewId) => {
  try {
await deletePastInterview(userId, interviewId);
    // Refresh list after deletion
    setPastInterview(pastInterview.filter((int) => int.id !== interviewId));
  } catch (err) {
    console.error("Failed to delete interview:", err);
  }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewData({ ...interviewData, [name]: value });
  };

  const handleAddInterview = async () => {
    const submissionData = {
      date_attended: interviewData.attendedDate,
      company_Name: interviewData.companyName,
      designation: interviewData.jobRole,
      topics: interviewData.questionsAsked,
      what_went_well: interviewData.whatWentWell,
      what_went_bad: interviewData.whatDidntGoWell,
    };
    await addPastInterview(userId, submissionData);
    setInterviewData({
      companyName: "",
      jobRole: "",
      attendedDate: "",
      whatWentWell: "",
      whatDidntGoWell: "",
      questionsAsked: [],
    });
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleTopicSelect = (topics, index) => {
    const updatedCompaniesDetails = { ...interviewData };
    updatedCompaniesDetails.questionsAsked = topics.map((topic) => topic.value);
    setInterviewData(updatedCompaniesDetails);
  };
  return (
    <UserPastInterviewsWrapper>
      <div className="past-interviews-container">
        <h2 className="interview-title">Past actual interviews</h2>
        <div className="interview-list-container">
          <div className="interview-list">
            {pastInterview.map((interview, index) => (
<div key={interview.id} className="interview-card">
  <div className="interview-company-logo">
    <img src={interview.logo} alt={interview.company} className="company-logo" />
  </div>
  <div className="interview-info">
    <h3 className="company-name">{interview.company}</h3>
    <p className="role">{interview.role}</p>
  </div>
<button
  onClick={() => {
    setInterviewToDelete(interview.id);
    setShowDeleteModal(true);
  }}
  className="delete-btn"
>
  <RiDeleteBinLine />
</button>
</div>
            ))}
          </div>
        </div>
        <button
          className="add-interview-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="add-interview-button-text">
            Add a past Interview
          </span>
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-content-title">Add Interview</h2>
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <div className="modal-content-formgroup">
                <label>Company Name</label>
                <select
                  name="companyName"
                  value={interviewData.companyName}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {comapnyData.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="modal-content-formgroup">
                <label>Job Role</label>
                <select
                  name="jobRole"
                  value={interviewData.jobRole}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {jobRoleData.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                {/* <input type="text" name="jobRole" value={interviewData.jobRole} onChange={handleInputChange} /> */}
              </div>
              <div className="modal-content-formgroup">
                <label>Attended Date</label>
                <input
                  type="date"
                  name="attendedDate"
                  value={interviewData.attendedDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-content-formgroup">
                <label>What Went Well</label>
                <textarea
                  name="whatWentWell"
                  value={interviewData.whatWentWell}
                  onChange={handleInputChange}
                  maxLength={5000}
                ></textarea>
              </div>
              <div className="modal-content-formgroup">
                <label>What Didn't Go Well</label>
                <textarea
                  name="whatDidntGoWell"
                  value={interviewData.whatDidntGoWell}
                  onChange={handleInputChange}
                  maxLength={5000}
                ></textarea>
              </div>
              <div className="modal-content-formgroup">
                <label>Topics Asked in the Interview</label>
                <Select
                  options={topicData}
                  onChange={(topics, index) => handleTopicSelect(topics, index)}
                  placeholder="Select Topic"
                  value={topicData.filter((option) =>
                    interviewData.questionsAsked.includes(option.value)
                  )}
                  className="modal-content-formgroup-select"
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
                    width: "100%",
                  }}
                  isMulti
                />
                {/* <textarea name="questionsAsked" value={interviewData.questionsAsked} onChange={handleInputChange}></textarea> */}
              </div>
              <div className="model-btn-container">
                <button className="add-btn" onClick={handleAddInterview}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDeleteModal && (
  <DeleteModule
    onDelete={confirmDeleteInterview}
    onCancel={() => setShowDeleteModal(false)}
  />
)}
    </UserPastInterviewsWrapper>
  );
};

export default UserPastInterviews;
