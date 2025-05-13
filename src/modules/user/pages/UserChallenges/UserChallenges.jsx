import React, { useState } from "react";
import TakeChallenge from "../../components/UserChalleneges/TakeChallenge";
import PastChallenge from "../../components/UserChalleneges/PastChallenge";
import { 
    UserChallengesWrapper,
    Challengescontainer,
    Tabbuttons
 } from "./UserChallenges.styles";
import ApproachAnalysis from "../../components/UserChalleneges/Approachanalysis/ApproachAnalysis";

const UserChallenges = () => {
  const [activeTab, setActiveTab] = useState("Approach Analysis");

  return (
    <UserChallengesWrapper>
      <Challengescontainer>

        {/* Tab Navigation */}
        <Tabbuttons>
          <button
            className={activeTab === "Coding" ? "active" : ""}
            onClick={() => setActiveTab("Coding")}
          >
            Coding
          </button>
          <button
            className={activeTab === "Approach Analysis" ? "active" : ""}
            onClick={() => setActiveTab("Approach Analysis")}
          >
            Approach Analysis
          </button>
          <button
            className={activeTab === "Case Study" ? "active" : ""}
            onClick={() => setActiveTab("Case Study")}
          >
            Case Study
          </button>
          <button
            className={activeTab === "Single-line" ? "active" : ""}
            onClick={() => setActiveTab("Single-line")}
          >
            Single-line
          </button>
          <button
            className={activeTab === "Multi-line" ? "active" : ""}
            onClick={() => setActiveTab("Multi-line")}
          >
            Multi-line
          </button>
          <button
            className={activeTab === "MCQ" ? "active" : ""}
            onClick={() => setActiveTab("MCQ")}
          >
            MCQ
          </button>
         
        </Tabbuttons>

        <hr className="divider" />

        {/* Tab Content */}
        {activeTab === "Coding" && (
          <>
            <TakeChallenge />
            <hr className="divider" />
            <PastChallenge />
          </>
        )}

        {activeTab === "Approach Analysis" && (
            <>
            <ApproachAnalysis/>
            </>
        )}

        {activeTab === "Case Study" && (
                  <div className="empty-tab">Approach Analysis content coming soon...</div>
        )}

        {activeTab === "Single-line" && (
          <div className="empty-tab">Approach Analysis content coming soon...</div>
        )}

{activeTab === "Multi-line" && (
          <div className="empty-tab">Approach Analysis content coming soon...</div>
        )}

{activeTab === "MCQ" && (
          <div className="empty-tab">Approach Analysis content coming soon...</div>
        )}

      </Challengescontainer>
    </UserChallengesWrapper>
  );
};

export default UserChallenges;
