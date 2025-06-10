// import React, { useState, useEffect } from "react";
// import { ThemeProvider } from "styled-components";
// import theme from "../../../../theme/Theme";
// import { Link } from "react-router-dom";
// import {
//   Container,
//   QuestionCard,
//   QuestionText,
//   MetaInfo,
//   Topic,
//   Difficulty,
//   Type,
//   Status,
//   MoreFilters,
//   DropdownContainer,
//   FilterSection,
//   ApplyButton,
//   ClearButton,
//   CheckboxLabel,
//   FilterHeader,
//   CloseFilterButton,
//   SubText,
//   SearchInput,
// } from "../QuestionBank/QuestionBank.styles";
// import { IoClose } from "react-icons/io5"; // Close icon
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { getMainQuestion, getAllQBQuestions, getMainQuestionByModule } from "../../../../api/userMainQuestionBankApi"; // Updated API imports
// import { getModuleCode } from "../../../../api/addNewModuleApi";
// import { ShimmerCategoryItem } from "react-shimmer-effects";

// const QuestionBank = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [filterSearchQuery, setFilterSearchQuery] = useState("");
//   const [selectedFilters, setSelectedFilters] = useState({
//     solved: false,
//     unsolved: false,
//     easy: false,
//     medium: false,
//     hard: false,
//     topic: null,
//   });

//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [moduleCodes, setModuleCodes] = useState([]);
//   const [difficultyLevels, setDifficultyLevels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllQBQuestions();
//         setFilteredQuestions(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     const fetchModuleCodes = async () => {
//       try {
//         const response = await getModuleCode();
//         setModuleCodes(response.data);
//       } catch (error) {
//         console.error("Error fetching modules:", error);
//       }
//     };

//     const fetchDifficultyLevels = async () => {
//       try {
//         const response = await getAllQBQuestions();
//         const levels = response.data.map((question) => question.level);
//         const uniqueLevels = [...new Set(levels)];
//         setDifficultyLevels(uniqueLevels);
//       } catch (error) {
//         console.error("Error fetching difficulty levels:", error);
//       }
//     };

//     fetchQuestions();
//     fetchModuleCodes();
//     fetchDifficultyLevels();
//   }, []);

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   const closeDropdown = () => setIsDropdownOpen(false);

//   const handleDifficultyChange = (level) => {
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       easy: false,
//       medium: false,
//       hard: false,
//       [level]: true,
//     }));
//   };

//   const handleTopicChange = (topicName) => {
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       topic: prevFilters.topic === topicName ? null : topicName,
//     }));
//   };

//   const applyFilters = async () => {
//     const filters = {
//       module_code: "",
//       level: [],
//       topic_code: "",
//       question_type: "",
//       subtopic_code: "",
//     };

//     if (selectedFilters.easy) filters.level.push("easy");
//     if (selectedFilters.medium) filters.level.push("medium");
//     if (selectedFilters.hard) filters.level.push("hard");

//     try {
//       let response;

//       if (selectedFilters.topic) {
//         const selectedModule = moduleCodes.find(
//           (module) => module.module_name === selectedFilters.topic
//         );

//         if (selectedModule) {
//           // Use getMainQuestionByModule when a specific module is selected
//           response = await getMainQuestionByModule(
//             selectedModule.module_code,
//             "questionBank"
//           );
//         }
//       } else if (filters.level.length > 0) {
//         // Use getMainQuestion when filtering by level only
//         response = await getMainQuestion(
//           "",
//           "",
//           "",
//           "",
//           filters.level.join(","),
//           "questionBank"
//         );
//       } else {
//         // Default case - get all QB questions
//         response = await getAllQBQuestions();
//       }

//       setFilteredQuestions(response.data || []);
//       setIsDropdownOpen(false);
//     } catch (error) {
//       console.error("Error applying filters:", error);
//       setFilteredQuestions([]);
//     }
//   };

