import React, { useState, useEffect } from "react";
import { Select } from "antd";
import {
  ModalOverlay,
  FormContainer,
  FormTitleQuestion,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
  SaveButton,
  CloseButton,
  HintButton,
  HintContainer,
  HintList,
  HintItem,
  RemoveHintButton,
  RunCodeButton
} from "./EditChallenge.style";
import { FiX } from "react-icons/fi";
import Editor from "@monaco-editor/react";
import { editChallenge } from "../../../../../api/challengesApi";

const { Option } = Select;

const languageOptions = {
  python: {
    filename: "index.py",
    defaultCode: `# Write your code here\n# Use input() to read input if needed\nprint("Hello World")`
  },
  mysql: {
    filename: "main.sql",
    defaultCode: `-- Write your SQL query here\nSELECT 'Hello World';`
  }
};

const typeMapping = {
  coding: "Coding",
  mcq: "MCQ",
  "single-line": "Single-line",
  "multi-line": "Multi-line",
  approach: "Approach Analysis",
  "case-study": "Case Study"
};

const reverseTypeMapping = {
  "Coding": "coding",
  "MCQ": "mcq",
  "Single-line": "single-line",
  "Multi-line": "multi-line",
  "Approach Analysis": "approach",
  "Case Study": "case-study"
};

const INITIAL_FORM = {
  programming_language: "",
  QuestionText: "",
  description: "",
  input: "",
  output: "",
  difficulty: "Easy",
  hints: [],
  options: ["", "", "", ""],
  correctAnswer: "",
  answer: ""
};

