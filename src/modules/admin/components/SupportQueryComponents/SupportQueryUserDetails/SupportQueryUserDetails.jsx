import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import {
  Container,
  Header,
  QueryId,
  SeverityBadge,
  QueryDetails,
  RaisedBy,
  ProfileImage,
  UserInfo,
  QueryInfoSection,
  QueryHeading,
  QueryContent,
  CommunicationLog,
  LogEntry,
  LogTime,
  LogMessage,
  Divider,
  QueryDate,
} from "./SupportQueryUserDetails.styles";
import {
  getSupportQueryById,
  updateSupportQuery,
} from "../../../../../api/supportQueryApi";
import { getUserByClerkId } from "../../../../../api/userApi";
import ConfirmationModal from "../Confirmation/Confirmation";

const SupportQueryUserDetails = () => {
  const { id } = useParams();
  const [queryDetails, setQueryDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryDate, setQueryDate] = useState(null);
  const [closedDate, setClosedDate] = useState("Pending");
  const [querySolvedMessage, setQuerySolvedMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for the modal visibility

  useEffect(() => {
    const fetchQueryAndUserDetails = async () => {
      try {
        const queryData = await getSupportQueryById(id);

        setQueryDate(new Date(queryData.submitted_on).toLocaleDateString());

        if (queryData.closed_on) {
          setClosedDate(
            ` ${new Date(
              queryData.closed_on
            ).toLocaleDateString()}- Closed by Admin`
          );
        }

        setQueryDetails(queryData);

        if (queryData?.user_id?.clerkUserId) {
          const userDataResponse = await getUserByClerkId(
            queryData.user_id.clerkUserId
          );

          if (userDataResponse?.success) {
            const { user, clerkUserData } = userDataResponse.data;
            setUserDetails({
              user_name: user?.user_name || "N/A",
              user_email: user?.user_email || "N/A",
              profileImage:
                clerkUserData?.imageUrl ||
                user?.user_profile_pic ||
                "https://via.placeholder.com/50",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueryAndUserDetails();
  }, [id]);

  const handleQueryUpdate = async () => {
    try {
      if (!queryDetails) return;

      const updatedClosedDate = new Date();

      const updatedLog = [
        ...(queryDetails.communicationLog || []),
        {
          date: updatedClosedDate, 
          time: updatedClosedDate.toLocaleTimeString(),
          message: "Query solved by admin.",
        },
      ];

      const data = {
        status: "solved",
        communicationLog: updatedLog,
        closed_on: updatedClosedDate, 
      };

      const response = await updateSupportQuery(id, data);
      console.log("Update query response:", response);

      if (response?.status === "solved") {
        setQueryDetails((prevState) => ({
          ...prevState,
          status: "solved",
          communicationLog: updatedLog,
          closed_on: updatedClosedDate,
        }));
        setClosedDate(`Closed on: ${updatedClosedDate.toLocaleDateString()}`);
        setQuerySolvedMessage("Query Solved by Admin!");
       message.success("Query solved successfully!");
      }
    } catch (error) {
      console.error("Error updating query:", error);
      message.error("Failed to solve query. Please try again.");
    }
  };

  const handleMarkAsSolvedClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleConfirmModal = () => {
    handleQueryUpdate();
    setShowModal(false); 
  };

  if (loading) return;
  if (error) return <p>{error}</p>;
  if (!queryDetails) return <p>No query details found.</p>;

  return (
    <Container>
      <Header>
        <QueryId>
          <div className="queryDetails">
            <p className="query">{queryDetails._id}</p>
            <SeverityBadge severity={queryDetails.priority}>
              {queryDetails.priority}
            </SeverityBadge>
          </div>
          <QueryDetails>{queryDetails.category}</QueryDetails>
          <QueryDate>Uploaded on: {queryDate}</QueryDate>
        </QueryId>

        <div className="hrdivider"></div>

        <RaisedBy>
          <p className="RaisedBy">Raised By</p>
          <ProfileImage
            src={userDetails?.profileImage}
            alt={userDetails?.user_name || "User"}
          />
          <UserInfo>
            <strong>{userDetails?.user_name || "N/A"}</strong>
            <br />
            <span>{userDetails?.user_email || "N/A"}</span>
          </UserInfo>
        </RaisedBy>
      </Header>
      <Divider />

      <QueryInfoSection>
        <QueryHeading>Query Info</QueryHeading>
        <QueryContent>{queryDetails.query_description || "N/A"}</QueryContent>
      </QueryInfoSection>
      <Divider />

      <CommunicationLog>
        <QueryHeading>Communication Log</QueryHeading>
        <LogEntry
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <LogTime>
            {queryDate} -{" "}
            <strong
              style={{
                color: "black",
                fontWeight: "normal",
              }}
            >
              User submitted the query
            </strong>
          </LogTime>
          <LogMessage>{closedDate}</LogMessage>
        </LogEntry>

        {querySolvedMessage && <p style={{ color: "green" }}>{querySolvedMessage}</p>}

        <button
          onClick={handleMarkAsSolvedClick}
          disabled={queryDetails.status === "solved"}
          style={{
            color: queryDetails.status === "solved" ? "green" : "red", 
            backgroundColor:
              queryDetails.status === "solved" ? "#f0fff0" : "#ffebeb", 
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          {queryDetails.status === "solved" ? "Solved" : "Mark as Solved"}
        </button>
      </CommunicationLog>

      {/* Display modal when showModal is true */}
      {showModal && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      )}
    </Container>
  );
};

export default SupportQueryUserDetails;
