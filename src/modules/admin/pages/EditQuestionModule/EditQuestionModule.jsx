import React, { useState } from 'react';
import {
  Container,
  TopBar,
  SearchInput,
  ModuleWrapper,
  DropdownIcon,
  CustomSelectWrapper,
  CustomSelectBox,
  CustomOptionsDropdown,
  CustomOption,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  Cell,
  ActionIcons,
  SearchWrapper,
  ConfirmationModal,
  ModalContent,
  CloseButton,
  ModalTitle,
  ModalButtons,
  TableWrapper
} from './EditQuestionModule.styles';

import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import EditQuestion from '../../components/Learningmodulescomponents/EditQuestion/EditQuestion';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const TABS = ['Skill Assessment', 'Try-it-Yourself', 'Question Bank'];

const mockQuestions = [
  {
    _id: "67bd913a6b57ee4256118031",
    module_code: "MCA0001",
    topic_code: "MCA0001A001",
    subtopic_code: "MCA0001A001A001",
    question_type: "mcq",
    level: "easy",
    question: "2+2=?",
    answer: "",
    option_a: "1",
    option_b: "2",
    option_c: "3",
    option_d: "4",
    correct_option: "option_d",
    isDeleted: false,
    __v: 0,
  },
  {
    _id: "67bd913a6b57ee4256118032",
    module_code: "MCA0001",
    topic_code: "MCA0001A002",
    subtopic_code: "MCA0001A002A001",
    question_type: "single line",
    level: "medium",
    question: "What is the capital of France?",
    answer: "Paris",
    isDeleted: false,
    __v: 0,
  },
  {
    _id: "67bd913a6b57ee4256118033",
    module_code: "MCA0002",
    topic_code: "MCA0002A001",
    subtopic_code: "MCA0002A001A001",
    question_type: "multi line",
    level: "hard",
    question: "Explain the significance of the Turing Machine in computation.",
    answer: "A Turing Machine is a theoretical model that defines an abstract machine capable of manipulating symbols on a strip of tape according to a set of rules. It is used to understand the limits of what can be computed.",
    isDeleted: false,
    __v: 0,
  },
];

const EditQuestionModule = () => {
  const [activeTab, setActiveTab] = useState('Skill Assessment');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState(mockQuestions);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('Modules');
  const moduleOptions = ['Modules', 'Sample Module 1', 'Module 2'];

  const handleEditClick = (q, idx) => {
    setCurrentQuestion({ ...q, index: idx });
    setIsModalOpen(true);
  };

  const handleSave = (updated) => {
    const newQuestions = [...questions];
    newQuestions[updated.index] = updated;
    setQuestions(newQuestions);
    setIsModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleDeleteClick = (q, idx) => {
    setCurrentQuestion({ ...q, index: idx });
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const newQuestions = questions.filter((_, idx) => idx !== currentQuestion.index);
    setQuestions(newQuestions);
    setIsConfirmationModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleDeleteCancel = () => {
    setIsConfirmationModalOpen(false);
    setCurrentQuestion(null);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAnswer = (q) => {
    if (q.question_type === 'mcq') {
      const options = [
        { label: 'A', value: q.option_a, key: 'option_a' },
        { label: 'B', value: q.option_b, key: 'option_b' },
        { label: 'C', value: q.option_c, key: 'option_c' },
        { label: 'D', value: q.option_d, key: 'option_d' },
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {options.map((opt, i) => (
            <div
              key={i}
              style={{
                fontWeight: q.correct_option === opt.key ? 'bold' : 'normal',
              }}
            >
              {opt.label}. {opt.value}
            </div>
          ))}
        </div>
      );
    }

    return q.answer;
  };

  return (
    <Container>
      <TopBar>
        <SearchWrapper>
          <FaSearch style={{ marginRight: '8px', color: '#888' }} />
          <SearchInput
            placeholder="Search for a Question"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <ModuleWrapper>
          <DropdownIcon>
            <MdOutlineKeyboardArrowDown className="ModuleIncon" />
          </DropdownIcon>
          <CustomSelectWrapper>
            <CustomSelectBox onClick={() => setIsDropdownOpen((prev) => !prev)}>
              {selectedModule}
              <MdOutlineKeyboardArrowDown />
            </CustomSelectBox>
            {isDropdownOpen && (
              <CustomOptionsDropdown>
                {moduleOptions.map((opt, index) => (
                  <CustomOption
                    key={index}
                    onClick={() => {
                      setSelectedModule(opt);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {opt}
                  </CustomOption>
                ))}
              </CustomOptionsDropdown>
            )}
          </CustomSelectWrapper>
        </ModuleWrapper>
      </TopBar>

      <Tabs>
        {TABS.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>

      <TableWrapper>
        <Table>
          <TableHeader>
            <Cell header>Type</Cell>
            <Cell header>Question</Cell>
            <Cell header>Answer</Cell>
            <Cell header>Action</Cell>
          </TableHeader>

          <TableBody>
            {filteredQuestions.map((q, idx) => (
              <TableRow key={idx}>
                <Cell>{q.question_type}</Cell>
                <Cell>{q.question}</Cell>
                <Cell>{renderAnswer(q)}</Cell>
                <Cell>
                  <ActionIcons>
                    {(q.question_type === 'single line' || q.question_type === 'multi line') && (
                      <FiEdit3
                        color="#888888"
                        style={{ cursor: 'pointer', fontSize: '20px' }}
                        onClick={() => handleEditClick(q, idx)}
                      />
                    )}
                    <RiDeleteBinLine
                      color="#dc3545"
                      style={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => handleDeleteClick(q, idx)}
                    />
                  </ActionIcons>
                </Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <EditQuestion
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentQuestion(null);
        }}
        questionData={currentQuestion}
        onSave={handleSave}
      />

      {isConfirmationModalOpen && (
        <ConfirmationModal onClick={handleDeleteCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleDeleteCancel}>×</CloseButton>
            <ModalTitle>Are you sure you want to delete this question?</ModalTitle>
            <ModalButtons>
              <button onClick={handleDeleteCancel}>Cancel</button>
              <button onClick={handleDeleteConfirm}>Delete</button>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default EditQuestionModule;