const EditChallenge = ({ challenge, onClose, onChallengeUpdated }) => {
  const [questionType, setQuestionType] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [currentHint, setCurrentHint] = useState({ hint_text: "", explanation: "" });
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (challenge) {
      const questionTypeUI = typeMapping[challenge.question_type] || "";
      setQuestionType(questionTypeUI);
      
      const baseData = {
        QuestionText: challenge.QuestionText || "",
        difficulty: challenge.difficulty || "Easy",
        hints: challenge.hints || []
      };

      let specificData = {};
      switch (challenge.question_type) {
        case "coding":
          specificData = {
            programming_language: challenge.programming_language || "",
            description: challenge.description || "",
            input: challenge.input || "",
            output: challenge.output || "",
          };
          setCode(challenge.code || "");
          break;
        case "mcq":
          specificData = {
            options: [
              challenge.option_a || "",
              challenge.option_b || "",
              challenge.option_c || "",
              challenge.option_d || ""
            ],
            correctAnswer: challenge.correct_option?.replace("option_", "") || ""
          };
          break;
        case "single-line":
        case "multi-line":
          specificData = {
            answer: challenge.answer || ""
          };
          break;
        default:
          break;
      }

      setFormData({
        ...baseData,
        ...specificData
      });
    }
  }, [challenge]);

  const handleTypeChange = (value) => {
    setQuestionType(value);
    setFormData(INITIAL_FORM);
    setCode("");
    setError(null);
    setSuccess(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleHintChange = (e) => {
    const { name, value } = e.target;
    setCurrentHint((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addHint = () => {
    if (!currentHint.hint_text.trim()) {
      setError("Hint text is required");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      hints: [...prev.hints, currentHint]
    }));
    setCurrentHint({ hint_text: "", explanation: "" });
    setError(null);
  };

  const removeHint = (index) => {
    setFormData((prev) => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index)
    }));
  };

  const runCode = async () => {
    if (!formData.programming_language || !code) {
      setError("Please select a language and write some code.");
      return;
    }

    setIsRunning(true);
    setError(null);

    const language = formData.programming_language.toLowerCase();
    const payload = {
      language,
      files: [
        {
          name: languageOptions[language].filename,
          content: code
        }
      ],
      stdin: formData.input
    };

    try {
      const res = await fetch("https://onecompiler-apis.p.rapidapi.com/api/v1/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": "e3d1d11c7dmshca53081ed1ccf3fp1b61cdjsn79cc71e1336c",
          "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com"
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result.status === "success") {
        const output = result.stdout || result.stderr || "No output";
        setFormData((prev) => ({
          ...prev,
          output: output.trim()
        }));
      } else {
        setError("Execution error: " + (result.exception || "Unknown error"));
      }
    } catch (err) {
      setError("Request failed: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let requiredFields = ["QuestionText"];

    switch (questionType) {
      case "Coding":
        requiredFields.push("programming_language", "description", "output");
        break;
      case "MCQ":
        requiredFields.push(...formData.options.map((_, i) => `option${i}`), "correctAnswer");
        break;
      case "Single-line":
      case "Multi-line":
        requiredFields.push("answer");
        break;
      default:
        break;
    }

    const missingFields = [];
    for (let field of requiredFields) {
      if (field.startsWith("option")) {
        const index = parseInt(field.replace("option", ""), 10);
        if (!formData.options[index] || !formData.options[index].trim()) {
          missingFields.push(`Option ${index + 1}`);
        }
      } else if (!formData[field] || !formData[field].toString().trim()) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    const payload = {
      QuestionText: formData.QuestionText.trim(),
      question_type: reverseTypeMapping[questionType],
      hints: questionType === "Coding" ? formData.hints : [] // Only include hints for coding questions
    };

    switch (questionType) {
      case "Coding":
        Object.assign(payload, {
          programming_language: formData.programming_language,
          description: formData.description,
          input: formData.input,
          output: formData.output,
          difficulty: formData.difficulty,
          code: code
        });
        break;
      case "MCQ":
        Object.assign(payload, {
          difficulty: formData.difficulty,
          option_a: formData.options[0],
          option_b: formData.options[1],
          option_c: formData.options[2],
          option_d: formData.options[3],
          correct_option: `option_${formData.correctAnswer}`
        });
        break;
      case "Single-line":
      case "Multi-line":
        payload.answer = formData.answer;
        break;
      default:
        break;
    }

    setIsSubmitting(true);

    try {
      const response = await editChallenge(challenge._id, payload);

      if (response.success) {
        setSuccess("Challenge updated successfully!");
        onChallengeUpdated(response.data);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to update challenge");
      }
    } catch (err) {
      setError(err.message || "Failed to update challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <FormContainer>
        <CloseButton onClick={onClose} type="button">
          <FiX size={20} />
        </CloseButton>

        <FormTitleQuestion>Edit Challenge</FormTitleQuestion>

        {error && <div style={{ color: "red", marginBottom: 15 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 15 }}>{success}</div>}

        <FormGroup>
          <FormLabel>Question Type</FormLabel>
          <Select
            value={questionType}
            onChange={handleTypeChange}
            style={{ width: "100%" }}
            disabled
          >
            <Option value="">{typeMapping[challenge?.question_type] || "Unknown"}</Option>
          </Select>
        </FormGroup>

        {questionType === "Coding" && (
          <>
            <FormGroup>
              <FormLabel>Programming Language *</FormLabel>
              <FormSelect
                name="programming_language"
                value={formData.programming_language}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                <option value="Python">Python</option>
                <option value="MySQL">MySQL</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Question *</FormLabel>
              <FormTextArea
                name="QuestionText"
                value={formData.QuestionText}
                onChange={handleChange}
                placeholder="Enter the question text"
                rows={4}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Description *</FormLabel>
              <FormTextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter detailed description"
                rows={6}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Difficulty</FormLabel>
              <FormSelect name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Code Editor</FormLabel>
              <div style={{ border: "1px solid #ccc", borderRadius: 4, marginBottom: 10 }}>
                <Editor
                  height="200px"
                  language={formData.programming_language.toLowerCase()}
                  value={code}
                  onChange={setCode}
                  theme="vs-light"
                  options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel>Sample Input</FormLabel>
              <FormTextArea
                name="input"
                value={formData.input}
                onChange={handleChange}
                placeholder="Enter sample input"
                rows={3}
              />
            </FormGroup>

            <RunCodeButton type="button" onClick={runCode} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Code"}
            </RunCodeButton>

            <FormGroup>
              <FormLabel>Expected Output *</FormLabel>
              <FormTextArea
                name="output"
                value={formData.output}
                onChange={handleChange}
                placeholder="Output will appear here after running the code"
                rows={3}
              />
            </FormGroup>

            {/* Hints section - only for coding questions */}
            <FormGroup>
              <FormLabel>Hints</FormLabel>
              <HintContainer>
                <FormInput
                  name="hint_text"
                  value={currentHint.hint_text}
                  onChange={handleHintChange}
                  placeholder="Hint text"
                />
                <FormTextArea
                  name="explanation"
                  value={currentHint.explanation}
                  onChange={handleHintChange}
                  placeholder="Hint explanation (optional)"
                  rows={2}
                />
                <HintButton type="button" onClick={addHint}>
                  Add Hint
                </HintButton>
              </HintContainer>

              {formData.hints.length > 0 && (
                <HintList>
                  <strong>Added Hints:</strong>
                  {formData.hints.map((hint, index) => (
                    <HintItem key={index}>
                      <div>
                        <strong>Hint {index + 1}:</strong> {hint.hint_text}
                        {hint.explanation && (
                          <div>
                            <em>Explanation:</em> {hint.explanation}
                          </div>
                        )}
                      </div>
                      <RemoveHintButton type="button" onClick={() => removeHint(index)}>
                        Remove
                      </RemoveHintButton>
                    </HintItem>
                  ))}
                </HintList>
              )}
            </FormGroup>
          </>
        )}

        {questionType === "MCQ" && (
          <>
            <FormGroup>
              <FormLabel>Question *</FormLabel>
              <FormTextArea
                name="QuestionText"
                value={formData.QuestionText}
                onChange={handleChange}
                placeholder="Enter the question text"
                rows={4}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Option A *</FormLabel>
              <FormInput
                value={formData.options[0]}
                onChange={(e) => handleOptionChange(0, e.target.value)}
                placeholder="Enter option A"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Option B *</FormLabel>
              <FormInput
                value={formData.options[1]}
                onChange={(e) => handleOptionChange(1, e.target.value)}
                placeholder="Enter option B"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Option C *</FormLabel>
              <FormInput
                value={formData.options[2]}
                onChange={(e) => handleOptionChange(2, e.target.value)}
                placeholder="Enter option C"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Option D *</FormLabel>
              <FormInput
                value={formData.options[3]}
                onChange={(e) => handleOptionChange(3, e.target.value)}
                placeholder="Enter option D"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Correct Answer *</FormLabel>
              <Select
                value={formData.correctAnswer}
                onChange={(value) => setFormData(prev => ({ ...prev, correctAnswer: value }))}
                style={{ width: "100%" }}
                placeholder="Select correct answer"
              >
                <Option value="a">Option A</Option>
                <Option value="b">Option B</Option>
                <Option value="c">Option C</Option>
                <Option value="d">Option D</Option>
              </Select>
            </FormGroup>
          </>
        )}

        {questionType === "Single-line" && (
          <>
            <FormGroup>
              <FormLabel>Question *</FormLabel>
              <FormTextArea
                name="QuestionText"
                value={formData.QuestionText}
                onChange={handleInputChange}
                placeholder="Enter the question"
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Answer *</FormLabel>
              <FormInput
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Enter the correct answer"
              />
            </FormGroup>
          </>
        )}

        {questionType === "Multi-line" && (
          <>
            <FormGroup>
              <FormLabel>Question *</FormLabel>
              <FormTextArea
                name="QuestionText"
                value={formData.QuestionText}
                onChange={handleInputChange}
                placeholder="Enter the question"
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Answer *</FormLabel>
              <FormTextArea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Enter the correct answer"
                rows={6}
              />
            </FormGroup>
          </>
        )}

        {(questionType === "Approach Analysis" || questionType === "Case Study") && (
          <FormGroup>
            <FormLabel>Question *</FormLabel>
            <FormTextArea
              name="QuestionText"
              value={formData.QuestionText}
              onChange={handleInputChange}
              placeholder="Enter the question"
              rows={questionType === "Case Study" ? 8 : 6}
            />
          </FormGroup>
        )}

        <SaveButton type="submit" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </SaveButton>
      </FormContainer>
    </ModalOverlay>
  );
};

export default EditChallenge;