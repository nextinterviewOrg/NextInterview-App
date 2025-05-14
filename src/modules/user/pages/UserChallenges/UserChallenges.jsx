import React, { useState } from "react";
import TakeChallenge from "../../components/UserChalleneges/TakeChallenge";
import PastChallenge from "../../components/UserChalleneges/PastChallenge";
import {
    UserChallengesWrapper,
    Challengescontainer,
    Tabbuttons
} from "./UserChallenges.styles";
import ApproachAnalysis from "../../components/UserChalleneges/Approachanalysis/ApproachAnalysis";
import CaseStudy from "../../components/UserChalleneges/CaseStudy/CaseStudy";
import SingleLine from "../../components/UserChalleneges/SingleLine/SingleLine"
import MultiLine from "../../components/UserChalleneges/MultiLine/MultiLine";
import MCQ from "../../components/UserChalleneges/MCQ/MCQ";

const UserChallenges = () => {
    const [activeTab, setActiveTab] = useState("Coding");

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
                        <ApproachAnalysis />
                    </>
                )}

                {activeTab === "Case Study" && (
                    <>
                        <CaseStudy />
                    </>
                )}

                {activeTab === "Single-line" && (
                    <>
                    <SingleLine />
                    </>
                )}

                {activeTab === "Multi-line" && (
                    <>
                    <MultiLine/>
                    </>
                )}

                {activeTab === "MCQ" && (
                    <>
                    <MCQ/>
                    </>
                )}

            </Challengescontainer>
        </UserChallengesWrapper>
    );
};

export default UserChallenges;
