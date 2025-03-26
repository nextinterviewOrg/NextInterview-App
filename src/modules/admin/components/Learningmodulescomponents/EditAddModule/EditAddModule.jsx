import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";
import {
  AddContainer,
  Heading,
  SectionHeader,
  SectionTitle,
  SubText,
  UploadManually,
  Label,
  TextInput,
  TextArea,
  UploadButton,
  CheckboxContainer,
  ConceptClarifierContainer,
  ClarifierHeading,
  ButtonRow,
  ActionButton,
  PaginationContainer,
  FormGroup,
  ModalContainer,
  ModalContent,
  ModalButton,
} from "./EditAddModule.style";
import theme from "../../../../../theme/Theme";
import DeleteModule from "../../DeleteModule/DeleteModule";
import {
  uploadFileToFirebase,
  uploadVideoToFirebase,
} from "../../../../../utils/uploadFileToFirebase";
import {
  updateModuleById,
  getModuleById,
} from "../../../../../api/addNewModuleApi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

// Styled icon/button if you want to show a delete icon
const DeleteIconWrapper = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: ${theme.colors.secondary};

  &:hover {
    color: red;
  }
`;

const EditAddModule = () => {
  // ----------------------------- STATES -----------------------------
  const [modalVisible, setModalVisible] = useState(false);

  // 'topic', 'subtopic', 'layman', or 'clarifier'
  const [deleteType, setDeleteType] = useState(null);
  const location = useLocation();
  const videoInputRef = useRef(null);
  const navigate = useNavigate();
  // Store indices for whichever item we are deleting
  const [deleteIndices, setDeleteIndices] = useState({
    topicIndex: null,
    subIndex: null,
    laymanIndex: null,
    clarifierIndex: null,
  });

  // initial data structure to hold everything
  const [topics, setTopics] = useState([
    {
      topicName: "",
      skillAssessmentFile: null,
      skillAssessmentFileUrl: null,
      subtopics: [
        {
          subtopicName: "",
          subtopicContent: "",
          subtopicSummary: "",
          quickRevisePoints: "",
          cheatSheet: null,
          isInterviewFavorite: false,
          conceptClarifiers: [
            {
              clarifierWordOrPhrase: "",
              explanationOnHover: "",
              moreExplanation: "",
            },
          ],
          // -----------------------------------------------------------------
          // ADD the layman    field to our initial layman object (default scale=1)
          // -----------------------------------------------------------------
          laymanExplanations: [
            {
              laymanScale: 1,
              laymanTitle: "",
              laymanInfo: "",
            },
          ],
          questionBankFile: null,
          questionBankFileUrl: null,
          tryItYourselfFile: null,
          tryItYourselfFileUrl: null,
        },
      ],
    },
  ]);
  const moduleId = useParams().id; // Get the moduleId passed from the previous page

  // ----------------------------- FETCH MODULE DATA -----------------------------
  useEffect(() => {
    if (moduleId) {
      const fetchModuleData = async () => {
        const data = await getModuleById(moduleId);
        // setModuleData(data);
        // setTopics(data.data.topicData);
        const moduleTopicData = data.data.topicData.map((topic) => {
          return {
            topicName: topic.topicName,
            skillAssessmentFile: topic.skillAssessmentQuestionsURL,
            skillAssessmentFileUrl: topic.skillAssessmentQuestionsURL,
            subtopics: topic.subtopicData.map((subtopic) => {
              return {
                subtopicName: subtopic.subtopicName,
                subtopicContent: subtopic.subtopicContent,
                subtopicSummary: subtopic.subtopicSummary,
                quickRevisePoints: subtopic.revisionPoints,
                cheatSheet: { dataUrl: subtopic.cheatSheetURL },
                cheatSheetUrl: subtopic.cheatSheetURL,
                isInterviewFavorite: subtopic.interviewFavorite,
                conceptClarifiers: subtopic.conceptClarifier.map(
                  (clarifier) => {
                    return {
                      clarifierWordOrPhrase: clarifier.conceptClarifier,
                      explanationOnHover: clarifier.hoverExplanation,
                      moreExplanation: clarifier.popupExplanation,
                    };
                  }
                ),
                laymanExplanations: subtopic.laymanTerms.map((layman) => {
                  return {
                    laymanScale: layman.topicLevel,
                    laymanTitle: layman.topicTitle,
                    laymanInfo: layman.topicInfo,
                  };
                }),
                questionBankFile: { dataUrl: subtopic.questionBankURL },
                questionBankFileUrl: subtopic.questionBankURL,
                tryItYourselfFile: { dataUrl: subtopic.tiyQuestionsURL },
                tryItYourselfFileUrl: subtopic.tiyQuestionsURL,
              };
            }),
          };
        });
        setTopics(moduleTopicData);
      };
      fetchModuleData();
    }
  }, [moduleId]);

  // ----------------------------- REF FOR FILE UPLOADS -----------------------------
  const skillAssessmentRefs = useRef([]);
  const questionBankRefs = useRef([]);
  const tryItYourselfRefs = useRef([]);

  // ----------------------------- TOPIC/SUBTOPIC ADD -----------------------------
  const handleAddTopic = () => {
    setTopics((prevTopics) => [
      ...prevTopics,
      {
        topicName: "",
        skillAssessmentFile: null,
        skillAssessmentFileUrl: null,
        subtopics: [
          {
            subtopicName: "",
            subtopicContent: "",
            subtopicSummary: "",
            quickRevisePoints: "",
            cheatSheet: null,
            isInterviewFavorite: false,
            conceptClarifiers: [
              {
                clarifierWordOrPhrase: "",
                explanationOnHover: "",
                moreExplanation: "",
              },
            ],
            laymanExplanations: [
              {
                laymanScale: 1,
                laymanTitle: "",
                laymanInfo: "",
              },
            ],
            questionBankFile: null,
            questionBankFileUrl: null,
            tryItYourselfFile: null,
            tryItYourselfFileUrl: null,
          },
        ],
      },
    ]);
  };

  const handleAddSubtopic = (topicIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics.push({
        subtopicName: "",
        subtopicContent: "",
        subtopicSummary: "",
        quickRevisePoints: "",
        cheatSheet: null,
        isInterviewFavorite: false,
        conceptClarifiers: [
          {
            clarifierWordOrPhrase: "",
            explanationOnHover: "",
            moreExplanation: "",
          },
        ],
        laymanExplanations: [
          {
            laymanScale: 1,
            laymanTitle: "",
            laymanInfo: "",
          },
        ],
        questionBankFile: null,
        questionBankFileUrl: null,
        tryItYourselfFile: null,
        tryItYourselfFileUrl: null,
      });
      return updated;
    });
  };

  // ----------------------------- CONCEPT CLARIFIER -----------------------------
  const handleAddConceptClarifier = (topicIndex, subIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].conceptClarifiers.push({
        clarifierWordOrPhrase: "",
        explanationOnHover: "",
        moreExplanation: "",
      });
      return updated;
    });
  };

  const handleConceptClarifierChange = (
    e,
    editor,
    topicIndex,
    subIndex,
    clarifierIndex,
    clarifierField
  ) => {
    let value;
    if (e != null) {
      value = e.target.value;
    } else {
      value = editor.getData();
    }

    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].conceptClarifiers[clarifierIndex][
        clarifierField
      ] = value;
      return updated;
    });
  };

  // ----------------------------- INPUT CHANGE HANDLERS -----------------------------
  const handleTopicChange = (e, topicIndex, field) => {
    const { value } = e.target;
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex][field] = value;
      return updated;
    });
  };

  const handleSubtopicChange = (e, event, topicIndex, subIndex, field) => {
    let value;
    if (e != null) {
      value = e.target.value;
    } else {
      value = event.getData();
    }
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex][field] = value;
      return updated;
    });
  };

  const handleCheckChange = (e, topicIndex, subIndex) => {
    const { checked } = e.target;
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].isInterviewFavorite = checked;
      return updated;
    });
  };

  // ----------------------------- FILE UPLOAD HANDLERS -----------------------------
  const handleCheatSheetUpload = async (e, topicIndex, subIndex) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      const dataUrl = await uploadFileToFirebase(file, "cheatSheet");
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics[subIndex].cheatSheet = {
          file,
          previewURL,
          dataUrl,
        };
        return updated;
      });
    }
  };

  const handleRemoveCheatSheet = (topicIndex, subIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].cheatSheet = null;
      return updated;
    });
  };

  const handleSkillAssessmentUpload = async (e, topicIndex) => {
    const file = e.target.files[0];
    if (file) {
      const dataUrl = await uploadFileToFirebase(file, "skillAssessment");
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].skillAssessmentFile = file;
        updated[topicIndex].skillAssessmentFileUrl = dataUrl;
        return updated;
      });
    }
  };

  const handleRemoveSkillAssessment = (topicIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].skillAssessmentFile = null;
      updated[topicIndex].skillAssessmentFileUrl = null;
      return updated;
    });
  };

  const handleQuestionBankUpload = async (e, topicIndex, subIndex) => {
    const file = e.target.files[0];
    if (file) {
      const dataUrl = await uploadFileToFirebase(file, "questionBank");
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics[subIndex].questionBankFile = file;
        updated[topicIndex].subtopics[subIndex].questionBankFileUrl = dataUrl;
        return updated;
      });
    }
  };

  const handleRemoveQuestionBank = (topicIndex, subIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].questionBankFile = null;
      updated[topicIndex].subtopics[subIndex].questionBankFileUrl = null;
      return updated;
    });
  };

  const handleTryItYourselfUpload = async (e, topicIndex, subIndex) => {
    const file = e.target.files[0];
    if (file) {
      const dataUrl = await uploadFileToFirebase(file, "tryItYourself");
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics[subIndex].tryItYourselfFile = file;
        updated[topicIndex].subtopics[subIndex].tryItYourselfFileUrl = dataUrl;
        return updated;
      });
    }
  };

  const handleRemoveTryItYourself = async (topicIndex, subIndex) => {
    setTopics((prevTopics) => {
      const updated = [...prevTopics];
      updated[topicIndex].subtopics[subIndex].tryItYourselfFile = null;
      updated[topicIndex].subtopics[subIndex].tryItYourselfFileUrl = null;
      return updated;
    });
  };

  // ----------------------------- DONE BUTTON -----------------------------
  const handleDone = async () => {
    const topicData = topics.map((topic) => {
      return {
        topicName: topic.topicName,
        skillAssessmentQuestionsURL: topic.skillAssessmentFileUrl,
        subtopicData: topic.subtopics.map((sub) => {
          return {
            subtopicName: sub.subtopicName,
            subtopicContent: sub.subtopicContent,
            subtopicSummary: sub.subtopicSummary,
            revisionPoints: sub.quickRevisePoints,
            cheatSheetURL: sub.cheatSheet?.dataUrl,
            interviewFavorite: sub.isInterviewFavorite,
            conceptClarifier: sub.conceptClarifiers.map((concept) => {
              return {
                conceptClarifier: concept.clarifierWordOrPhrase,
                hoverExplanation: concept.explanationOnHover,
                popupExplanation: concept.moreExplanation,
              };
            }),
            laymanTerms: sub.laymanExplanations.map((laymn) => {
              return {
                topicLevel: laymn.laymanScale,
                topicTitle: laymn.laymanTitle,
                topicInfo: laymn.laymanInfo,
              };
            }),
            questionBankURL: sub.questionBankFile.dataUrl,
            tiyQuestionsURL: sub.tryItYourselfFile.dataUrl,
          };
        }),
      };
    });

    // Prepare final submission payload
    const submissionData = {
      topicData: topicData,
    };

    const response = await updateModuleById(moduleId, submissionData);
    // const response = await addNewModule(submissionData);

    // Reset form
    setTopics([
      {
        topicName: "",
        skillAssessmentFile: null,
        subtopics: [
          {
            subtopicName: "",
            subtopicContent: "",
            subtopicSummary: "",
            quickRevisePoints: "",
            cheatSheet: null,
            isInterviewFavorite: false,
            conceptClarifiers: [
              {
                clarifierWordOrPhrase: "",
                explanationOnHover: "",
                moreExplanation: "",
              },
            ],
            // Start again with 1 layman explanation
            laymanExplanations: [
              {
                laymanScale: 1,
                laymanTitle: "",
                laymanInfo: "",
              },
            ],
            questionBankFile: null,
            tryItYourselfFile: null,
          },
        ],
      },
    ]);
    setModalVisible(true); // show success modal
    navigate("/admin/learning");
  };

  // ----------------------------- DELETE HANDLING -----------------------------
  const openDeleteModal = (
    type,
    topicIndex,
    subIndex = null,
    laymanIndex = null,
    clarifierIndex = null
  ) => {
    /**
     * 1) Check if it's the ONLY item. If yes, do not allow delete.
     */
    if (type === "topic") {
      // If there's only 1 topic, do not allow delete.
      if (topics.length <= 1) {
        alert("Cannot delete the default topic!");
        return;
      }
    } else if (type === "subtopic") {
      // If there's only 1 subtopic in that topic, do not allow delete.
      if (topics[topicIndex].subtopics.length <= 1) {
        alert("Cannot delete the default subtopic!");
        return;
      }
    } else if (type === "layman") {
      // If there's only 1 layman explanation in that subtopic, do not allow delete.
      if (
        topics[topicIndex].subtopics[subIndex].laymanExplanations.length <= 1
      ) {
        alert("Cannot delete the default layman explanation!");
        return;
      }
    } else if (type === "clarifier") {
      // If there's only 1 clarifier in that subtopic, do not allow delete.
      if (
        topics[topicIndex].subtopics[subIndex].conceptClarifiers.length <= 1
      ) {
        alert("Cannot delete the default concept clarifier!");
        return;
      }
    }

    setDeleteType(type);
    setDeleteIndices({ topicIndex, subIndex, laymanIndex, clarifierIndex });
    setModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    const { topicIndex, subIndex, laymanIndex, clarifierIndex } = deleteIndices;

    if (deleteType === "topic") {
      // remove entire topic
      setTopics((prevTopics) =>
        prevTopics.filter((_, idx) => idx !== topicIndex)
      );
    } else if (deleteType === "subtopic") {
      // remove single subtopic
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics = updated[topicIndex].subtopics.filter(
          (_, idx) => idx !== subIndex
        );
        return updated;
      });
    } else if (deleteType === "layman") {
      // remove a single layman explanation
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics[subIndex].laymanExplanations = updated[
          topicIndex
        ].subtopics[subIndex].laymanExplanations.filter(
          (_, idx) => idx !== laymanIndex
        );
        return updated;
      });
    } else if (deleteType === "clarifier") {
      // remove a single concept clarifier
      setTopics((prevTopics) => {
        const updated = [...prevTopics];
        updated[topicIndex].subtopics[subIndex].conceptClarifiers = updated[
          topicIndex
        ].subtopics[subIndex].conceptClarifiers.filter(
          (_, idx) => idx !== clarifierIndex
        );
        return updated;
      });
    }

    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
    setDeleteType(null);
    setDeleteIndices({
      topicIndex: null,
      subIndex: null,
      laymanIndex: null,
      clarifierIndex: null,
    });
  };

  // ----------------------------- RENDER -----------------------------
  return (
    <AddContainer>
      {topics.map((topic, topicIndex) => (
        <div key={topicIndex}>
          <Heading>Add Topic {topicIndex + 1} and Subtopics</Heading>

          {/* TOPIC NAME */}
          <FormGroup>
            <Label>Topic {topicIndex + 1} Name</Label>
            <TextInput
              value={topic.topicName}
              onChange={(e) => handleTopicChange(e, topicIndex, "topicName")}
            />
          </FormGroup>

          {/* SUBTOPICS */}
          {topic.subtopics.map((subtopic, subIndex) => (
            <div
              key={subIndex}
              style={{
                border: `1px solid ${theme.colors.textgray}`,
                padding: theme.spacing(1),
                borderRadius: theme.spacing(1),
                marginBottom: theme.spacing(3),
              }}
            >
              <SectionTitle>Subtopic {subIndex + 1}</SectionTitle>

              {/* SUBTOPIC NAME */}
              <FormGroup>
                <Label>Subtopic {subIndex + 1} Name</Label>
                <TextInput
                  value={subtopic.subtopicName}
                  onChange={(e) =>
                    handleSubtopicChange(
                      e,
                      null,
                      topicIndex,
                      subIndex,
                      "subtopicName"
                    )
                  }
                />
              </FormGroup>

              {/* SUBTOPIC CONTENT */}
              <FormGroup>
                <Label>Subtopic {subIndex + 1} Content</Label>
                <TextArea
                  rows="6"
                  value={subtopic.subtopicContent}
                  onChange={(e) =>
                    handleSubtopicChange(
                      e,
                      topicIndex,
                      subIndex,
                      "subtopicContent"
                    )
                  }
                />
              </FormGroup>

              {/* SUBTOPIC SUMMARY */}
              <FormGroup>
                <Label>Subtopic {subIndex + 1} Summary</Label>
                <TextArea
                  rows="4"
                  value={subtopic.subtopicSummary}
                  onChange={(e) =>
                    handleSubtopicChange(
                      e,
                      topicIndex,
                      subIndex,
                      "subtopicSummary"
                    )
                  }
                />
              </FormGroup>

              {/* QUICK REVISE POINTS */}
              <FormGroup>
                <Label>Quickly Revise Points</Label>
                <TextArea
                  rows="4"
                  value={subtopic.quickRevisePoints}
                  onChange={(e) =>
                    handleSubtopicChange(
                      e,
                      topicIndex,
                      subIndex,
                      "quickRevisePoints"
                    )
                  }
                />
              </FormGroup>

              {/* CHEAT SHEET VIDEO */}
              <FormGroup>
                <Label>Upload Cheat Sheet </Label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {!subtopic.cheatSheet?.dataUrl ? (
                    <>
                      <UploadButton>
                        <FiUpload />
                        <label
                          style={{ cursor: "pointer" }}
                          onClick={() => videoInputRef.current.click()}
                        >
                          Upload
                        </label>
                      </UploadButton>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ref={videoInputRef}
                        style={{ display: "none" }}
                        onChange={(e) =>
                          handleCheatSheetUpload(e, topicIndex, subIndex)
                        }
                      />
                    </>
                  ) : (
                    <>
                      {subtopic.cheatSheet && (
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          Uploaded File:{" "}
                          {subtopic.cheatSheet?.file?.name ? (
                            subtopic.cheatSheet?.file?.name
                          ) : (
                            <a
                              href={subtopic.cheatSheet.dataUrl}
                              style={{
                                color: theme.colors.secondary,
                                cursor: "pointer",
                              }}
                              target="_blank"
                            >
                              {" "}
                              Preview File
                            </a>
                          )}
                          {/* {subtopic.cheatSheet?.file.name} */}
                          <ActionButton
                            variant="danger"
                            onClick={() =>
                              handleRemoveCheatSheet(topicIndex, subIndex)
                            }
                            style={{
                              marginLeft: "10px",
                              color: theme.colors.secondary,
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            Remove file
                          </ActionButton>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FormGroup>

              {/* INTERVIEW FAVORITE CHECKBOX */}
              <CheckboxContainer>
                <input
                  type="checkbox"
                  checked={subtopic.isInterviewFavorite}
                  onChange={(e) => handleCheckChange(e, topicIndex, subIndex)}
                />
                <label>
                  Mark this subtopic as Interview Favorite (This subtopic will
                  be displayed on the home tab)
                </label>
              </CheckboxContainer>

              {/* CONCEPT CLARIFIER SECTION */}
              <ConceptClarifierContainer>
                <ClarifierHeading>Concept Clarifier</ClarifierHeading>
                {subtopic.conceptClarifiers.map((clarifier, clarifierIndex) => (
                  <div key={clarifierIndex} style={{ marginBottom: "10px" }}>
                    <FormGroup>
                      <Label>Concept Clarifier (Enter a Word or Phrase)</Label>
                      <TextInput
                        value={clarifier.clarifierWordOrPhrase}
                        onChange={(e) =>
                          handleConceptClarifierChange(
                            e,
                            null,
                            topicIndex,
                            subIndex,
                            clarifierIndex,
                            "clarifierWordOrPhrase"
                          )
                        }
                        style={{ backgroundColor: theme.colors.backgray }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Explanation on Hover</Label>
                      <TextInput
                        value={clarifier.explanationOnHover}
                        onChange={(e) =>
                          handleConceptClarifierChange(
                            e,
                            topicIndex,
                            subIndex,
                            clarifierIndex,
                            "explanationOnHover"
                          )
                        }
                        style={{ backgroundColor: theme.colors.backgray }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>More Explanation on Popup</Label>
                      <TextArea
                        rows="3"
                        value={clarifier.moreExplanation}
                        onChange={(e) =>
                          handleConceptClarifierChange(
                            e,
                            topicIndex,
                            subIndex,
                            clarifierIndex,
                            "moreExplanation"
                          )
                        }
                        style={{ backgroundColor: theme.colors.backgray }}
                      />
                    </FormGroup>

                    {/* DELETE CLARIFIER BUTTON/ICON */}
                    {clarifierIndex > 1 && (
                      <ButtonRow>
                        <ActionButton
                          variant="danger"
                          style={{
                            marginLeft: "0px",
                            border: "1px solid #2390ac",
                            color: "#2390ac",
                            backgroundColor: "transparent",
                          }}
                          onClick={() =>
                            openDeleteModal(
                              "clarifier",
                              topicIndex,
                              subIndex,
                              null,
                              clarifierIndex
                            )
                          }
                        >
                          Delete Clarifier
                        </ActionButton>
                      </ButtonRow>
                    )}
                  </div>
                ))}

                <ButtonRow>
                  <ActionButton
                    style={{
                      border: "1px solid #2390ac",
                      color: "#2390ac",
                      backgroundColor: "transparent",
                    }}
                    onClick={() =>
                      handleAddConceptClarifier(topicIndex, subIndex)
                    }
                  >
                    + Add Concept Clarifier
                  </ActionButton>
                </ButtonRow>
              </ConceptClarifierContainer>

              {/* DELETE SUBTOPIC BUTTON */}
              {topics[topicIndex].subtopics.length > 1 && (
                <ButtonRow>
                  <ActionButton
                    style={{
                      border: "1px solid #2390ac",
                      color: "#2390ac",
                      backgroundColor: "transparent",
                    }}
                    variant="danger"
                    onClick={() =>
                      openDeleteModal("subtopic", topicIndex, subIndex)
                    }
                  >
                    Delete Subtopic
                  </ActionButton>
                </ButtonRow>
              )}
            </div>
          ))}

          {/* DELETE TOPIC BUTTON */}
          {topics.length > 1 && (
            <ButtonRow>
              <ActionButton
                style={{
                  border: "1px solid #2390ac",
                  color: "#2390ac",
                  backgroundColor: "transparent",
                }}
                variant="danger"
                onClick={() => openDeleteModal("topic", topicIndex)}
              >
                Delete Topic
              </ActionButton>
            </ButtonRow>
          )}

          {/* ADD SUBTOPIC BUTTON */}
          <ButtonRow>
            <ActionButton
              style={{
                border: "none",
                color: "#2390ac",
                backgroundColor: "transparent",
              }}
              onClick={() => handleAddSubtopic(topicIndex)}
            >
              + Add Subtopic
            </ActionButton>
          </ButtonRow>
        </div>
      ))}

      {/* ADD TOPIC & DONE BUTTONS */}
      <ButtonRow>
        <ActionButton
          style={{
            border: "1px solid #2390ac",
            color: "#2390ac",
            backgroundColor: "transparent",
          }}
          onClick={handleAddTopic}
        >
          + Add Topic
        </ActionButton>
        <ActionButton
          variant="primary"
          onClick={handleDone}
          style={{ width: "100px", display: "flex", justifyContent: "center" }}
        >
          Done
        </ActionButton>
      </ButtonRow>

      {/* PAGINATION (OPTIONAL) */}
      <PaginationContainer>
        <Link
          to={`/admin/uploadmodule/${moduleId}`}
          style={{ textDecoration: "none" }}
        >
          <ActionButton>
            <FaArrowLeft size={16} /> Previous{" "}
          </ActionButton>
        </Link>
      </PaginationContainer>

      {/* DELETE CONFIRMATION MODAL */}
      {modalVisible && deleteType && (
        <DeleteModule
          onDelete={handleDeleteConfirm}
          onCancel={closeModal}
          message={
            deleteType === "topic"
              ? "Are you sure you want to delete this entire topic?"
              : deleteType === "subtopic"
              ? "Are you sure you want to delete this subtopic?"
              : deleteType === "layman"
              ? "Are you sure you want to delete this Layman explanation?"
              : "Are you sure you want to delete this Concept Clarifier?"
          }
        />
      )}

      {/* SUCCESS MODAL (WHEN deleteType===null) */}
      {modalVisible && deleteType === null && (
        <ModalContainer>
          <ModalContent>
            <h2>Success</h2>
            <p>Topics and subtopics added successfully!</p>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </ModalContent>
        </ModalContainer>
      )}
    </AddContainer>
  );
};

export default EditAddModule;
