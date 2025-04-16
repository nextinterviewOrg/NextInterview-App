import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FAQContainer,
  Question,
  Answer,
  AddQuestionButton,
  ActionButton,
  ActionButtons,
} from "../../pages/FAQ/Faq.styles";
import DeleteModule from "../../components/DeleteModule/DeleteModule";
import EditModal from "../../components/FAQComponent/FAQEdit/FaqEdit";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import AddFaqModal from "../../components/FAQComponent/FAQAdd/FaqAdd";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { ShimmerText } from "react-shimmer-effects";
import {
  getFaq,
  createFaq,
  deleteFaq,
  updateFaq,
} from "../../../../api/faqApi";
import theme from "../../../../theme/Theme";
import { message } from "antd";

const NoFAQsMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: ${theme.colors.graytext};
  font-size: 16px;
`;

const FAQ = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const faqs = await getFaq();
        setFaqs(faqs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faqs:", error);
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [reload]);

  const toggleAnswerVisibility = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isVisible: !faq.isVisible } : faq
      )
    );
  };

  const handleEditSave = async (question, answer) => {
    try {
      await updateFaq(faqs[currentEditIndex]._id, {
        question,
        answer,
      });
      message.success("FAQ updated successfully!");
      setReload((prev) => !prev);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      message.error("Failed to update FAQ. Please try again.");
    }
  };

  const openEditModal = (index) => {
    setCurrentEditIndex(index);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFaq(faqs[currentDeleteIndex]._id);
      message.success("FAQ deleted successfully!");
      setReload((prev) => !prev);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      message.error("Failed to delete FAQ. Please try again.");
    }
  };

  const openDeleteModal = (index) => {
    setCurrentDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const addQuestion = async (newFaq) => {
    try {
      await createFaq(newFaq);
      message.success("FAQ added successfully!");
      setReload((prev) => !prev);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding FAQ:", error);
      message.error("Failed to add FAQ. Please try again.");
    }
  };

  return (
    <>
      <FAQContainer>
        {loading ? (
          // Show loading shimmer for all FAQs
          Array(3).fill().map((_, index) => (
            <div key={index}>
              <ShimmerText width="100%" height="20px" />
            </div>
          ))
        ) : faqs.length === 0 ? (
          // Show message when no FAQs are available
          <NoFAQsMessage>No FAQs available</NoFAQsMessage>
        ) : (
          // Show FAQs list
          faqs.map((faq, index) => (
            <div key={index}>
              <Question onClick={() => toggleAnswerVisibility(index)}>
                {faq.question}
                <span style={{ color: `${theme.colors.bluetext}` }}>
                  {faq.isVisible ? <CiCircleMinus /> : <IoAddCircleOutline />}
                </span>
              </Question>
              <Answer isVisible={faq.isVisible}>
                {faq.answer}
                {faq.isVisible && (
                  <ActionButtons>
                    <ActionButton
                      type="edit"
                      onClick={() => openEditModal(index)}
                    >
                      <CiEdit />
                    </ActionButton>
                    <ActionButton
                      type="delete"
                      onClick={() => openDeleteModal(index)}
                    >
                      <MdDelete />
                    </ActionButton>
                  </ActionButtons>
                )}
              </Answer>
            </div>
          ))
        )}

        <AddQuestionButton onClick={() => setIsAddModalOpen(true)}>
          + Add Question
        </AddQuestionButton>
      </FAQContainer>

      {isEditModalOpen && (
        <EditModal
          faq={faqs[currentEditIndex]}
          onSave={handleEditSave}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModule
          onDelete={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isAddModalOpen && (
        <AddFaqModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={addQuestion}
        />
      )}
    </>
  );
};

export default FAQ;