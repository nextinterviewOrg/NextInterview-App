import React, { useEffect, useState } from "react";
import { getModuleById } from "../../../../../api/addNewModuleApi";
import { Link } from "react-router-dom";
import {
  Container,
  ModuleCard,
  ModuleDetails,
  Title,
  Button,
  LinkStyled,
} from "./QuicklyByModule.styles";
import { useParams } from "react-router-dom";
import spark from "../../../../../assets/fluentsparkle.svg";

import { ShimmerText, ShimmerButton } from "react-shimmer-effects";

const QuicklyByModule = () => {
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const moduleId = useParams().id;

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await getModuleById(moduleId);
        setModuleData(response.data);
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
        {/* You can also put a flexbox or grid here to structure your skeletons */}
        <ShimmerText line={1} gap={10} />
        <ShimmerButton size="md" />
        {/* Replicate as many placeholders as needed to match final layout */}
        
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Shimmer for Title during loading */}
            {loading ? (
              <ShimmerText line={1} gap={10} />
            ) : (
              <Title>{moduleData.moduleName}</Title>
            )}

            {/* Shimmer for View Sample Button during loading */}
            {loading ? (
              <ShimmerButton size="md" />
            ) : (
              <LinkStyled href={moduleData.interviewSampleURL} target="_blank">
                <Button>
                  <img src={spark} alt="start" /> View Sample Interview
                </Button>
              </LinkStyled>
            )}
          </div>

          <div>
            {moduleData.topicData.map((topic, topicIndex) => (
              <div key={topicIndex}>
                {/* Shimmer for Topic Name */}
                {loading ? (
                  <ShimmerText line={10} gap={10} />
                ) : (
                  <h3 style={{ margin: "0" }}>
                    Topic {topicIndex + 1} - {topic.topicName}
                  </h3>
                )}

                {topic.subtopicData.map((subtopic, subtopicIndex) => (
                  <div
                    key={subtopicIndex}
                    style={{
                      position: "relative",
                      paddingBottom: "40px",
                    }}
                  >
                    <div>
                      {/* Shimmer for Subtopic Name */}
                      {loading ? (
                        <ShimmerText line={1} gap={8} />
                      ) : (
                        <h4 style={{ margin: "0", marginTop: "30px" }}>
                          {subtopic.subtopicName}
                        </h4>
                      )}

                      {/* Shimmer for Subtopic Summary */}
                      {loading ? (
                        <ShimmerText line={3} gap={6} />
                      ) : (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: parseJSONContent(subtopic.subtopicSummary),
                          }}
                          style={{ margin: "0" }}
                        ></p>
                      )}
                    </div>

                    {/* Shimmer for Revisit Button */}
                    {loading ? (
                      <ShimmerButton size="sm" />
                    ) : (
                      <Link to={`/user/learning/${moduleId}/topic`}>
                        <Button
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                            width: "auto",
                            border: "none",
                          }}
                        >
                          Revisit Subtopic
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ModuleDetails>
      </ModuleCard>
    </Container>
  );
};

// Helper function to parse JSON content safely
const parseJSONContent = (content) => {
  try {
    const parsedContent = JSON.parse(content);
    return parsedContent; // Return parsed content if it's valid JSON
  } catch (error) {
    console.error("Error parsing JSON content:", error);
    return content; // Return original content if parsing fails
  }
};

export default QuicklyByModule;