//   const noQuestionsMessage = selectedFilters.topic
//     ? `No questions available for module "${selectedFilters.topic}".`
//     : "No questions found.";

//   const clearFilters = async () => {
//     setSelectedFilters({
//       solved: false,
//       unsolved: false,
//       easy: false,
//       medium: false,
//       hard: false,
//       topic: null,
//     });

//     try {
//       const response = await getAllQBQuestions();
//       setFilteredQuestions(response.data);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const getModuleName = (moduleCode) => {
//     const module = moduleCodes.find(
//       (module) => module.module_code === moduleCode
//     );
//     return module ? module.module_name : "Unknown Module";
//   };

//   const shimmerItems = new Array(10).fill(null);

//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//           <MoreFilters onClick={toggleDropdown}>
//             More filters <RiArrowDropDownLine style={{ fontSize: "25px" }} />
//           </MoreFilters>
//         </div>

//         {isDropdownOpen && (
//           <DropdownContainer>
//             <FilterHeader>
//               <SearchInput
//                 type="text"
//                 placeholder="Search filters..."
//                 value={filterSearchQuery}
//                 onChange={(e) =>
//                   setFilterSearchQuery(e.target.value.toLowerCase())
//                 }
//               />
//               <CloseFilterButton onClick={closeDropdown}>
//                 <IoClose size={22} />
//               </CloseFilterButton>
//             </FilterHeader>

//             <FilterSection>
//               <SubText>Difficulty Level</SubText>
//               {difficultyLevels.map((level) => (
//                 <CheckboxLabel key={level}>
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters[level.toLowerCase()]}
//                     onChange={() =>
//                       handleDifficultyChange(level.toLowerCase())
//                     }
//                   />{" "}
//                   {level}
//                 </CheckboxLabel>
//               ))}
//             </FilterSection>

//             <FilterSection>
//               <SubText>Topics</SubText>
//               {moduleCodes
//                 .filter((module) =>
//                   module.module_name
//                     .toLowerCase()
//                     .includes(filterSearchQuery)
//                 )
//                 .map((module) => (
//                   <CheckboxLabel key={module.module_code}>
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedFilters.topic === module.module_name
//                       }
//                       onChange={() => handleTopicChange(module.module_name)}
//                     />{" "}
//                     {module.module_name}
//                   </CheckboxLabel>
//                 ))}
//             </FilterSection>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "10px",
//               }}
//             >
//               <ClearButton onClick={clearFilters}>Clear all</ClearButton>
//               <ApplyButton onClick={applyFilters}>Apply filter</ApplyButton>
//             </div>
//           </DropdownContainer>
//         )}

//         {loading ? (
//           shimmerItems.map((_, index) => (
//             <ShimmerCategoryItem key={index} line={5} gap={10} />
//           ))
//         ) : (
//           <>
//             {filteredQuestions.length > 0 ? (
//               filteredQuestions.map((item, index) => (
//                 <Link
//                   to={`/user/mainQuestionBank/questionBank/${item._id}`}
//                   key={index}
//                   style={{ textDecoration: "none" }}
//                   state={{ filteredQuestions }}
//                 >
//                   <QuestionCard
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <div>
//                       <QuestionText>
//                         {index + 1}. {item.question}
//                       </QuestionText>
//                       <MetaInfo>
//                         <Topic>
//                           Module Name - {getModuleName(item.module_code)}
//                         </Topic>
//                         <Difficulty>Level - {item.level}</Difficulty>
//                         <Type>Type - {item.question_type}</Type>
//                       </MetaInfo>
//                     </div>
//                     <Status>{item.status}</Status>
//                   </QuestionCard>
//                 </Link>
//               ))
//             ) : (
//               <p>{noQuestionsMessage}</p>
//             )}
//           </>
//         )}
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default QuestionBank;



