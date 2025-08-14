import React, { useState, useRef } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";
import {
  PaginationContainer1,
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
  FormGroup,
  ModalContainer,
  ModalContent,
  ModalButton,
  Button,
} from "./AddNewModule.style";
import { RiGeminiFill } from "react-icons/ri";
import theme from "../../../../theme/Theme";
import DeleteModule from "../../../admin/components/DeleteModule/DeleteModule";
import {
  uploadFileToFirebase,
  uploadVideoToFirebase,
} from "../../../../utils/uploadFileToFirebase";
import { addNewModule } from "../../../../api/addNewModuleApi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import TinymceEditor from "../../components/TinymceEditor/TinymceEditor";
import { Editor } from "@tinymce/tinymce-react";
import {
  TinyMCEapiKey,
  TinyMCEmergetags_list,
  TinyMCEplugins,
  TinyMCEToolbar,
} from "../../../../config/TinyMceConfig";

// Styled icon/button if you want to show a delete icon
const DeleteIconWrapper = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: ${theme.colors.secondary};

  &:hover {
    color: red;
  }
`;

const AddNewModule = () => {
  // ----------------------------- STATES -----------------------------
  const [modalVisible, setModalVisible] = useState(false);
  // 'topic', 'subtopic', 'layman', or 'clarifier'
  const [deleteType, setDeleteType] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Validate location state
  React.useEffect(() => {
    if (!location.state?.data) {
      // If no data is present, redirect back to the learning modules page
      navigate("/admin/learning");
    }
  }, [location.state, navigate]);

  // Guard clause for rendering
  if (!location.state?.data) {
    return null; // or return a loading state/error message
  }
  const videoInputRef = useRef(null);

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
  // Concept Clarifier State Variables
  const [selectedText, setSelectedText] = useState({
    text: "",
    topicIndex: null,
    subIndex: null,
  });
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
    newValue,
    topicIndex,
    subIndex,
    clarifierIndex,
    clarifierField
  ) => {
    let value;
    if (e) {
      value = e.target.value; // For standard input events
    } else {
      value = newValue; // For the selected text scenario
    }

    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];

      // Ensure only the specific clarifier field is updated
      if (
        updatedTopics[topicIndex]?.subtopics?.[subIndex]?.conceptClarifiers?.[
        clarifierIndex
        ]
      ) {
        updatedTopics[topicIndex].subtopics[subIndex].conceptClarifiers[
          clarifierIndex
        ][clarifierField] = value || ""; // Ensure it's always a string
      }

      return updatedTopics;
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

  const handleSubtopicChange = (e, newValue, topicIndex, subIndex, field) => {
    let value;
    if (e?.target) {
      value = e.target.value;
    } else {
      value = newValue || "";
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

  const validateForm = () => {
    const newErrors = {};

    topics.forEach((topic, i) => {
      if (!topic.topicName.trim()) {
        newErrors[`topic-${i}-name`] = "Topic name is required";
      }

      topic.subtopics.forEach((sub, j) => {
        if (!sub.subtopicName.trim()) {
          newErrors[`subtopic-${i}-${j}-name`] = "Subtopic name is required";
        }

        if (!sub.subtopicContent?.trim()) {
          newErrors[`subtopic-${i}-${j}-content`] = "Subtopic content is required";
        }

        if (!sub.subtopicSummary?.trim()) {
          newErrors[`subtopic-${i}-${j}-summary`] = "Subtopic summary is required";
        }

        if (!sub.quickRevisePoints?.trim()) {
          newErrors[`subtopic-${i}-${j}-revise`] = "Quick revise points are required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // ----------------------------- DONE BUTTON -----------------------------
  const handleDone = async () => {
    const isValid = validateForm();
    if (!isValid) return; // Stop if validation fails

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
            conceptClarifier: sub.conceptClarifiers.map((concept) => ({
              conceptClarifier: concept.clarifierWordOrPhrase,
              hoverExplanation: concept.explanationOnHover,
              popupExplanation: concept.moreExplanation.replace(/"/g, '\\"'),
            })),
            laymanTerms: sub.laymanExplanations.map((laymn) => {
              return {
                topicLevel: laymn.laymanScale,
                topicTitle: laymn.laymanTitle,
                topicInfo: laymn.laymanInfo,
              };
            }),
            questionBankURL: sub.questionBankFileUrl,
            tiyQuestionsURL: sub.tryItYourselfFileUrl,
          };
        }),
      };
    });

    // Prepare final submission payload
    const submissionData = {
      imageURL: location.state.data.imageURL,
      moduleName: location.state.data.moduleName,
      description: location.state.data.description,
      approxTimeTaken: location.state.data.approxTimeTaken,
      interviewSampleURL: location.state.data.interviewSampleURL,
      courseOverview: location.state.data.courseOverview,
      userLearntData: location.state.data.userLearntData,
      topicData: topicData,
    };

    const response = await addNewModule(submissionData);

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
            // style={{
            //   borderColor: errors[`topic-${topicIndex}-name`] ? "red" : undefined,
            // }}
            />
            {errors[`topic-${topicIndex}-name`] && (
              <div style={{ color: "red", fontSize: "0.85rem" }}>
                {errors[`topic-${topicIndex}-name`]}
              </div>
            )}
          </FormGroup>

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
                    handleSubtopicChange(e, null, topicIndex, subIndex, "subtopicName")
                  }
                // style={{
                //   borderColor: errors[`subtopic-${topicIndex}-${subIndex}-name`] ? "red" : undefined,
                // }}
                />
                {errors[`subtopic-${topicIndex}-${subIndex}-name`] && (
                  <div style={{ color: "red", fontSize: "0.85rem" }}>
                    {errors[`subtopic-${topicIndex}-${subIndex}-name`]}
                  </div>
                )}
              </FormGroup>


              {/* SUBTOPIC CONTENT */}
              <FormGroup>
                <Label>Subtopic {subIndex + 1} Content</Label>
                <Editor
                  apiKey={TinyMCEapiKey}
                  init={{
                    plugins: TinyMCEplugins,
                    toolbar: TinyMCEToolbar,
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: TinyMCEmergetags_list,
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                    branding: false,
                    setup: (editor) => {
                      editor.on("mouseup", () => {
                        const selection = editor.selection.getContent();
                        if (selection.trim()) {
                          setSelectedText({
                            text: selection,
                            topicIndex,
                            subIndex,
                          });
                        }
                      });
                    },
                  }}
                  value={subtopic.subtopicContent || ""}
                  onEditorChange={(newValue) => {
                    handleSubtopicChange(
                      null,
                      newValue,
                      topicIndex,
                      subIndex,
                      "subtopicContent"
                    );
                  }}
                  style={{
                    border:
                      errors[`subtopic-${topicIndex}-${subIndex}-content`] ? "1px solid red" :
                        selectedText.topicIndex === topicIndex &&
                          selectedText.subIndex === subIndex
                          ? "2px dashed #2390ac"
                          : "none",
                    borderRadius: "4px",
                  }}
                  initialValue=""
                />
                {errors[`subtopic-${topicIndex}-${subIndex}-content`] && (
                  <div style={{ color: "red", fontSize: "0.85rem" }}>
                    {errors[`subtopic-${topicIndex}-${subIndex}-content`]}
                  </div>
                )}



                {/* TEXT SELECTION BUTTON*/}
                {selectedText.text &&
                  selectedText.topicIndex === topicIndex &&
                  selectedText.subIndex === subIndex && (
                    <div
                      style={{
                        marginTop: "-15px",
                        marginBottom: "20px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          const lastIdx =
                            topic.subtopics[subIndex].conceptClarifiers.length - 1;

                          handleConceptClarifierChange(
                            { target: { value: selectedText.text } },
                            selectedText.text,
                            topicIndex,
                            subIndex,
                            lastIdx,
                            "clarifierWordOrPhrase"
                          );

                          setSelectedText({
                            text: "",
                            topicIndex: null,
                            subIndex: null,
                          });
                        }}
                        style={{
                          backgroundColor: "#2390ac",
                          color: "white",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "8px 16px",
                        }}
                      >
                        <RiGeminiFill />
                        Mark as Concept Clarifier
                      </Button>
                    </div>
                  )}
              </FormGroup>
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >

              </FormGroup>

              {/* SUBTOPIC SUMMARY */}
              <FormGroup>
                <Label>Subtopic {subIndex + 1} Summary</Label>
                <Editor
                  apiKey={TinyMCEapiKey}
                  init={{
                    plugins: TinyMCEplugins,
                    toolbar: TinyMCEToolbar,
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: TinyMCEmergetags_list,
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                    branding: false,
                  }}
                  value={subtopic.subtopicSummary || ""}
                  onEditorChange={(newValue) => {
                    handleSubtopicChange(
                      null,
                      newValue,
                      topicIndex,
                      subIndex,
                      "subtopicSummary"
                    );
                  }}
                  style={{
                    border: errors[`subtopic-${topicIndex}-${subIndex}-summary`] ? "1px solid red" : "none",
                    borderRadius: "4px",
                  }}
                  initialValue=""
                />
                {errors[`subtopic-${topicIndex}-${subIndex}-summary`] && (
                  <div style={{ color: "red", fontSize: "0.85rem" }}>
                    {errors[`subtopic-${topicIndex}-${subIndex}-summary`]}
                  </div>
                )}
              </FormGroup>

              {/* QUICK REVISE POINTS */}
              <FormGroup>
                <Label>Quick Revise Points</Label>
                <Editor
                  apiKey={TinyMCEapiKey}
                  init={{
                    plugins: TinyMCEplugins,
                    toolbar: TinyMCEToolbar,
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: TinyMCEmergetags_list,
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                    branding: false,
                  }}
                  value={subtopic.quickRevisePoints || ""}
                  onEditorChange={(newValue) => {
                    handleSubtopicChange(
                      null,
                      newValue,
                      topicIndex,
                      subIndex,
                      "quickRevisePoints"
                    );
                  }}
                  // style={{
                  //   border: errors[`subtopic-${topicIndex}-${subIndex}-revise`] ? "1px solid red" : "none",
                  //   borderRadius: "4px",
                  // }}
                  initialValue=""
                />
                {errors[`subtopic-${topicIndex}-${subIndex}-revise`] && (
                  <div style={{ color: "red", fontSize: "0.85rem" }}>
                    {errors[`subtopic-${topicIndex}-${subIndex}-revise`]}
                  </div>
                )}
              </FormGroup>

              {/* CHEAT SHEET VIDEO */}
              {/* <FormGroup>
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
                      {subtopic.cheatSheet?.dataUrl && (
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          Uploaded File {subtopic.cheatSheet?.file.name}
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
              </FormGroup> */}

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
              null,
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
              null,
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
      {/* Show delete button if there's more than one clarifier OR if it's not the first one */}
      {(subtopic.conceptClarifiers.length > 1 || clarifierIndex > 0) && (
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
      onClick={() => handleAddConceptClarifier(topicIndex, subIndex)}
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
                fontWeight: "500",
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
      <PaginationContainer1>
        <Link
          to={`/admin/uploadmodule/`}
          state={{ data: location.state.data }}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <ActionButton>
            {" "}
            <FaArrowLeft size={16} /> Previous{" "}
          </ActionButton>
        </Link>
      </PaginationContainer1>

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

export default AddNewModule;
