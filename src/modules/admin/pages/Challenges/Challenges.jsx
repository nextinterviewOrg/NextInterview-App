import React, { useState } from "react";
import {
  Container,
  TableContainer,
  TableHeader,
  RowContainer,
  Type,
  Question,
  Answer,
  Action,
  IconButton,
  SearchBar,
  AddButton
} from "./Challenges.styles";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddChallenge from "../../components/Challenges/AddChallenges";

const dummyData = [
  {
    type: "SQL",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(2),
  },
  {
    type: "Python",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(2),
  },
  {
    type: "Python",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(2),
  },
];

const Challenges = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <AddButton onClick={handleOpenModal}>Add Challenge</AddButton>
      <SearchBar placeholder="Search for a Question" />
      <TableContainer>
        <TableHeader>
          <div>Type</div>
          <div>Question</div>
          <div>Answer</div>
          <div>Action</div>
        </TableHeader>
        {dummyData.map((item, index) => (
          <RowContainer key={index}>
            <Type>{item.type}</Type>
            <Question>{item.question}</Question>
            <Answer>{item.answer}</Answer>
            <Action>
              <IconButton>
                <FiEdit />
              </IconButton>
              <IconButton delete>
                <FiTrash2 />
              </IconButton>
            </Action>
          </RowContainer>
        ))}
      </TableContainer>

      {/* Render the modal if showModal is true */}
      {showModal && <AddChallenge onClose={handleCloseModal} />}
    </Container>
  );
};

export default Challenges;