import React, { useState } from 'react';
import {
  Container,
  FilterBar,
  FilterButton,
  QuestionCard,
  Icon,
  Content,
  TagsRow,
  Tag,
  Title,
  DropdownContainer,
  FilterHeader,
  SearchInput,
  CloseFilterButton,
  FilterSection,
  SubText,
  CheckboxLabel,
  FilterIcon,
  ApplyFilter
} from './QuestionBank.styles';
import { Link } from 'react-router-dom';
import { HiOutlineCode } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { TfiFilter } from 'react-icons/tfi';
import { LuPencil } from 'react-icons/lu';

const questions = [
  {
    category: 'Machine learning',
    difficulty: 'Medium',
    text: 'Data analytics, in general, is a subjective concept?',
    type: 'code',
    completed: false,
    description: 'Short description about data analytics subjectivity...',
    longDescription: 'Longer explanation about subjectivity in data analytics...',
    topics: ['Data Analysis', 'Conceptual'],
    solution: 'There is no absolute measure; it depends on context.'
  },
  {
    category: 'Deep learning',
    difficulty: 'Hard',
    text: 'What is the difference between CNN and RNN?',
    type: 'text',
    completed: false,
    description: 'CNNs are mainly used for images, RNNs for sequences.',
    longDescription: 'CNNs (Convolutional Neural Networks) focus on spatial features while RNNs (Recurrent Neural Networks) handle temporal data...',
    topics: ['Neural Networks', 'Deep Learning'],
    solution: 'CNNs use convolution layers; RNNs use recurrence.'
  },
  {
    category: 'Python',
    difficulty: 'Easy',
    text: 'Explain list comprehensions in Python.',
    type: 'code',
    completed: false,
    description: 'List comprehensions provide a concise way to create lists.',
    longDescription: 'They consist of brackets containing an expression followed by a for clause, then zero or more for or if clauses...',
    topics: ['Python', 'Programming'],
    solution: '[x * 2 for x in range(5)] creates a list [0,2,4,6,8]'
  },
  {
    category: 'Python',
    difficulty: 'Easy',
    text: 'What is the use of `zip()` in Python?',
    type: 'text',
    completed: true,
    description: '`zip()` combines multiple iterables element-wise.',
    longDescription: 'This function returns an iterator of tuples, where the i-th tuple contains the i-th element from each iterable.',
    topics: ['Python', 'Programming'],
    solution: '`zip([1,2],[3,4])` results in [(1,3),(2,4)]'
  },
  {
    category: 'Deep learning',
    difficulty: 'Hard',
    text: 'Explain the vanishing gradient problem.',
    type: 'code',
    completed: true,
    description: 'Vanishing gradients occur when gradients become too small during backpropagation.',
    longDescription: 'This leads to very slow learning or failure to learn in deep networks, especially RNNs.',
    topics: ['Deep Learning', 'Training Issues'],
    solution: 'It causes early layers to learn very slowly or not at all.'
  }
];

