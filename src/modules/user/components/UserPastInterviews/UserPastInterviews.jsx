// UserPastInterviews.js
import React, { useEffect, useState } from "react";
import { UserPastInterviewsWrapper } from "./UserPastInterviews.styles";
import { useUser } from "@clerk/clerk-react";
import {
  addPastInterview,
  getUserByClerkId,
  getUserQuestionariesByUserId,
  deletePastInterview,
  updatePastinterview,
} from "../../../../api/userApi";
import { getCompanies } from "../../../../api/comapniesApi";
import { getDesignations } from "../../../../api/designationApi";
import Select from "react-select";
import { getTopics } from "../../../../api/topicApi";
import { RiDeleteBinLine } from "react-icons/ri";
// import { RiEditLine } from "react-icons/ri"; 
import { FiEdit3 } from "react-icons/fi";
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
  const [isEditing, setIsEditing] = useState(false); 
const [editingInterviewId, setEditingInterviewId] = useState(null); 

  useEffect(() => {
    const apiCaller = async () => {
      console.log("Clerk user.id:", user._id); // ✅

      const data = await getUserByClerkId(user.id);
      setUserId(data.data.user._id);

      const questionariesResponse = await getUserQuestionariesByUserId(
        data.data.user._id
      );
      console.log("asdfghj", questionariesResponse.data.data_past_interview_response);
      const pastInterviews =
        questionariesResponse.data.data_past_interview_response?.map((interview) => {
          return {
            id: interview._id, // ✅ Add this line to store MongoDB document ID
            company: interview.company_Name?.company_name || "Unknown Company",
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
      console.log("companies ", company);
      setCompanyData(
        company.data.map((item) => {
          return {
            value: item._id,
            label: item.company_name,
          };
        })
      );
      const job = await getDesignations();
      console.log("designation ", job);
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

  const handleUpdateInterview = async () => {
  const submissionData = {
    date_attended: interviewData.attendedDate,
    company_Name: interviewData.companyName,
    designation: interviewData.jobRole,
    topics: interviewData.questionsAsked,
    what_went_well: interviewData.whatWentWell,
    what_went_bad: interviewData.whatDidntGoWell,
  };
  try {
    await updatePastinterview(userId, editingInterviewId, submissionData);
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingInterviewId(null);
    window.location.reload();
  } catch (err) {
    console.error("Failed to update interview:", err);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewData({ ...interviewData, [name]: value });
  };

const handleAddInterview = async () => {
  try {
    const submissionData = {
      date_attended: interviewData.attendedDate,
      company_Name: interviewData.companyName,
      designation: interviewData.jobRole,
      topics: interviewData.questionsAsked,
      what_went_well: interviewData.whatWentWell,
      what_went_bad: interviewData.whatDidntGoWell,
    };
   
    // Add the new interview
    await addPastInterview(userId, submissionData);
   
    // Refresh the interviews list
    const questionariesResponse = await getUserQuestionariesByUserId(userId);
    const updatedInterviews =
      questionariesResponse.data.data_past_interview_response?.map((interview) => {
        return {
          id: interview._id,
          company: interview.company_Name?.company_name || "Unknown Company",
          role: interview.designation?.designation_name || "N/A",
          logo: interview.company_Name?.company_logo || "",
        };
      }) || [];
   
    setPastInterview(updatedInterviews);
   
    // Reset the form and close the modal
    setInterviewData({
      companyName: "",
      jobRole: "",
      attendedDate: "",
      whatWentWell: "",
      whatDidntGoWell: "",
      questionsAsked: [],
    });
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error adding interview:", error);
    // Handle error appropriately
  }
};

  const handleEditInterview = async (interviewId) => {
  const data = await getUserQuestionariesByUserId(userId);
  const interview = data.data.data_past_interview_response.find(int => int._id === interviewId);

  if (interview) {
    setInterviewData({
      companyName: interview.company_Name?._id || "",
      jobRole: interview.designation?._id || "",
      attendedDate: interview.date_attended?.split("T")[0] || "",
      whatWentWell: interview.what_went_well || "",
      whatDidntGoWell: interview.what_went_bad || "",
      questionsAsked: interview.topics?.map(t => t._id) || [],
    });
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingInterviewId(interviewId);
  }
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
                <button
    className="edit-btn"
    onClick={() => handleEditInterview(interview.id)}
  >
    <FiEdit3 />
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
  onClick={() => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingInterviewId(null);
    setInterviewData({
      companyName: "",
      jobRole: "",
      attendedDate: "",
      whatWentWell: "",
      whatDidntGoWell: "",
      questionsAsked: [],
    });
  }}
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
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="modal-content-formgroup">
  <label>What Went Well</label>
  <div className="textarea-wrapper">
    <textarea
      name="whatWentWell"
      value={interviewData.whatWentWell}
      onChange={handleInputChange}
      maxLength={1000}
    ></textarea>
    <div className="char-counter">
      {interviewData.whatWentWell.length}/1000
    </div>
  </div>
</div>
              <div className="modal-content-formgroup">
                <label>What Didn't Go Well</label>
                <div className="textarea-wrapper">
                <textarea
                  name="whatDidntGoWell"
                  value={interviewData.whatDidntGoWell}
                  onChange={handleInputChange}
                  maxLength={1000}
                ></textarea>
                <div className="char-counter">
                  {interviewData.whatDidntGoWell.length}/1000
                </div>
                </div>
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
  <button
    className="add-btn"
    onClick={isEditing ? handleUpdateInterview : handleAddInterview}
  >
    {isEditing ? "Update" : "Add"}
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
