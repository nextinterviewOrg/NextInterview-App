import React, { useState } from "react";
import Modal from "react-modal";
import {
  ApproachContainer,
  QuestionCard,
  QuestionTitle,
} from "./ApproachAnalysis.styles";

const ApproachAnalysis = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  const questions = [
    {
      id: 1,
      title: "Why is React popular?",
      fullText: "Explain the reasons why React is widely adopted for frontend development.",
    },
    {
      id: 2,
      title: "Difference between var, let, and const",
      fullText: "Discuss the differences between var, let, and const in JavaScript with examples.",
    },
    {
      id: 3,
      title: "What is Closure in JS?",
      fullText: "Describe closures in JavaScript and provide a practical use case.",
    },
  ];

  const openModal = (question) => {
    setSelectedQuestion(question);
    setUserAnswer("");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <ApproachContainer>
      {questions.map((q) => (
        <QuestionCard key={q.id} onClick={() => openModal(q)}>
          <QuestionTitle>{q.title}</QuestionTitle>
        </QuestionCard>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Question Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        {selectedQuestion && (
          <div>
            <h2>{selectedQuestion.title}</h2>
            <p>{selectedQuestion.fullText}</p>
            <textarea
              rows="6"
              placeholder="Type your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button onClick={closeModal} style={{ padding: "8px 16px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </ApproachContainer>
  );
};

export default ApproachAnalysis;
