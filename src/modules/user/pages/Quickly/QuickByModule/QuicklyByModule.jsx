import React, { useEffect, useState } from "react";
import { getModuleById } from "../../../../../api/addNewModuleApi";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  ModuleCard,
  ModuleDetails,
  Title,
  Button,
  LinkStyled,
  RevisitLinkContainer,
  ResponsiveContainer
} from "./QuicklyByModule.styles";
import { useParams } from "react-router-dom";
import spark from "../../../../../assets/fluentsparkle.svg";

import { ShimmerText, ShimmerButton } from "react-shimmer-effects";
import theme from "../../../../../theme/Theme";
import { getcompletedOngoingModuleSubTopicByUser, getcompletedOngoingModuleTopicByUser } from "../../../../../api/userProgressApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../../api/userApi";

const QuicklyByModule = () => {
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [completedSubtopics, setCompletedSubtopics] = useState([]);
  const moduleId = useParams().id;
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        const response = await getModuleById(moduleId);
        const compltedTopicsData = await getcompletedOngoingModuleTopicByUser(userData.data.user._id, response.data.module_code);
        const completedSubtopicsData = await getcompletedOngoingModuleSubTopicByUser(userData.data.user._id, response.data.module_code);
        setCompletedTopics(compltedTopicsData.completedOngoingTopics);
        setCompletedSubtopics(completedSubtopicsData.completedOngoingSubtopics);
       
        setModuleData(response.data);
        console.log("moduleData", response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching module data:", err);
        setError("Failed to load module data.");
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <ShimmerText line={1} gap={10} />
        <ShimmerButton size="md" />
        {[1, 2, 3].map((_, topicIndex) => (
          <div key={topicIndex} style={{ marginTop: "20px" }}>
            <ShimmerText line={1} gap={10} />
            {[1, 2].map((_, subtopicIndex) => (
              <div
                key={subtopicIndex}
                style={{
                  position: "relative",
                  paddingBottom: "40px",
                }}
              >
                <ShimmerText line={1} gap={8} />
                <ShimmerText line={3} gap={6} />
                <ShimmerButton size="sm" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <Container>
      <ModuleCard>
        <ModuleDetails>
          <ResponsiveContainer>
            {loading ? (
              <ShimmerText line={1} gap={10} />
            ) : (
              <Title>{moduleData.moduleName}</Title>
            )}

            {loading ? (
              <ShimmerButton size="md" />
            ) : (
              // <LinkStyled href={moduleData.interviewSampleURL} target="_blank">
              <Button onClick={() => { console.log("moduleData"); navigate(`/user/learning/${moduleId}/topic/sampleInterview`); }}>
                <img src={spark} alt="start" /> View Sample Interview
              </Button>
              // </LinkStyled>
            )}
          </ResponsiveContainer>

          <div style={{ width: "100%" }}>
            {moduleData.topicData.map((topic, topicIndex) => {
              return (

                completedTopics.length > 0 && completedTopics.includes(topic.topic_code) ?
                  (

                    <div key={topicIndex} style={{ width: "100%" }}>
                      {loading ? (
                        <ShimmerText line={10} gap={10} />
                      ) : (
                        <h3 style={{ margin: "0" }}>
                          Topic {topicIndex + 1} - {topic.topicName}
                        </h3>
                      )}

                      {topic.subtopicData.map((subtopic, subtopicIndex) => {

                        return (
                          completedSubtopics.length > 0 && completedSubtopics.includes(subtopic.subtopic_code) ?
                            (<div
                              key={subtopicIndex}
                              style={{
                                position: "relative",
                                paddingBottom: "40px",
                                width: "100%",
                              }}
                            >
                              <div>
                                {loading ? (
                                  <ShimmerText line={1} gap={8} />
                                ) : (
                                  <h4 style={{ margin: "0", marginTop: "30px" }}>
                                    {subtopic.subtopicName}
                                  </h4>
                                )}

                                {loading ? (
                                  <ShimmerText line={3} gap={6} />
                                ) : (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: parseJSONContent(subtopic.revisionPoints),
                                    }}
                                    style={{ margin: "0" }}
                                  ></p>
                                )}
                              </div>

                              {!loading && (
                                <RevisitLinkContainer>
                                  <Link
                                    to={`/user/learning/${moduleId}/topic`}
                                    state={{ topicIndex: Number(topicIndex), subtopicIndex: Number(subtopicIndex) }}
                                    style={{
                                      textDecoration: "none",
                                      color: theme.colors.bluetext,
                                    }}
                                  >
                                    Revisit Subtopic
                                  </Link>
                                </RevisitLinkContainer>
                              )}
                            </div>
                            ) :
                            (
                              <></>
                            )

                        )
                      }

                      )}
                    </div>

                  ) : (
                    <></>
                  ))

            })}
          </div>
        </ModuleDetails>
      </ModuleCard>
    </Container>
  );
};

const parseJSONContent = (content) => {
  try {
    const parsedContent = JSON.parse(content);
    return parsedContent;
  } catch (error) {
    console.error("Error parsing JSON content:", error);
    return content;
  }
};

export default QuicklyByModule;