import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";
import {
    Title,
    QuestionBox,
    Wrapper,
    BackIcon,
    Button,
    Header,
} from "./QBCodingPage.Styles";
import ReadyToCode from "../../components/Compiler/ReadyToCode";
import HintChallenges from "../../../admin/components/Challenges/HintChallenges/HintChallenges";
import {
    getTiyQbCodingQuestionById,
    getTIYQBQuestionwithResult,
} from "../../../../api/tiyQbCodingQuestionApi";
import { use } from "react";
import { notification } from "antd";
import { addQuestionToQuestionProgressTIYQB } from "../../../../api/tiyQbCodingQuestionProgressApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import Editor from '@monaco-editor/react';

const QBCodingPage = () => {
    const navigate = useNavigate();
    const [questionID, setQuestionID] = useState(null);
    const [selectedLang, setSelectedLang] = useState("");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [showOptimiseBtn, setShowOptimiseBtn] = useState(false)
    const [optimisedCode, setOptimisedCode] = useState(false)
    useEffect(() => {
        if (!location.state.questionID) return;
        setQuestionID(location.state.questionID);
    }, []);
    const { isSignedIn, user, isLoaded } = useUser();
    useEffect(() => {
        const apiCaller = async () => {
            try {
                setLoading(true);
                if (!user) return;
                const userData = await getUserByClerkId(user.id);
                setUserId(userData.data?.user?._id);

                const data = await getTIYQBQuestionwithResult(
                    questionID,
                    userData.data?.user?._id
                );
                console.log("data user Results", data);
                setQuestion(data.data.question);
                let codingData;
                if (data.data.userProgress) {
                    if (data.data.userProgress.finalResult) {
                        codingData = data.data.userProgress.answer;
                    } else {
                        codingData = data.data.question.base_code;
                    }
                } else {
                    codingData = data.data.question.base_code;
                }
                setCode(codingData);
                console.log("input", data.data.question.input);
                setInput(data.data.question.input);
                setSelectedLang(
                    data.data.question.programming_language === "Python"
                        ? "python"
                        : "mysql"
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        apiCaller();
    }, [questionID, user]);
    useEffect(() => {
        const apiCaller = async () => {
            console.log("output", output, "question?.output", question?.output, (output.trim() === question?.output.trim()));
            if ((output.trim() === question?.output.trim())) {
                setShowOptimiseBtn(true)
                const response = await fetch('https://f9ma89kmrg.execute-api.ap-south-1.amazonaws.com/default/mock-interview-api/optimize-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question?.QuestionText,
                        user_code: code,
                        sample_input: question?.input,
                        sample_output: question?.output
                    })
                })
                console.log("response", response);
                const data = await response.json();
                console.log("data", data);
                setOptimisedCode(data.optimized_code)
            } else {
                setShowOptimiseBtn(false)
            }


        }
        apiCaller();

    }, [output])

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            if (output === "") {
                notification.error({
                    message: "Please Run Your Code",
                    duration: 3,
                });
                setIsSubmitting(false);
                return;
            }
            const submissionData = {
                questionId: questionID,
                userId: userId,
                answer: code,
                finalResult: output.trim() === question.output.trim() ? true : false,
                output: output,
                skip: false,
            };
            const addProgress = await addQuestionToQuestionProgressTIYQB(
                submissionData
            );
            console.log("addProgress", addProgress);
            if (addProgress.success === true) {
                notification.success({ message: "Question submitted successfully" });
                navigate("/user/mainQuestionBank", { state: location.state });
            }
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const challenge = {
        QuestionText: "Write a function to calculate factorial of a number",
        description:
            "Create a function that returns the factorial of a given number.",
        input: "An integer n",
        output: "Factorial of the number",
        difficulty: "Easy",
        hints: [
            {
                hint_text: "Use recursion",
                explanation: "Factorial(n) = n * Factorial(n-1)",
            },
            { hint_text: "Base case", explanation: "Factorial(0) = 1" },
        ],
    };

    const handleOptimizeCode = () => {
        // Call the API to optimize the code
        console.log("Optimizing code...");
        setModalOpen(true);
    };

    return (
        <Wrapper>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Header>
                        <BackIcon
                            onClick={handleGoBack}
                            style={{
                                borderRadius: "10%",
                                border: "1px solid grey",
                                padding: "8px",
                            }}
                        >
                            <RxArrowLeft />
                        </BackIcon>
                        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                            {showOptimiseBtn &&
                                <Button onClick={handleOptimizeCode}>Optimise Code</Button>
                            }
                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </Header>

                    <Title>Programming Language - {question?.programming_language}</Title>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            alignItems: "flex-start",
                        }}
                    >
                        <QuestionBox>
                            <h3>{question?.QuestionText}</h3>
                            <p>
                                <strong>Description:</strong>
                                <br></br>
                                <div
                                    dangerouslySetInnerHTML={{ __html: question?.description }}
                                />
                            </p>
                            <p>
                                <strong>Input:</strong> {question?.input}
                            </p>
                            <p>
                                <strong>Output:</strong> {question?.output}
                            </p>
                            <p>
                                <strong>Difficulty:</strong> {question?.difficulty}
                            </p>
                        </QuestionBox>
                        <div style={{ width: "40%" }}>
                            <ReadyToCode
                                selectLang={selectedLang}
                                setSelectLang={setSelectedLang}
                                code={code}
                                setCode={setCode}
                                output={output}
                                setOutput={setOutput}
                                input={input}
                                setInput={setInput}
                                showCodeEditor={true}
                            />
                        </div>


                        <HintChallenges hints={question?.hints} />
                    </div>
                </>
            )}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="close-button"
                        >
                            x
                        </button>
                        <h3>Optimised Code</h3>
                        <Editor
                            height="300px"
                            language={selectedLang || 'plaintext'}
                            value={optimisedCode}
                            // onChange={(value) => setCode(value || '')}
                            theme="vs-light"
                        />
                        <div className="button-group">
                            <button
                                className="modal-cancel-button"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="modal-button"
                                onClick={() => {
                                    setCode(optimisedCode);
                                    setOutput(null);
                                    setModalOpen(false);
                                }}
                            >Apply Code</button>
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default QBCodingPage;