const difficultyLevels = ['Easy', 'Medium', 'Hard'];
const moduleCodes = [
  { module_name: 'Machine learning', module_code: 'ML' },
  { module_name: 'Deep learning', module_code: 'DL' },
  { module_name: 'SQL', module_code: 'SQL' },
  { module_name: 'Python', module_code: 'PY' },
];

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState('');

  const emptyFilterState = {
    easy: false,
    medium: false,
    hard: false,
    topics: [],
    status: { solved: false, unsolved: false }
  };

  const [selectedFilters, setSelectedFilters] = useState(emptyFilterState);
  const [tempFilters, setTempFilters] = useState(emptyFilterState);

  const toggleDropdown = () => {
    setTempFilters(selectedFilters);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const toggleTopic = (topic) => {
    setTempFilters((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const toggleStatus = (statusType) => {
    setTempFilters((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [statusType]: !prev.status[statusType]
      }
    }));
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty =
      !selectedFilters.easy && !selectedFilters.medium && !selectedFilters.hard ||
      selectedFilters[q.difficulty.toLowerCase()];

    const matchesTopic =
      selectedFilters.topics.length === 0 || selectedFilters.topics.includes(q.category);

    const matchesStatus =
      (!selectedFilters.status.solved && !selectedFilters.status.unsolved) ||
      (selectedFilters.status.solved && q.completed) ||
      (selectedFilters.status.unsolved && !q.completed);

    return matchesDifficulty && matchesTopic && matchesStatus;
  });

  return (
    <Container>
      <FilterBar>
        <FilterButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All
        </FilterButton>
        <FilterButton active={activeTab === 'top50'} onClick={() => setActiveTab('top50')}>
          Top 50 coding questions
        </FilterButton>
        <FilterButton active={activeTab === 'ml75'} onClick={() => setActiveTab('ml75')}>
          Machine Learning 75
        </FilterButton>

        <div style={{ marginLeft: 'auto' }}>
          <FilterIcon onClick={toggleDropdown}>
            <TfiFilter />
          </FilterIcon>
        </div>

        {isDropdownOpen && (
          <DropdownContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px' }}>
              <ApplyFilter
                variant="clear"
                onClick={() => {
                  setTempFilters(emptyFilterState);
                  setSelectedFilters(emptyFilterState);
                  closeDropdown();
                }}
              >
                Clear all
              </ApplyFilter>

              <ApplyFilter
                onClick={() => {
                  setSelectedFilters(tempFilters);
                  closeDropdown();
                }}
              >
                Apply filter
              </ApplyFilter>
            </div>

            <FilterHeader>
              <SearchInput
                type="text"
                placeholder="Search filters..."
                value={filterSearchQuery}
                onChange={(e) => setFilterSearchQuery(e.target.value.toLowerCase())}
              />
              <CloseFilterButton onClick={closeDropdown}>
                <IoClose size={22} />
              </CloseFilterButton>
            </FilterHeader>

            <FilterSection>
              <SubText>Difficulty Level</SubText>
              {difficultyLevels.map((level) => (
                <CheckboxLabel key={level}>
                  <input
                    type="checkbox"
                    checked={tempFilters[level.toLowerCase()]}
                    onChange={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        [level.toLowerCase()]: !prev[level.toLowerCase()]
                      }))
                    }
                  />{' '}
                  {level}
                </CheckboxLabel>
              ))}
            </FilterSection>

            <FilterSection>
              <SubText>Topics</SubText>
              {moduleCodes
                .filter((module) =>
                  module.module_name.toLowerCase().includes(filterSearchQuery)
                )
                .map((module) => (
                  <CheckboxLabel key={module.module_code}>
                    <input
                      type="checkbox"
                      checked={tempFilters.topics.includes(module.module_name)}
                      onChange={() => toggleTopic(module.module_name)}
                    />{' '}
                    {module.module_name}
                  </CheckboxLabel>
                ))}
            </FilterSection>

            <FilterSection>
              <SubText>Status</SubText>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={tempFilters.status.solved}
                  onChange={() => toggleStatus('solved')}
                />{' '}
                Solved
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={tempFilters.status.unsolved}
                  onChange={() => toggleStatus('unsolved')}
                />{' '}
                Unsolved
              </CheckboxLabel>
            </FilterSection>
          </DropdownContainer>
        )}
      </FilterBar>

      {['all', 'top50', 'ml75'].includes(activeTab) &&
        filteredQuestions.map((q, index) => (
          <Link
            key={index}
            to={`/user/mainQuestionBank/questionBank/${index}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <QuestionCard>
              <Icon>
                {q.completed ? <FaCheck color="green" /> : q.type === 'code' ? <HiOutlineCode color="purple" /> : <LuPencil color="darkblue" />}
              </Icon>
              <Content>
                <TagsRow>
                  <Tag>{q.category}</Tag>
                  <Tag difficulty={q.difficulty}>{q.difficulty}</Tag>
                </TagsRow>
                <Title>{q.text}</Title>
              </Content>
            </QuestionCard>
          </Link>
        ))}
    </Container>
  );
};

export default QuestionBank;
