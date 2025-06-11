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

// export default QuestionBank;import React, { useState, useEffect } from 'react';

import React, { useState, useEffect } from 'react';
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

// API calls
import { getAllCategory } from '../../../../api/categoryApi';
import { getQuestionByCategoryIdandUserId, getAllQuestionsUsingUserId } from '../../../../api/questionBankApi';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';

const difficultyLevels = ['Easy', 'Medium', 'Hard']; // For filter UI only

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);
  const [moduleCodes, setModuleCodes] = useState([]);
  const [categories, setCategories] = useState([]); // Dynamic categories
  const [questions, setQuestions] = useState([]); // Current filtered questions
  const [allQuestions, setAllQuestions] = useState([]); // Store all questions for reuse
  const { user } = useUser();
  const [userId, setUserId] = useState(null);

  const emptyFilterState = {
    easy: false,
    medium: false,
    hard: false,
    topics: [],
    status: { solved: false, unsolved: false }
  };

  const [selectedFilters, setSelectedFilters] = useState(emptyFilterState);
  const [tempFilters, setTempFilters] = useState(emptyFilterState);

  // Load user ID on mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getUserByClerkId(user.id);
        setUserId(userData.data.user._id);
      } catch (err) {
        console.error("Failed to fetch user ID", err);
      }
    };
    if (user?.id) fetchUserId();
  }, [user]);

  // Load categories and all questions initially
  useEffect(() => {
    const loadInitialData = async () => {
      if (!userId) return;

      try {
        const categoryRes = await getAllCategory();
        if (categoryRes?.success) {
          const categoryList = categoryRes.data || [];
          setCategories(categoryList);

          const allQuestionsRes = await getAllQuestionsUsingUserId(userId);
          let allQuestions = [];

          if (allQuestionsRes?.success && Array.isArray(allQuestionsRes.data)) {
            allQuestions = allQuestionsRes.data;
          }

          // Extract unique topics
          const topicSet = new Set();
          allQuestions.forEach(q => {
            if (Array.isArray(q.topics)) {
              q.topics.forEach(t => topicSet.add(t.topic_name));
            }
          });
          setTopics(Array.from(topicSet));

          // Generate module codes
          const categoryMap = {};
          categoryList.forEach(cat => {
            if (!categoryMap[cat.category_name]) {
              categoryMap[cat.category_name] = `CAT${Object.keys(categoryMap).length + 1}`;
            }
          });
          const modCodes = Object.entries(categoryMap).map(([name, code]) => ({
            module_name: name,
            module_code: code,
          }));
          setModuleCodes(modCodes);

          // Map questions
          const mappedQuestions = allQuestions.map(q => ({
            id: q._id,
            category: q.programming_language || "Other",
            difficulty: q.level ? q.level.charAt(0).toUpperCase() + q.level.slice(1) : "Easy",
            text: q.question || "Untitled",
            type: q.isTIYQustion ? 'code' : 'text',
            completed: q.attempted || false,
            description: q.description || '',
            longDescription: q.description || '',
            topics: q.topics?.map(t => t.topic_name) || [],
            solution: q.output || ''
          }));

          setAllQuestions(mappedQuestions);
          setQuestions(mappedQuestions); // Initially show all
        }
      } catch (err) {
        console.error("Error loading initial data", err);
      }
    };

    loadInitialData();
  }, [userId]);

  // Load category-specific questions when activeTab changes
  useEffect(() => {
    const loadCategoryQuestions = async () => {
      if (activeTab === 'all') {
        // Reset to all questions
        setQuestions(allQuestions);
        return;
      }

      if (!userId) return;

      try {
        const res = await getQuestionByCategoryIdandUserId(activeTab, userId);
        if (res?.success && Array.isArray(res.data)) {
          const mappedQuestions = res.data.map(q => ({
            id: q._id,
            category: q.programming_language || "Other",
            difficulty: q.level ? q.level.charAt(0).toUpperCase() + q.level.slice(1) : "Easy",
            text: q.question || "Untitled",
            type: q.isTIYQustion ? 'code' : 'text',
            completed: q.attempted || false,
            description: q.description || '',
            longDescription: q.description || '',
            topics: q.topics?.map(t => t.topic_name) || [],
            solution: q.output || ''
          }));
          setQuestions(mappedQuestions);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Error fetching category questions", err);
        setQuestions([]);
      }
    };

    loadCategoryQuestions();
  }, [activeTab, userId, allQuestions]); // Now depends on allQuestions

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
      (!selectedFilters.easy && !selectedFilters.medium && !selectedFilters.hard) ||
      selectedFilters[q.difficulty.toLowerCase()];
    const matchesTopic =
      selectedFilters.topics.length === 0 || selectedFilters.topics.some(t => q.topics.includes(t));
    const matchesStatus =
      (!selectedFilters.status.solved && !selectedFilters.status.unsolved) ||
      (selectedFilters.status.solved && q.completed) ||
      (selectedFilters.status.unsolved && !q.completed);
    return matchesDifficulty && matchesTopic && matchesStatus;
  });

  return (
    <Container>
      <FilterBar>
        {/* Always show All */}
        <FilterButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All
        </FilterButton>

        {/* Dynamic Category Tabs */}
        {categories.map((cat) => (
          <FilterButton
            key={cat._id}
            active={activeTab === cat._id}
            onClick={() => setActiveTab(cat._id)}
          >
            {cat.category_name}
          </FilterButton>
        ))}

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

      {/* Render Questions Based on Active Tab */}
      {filteredQuestions.map((q, index) => (
        <Link
          key={index}
          to={`/user/mainQuestionBank/questionbank/${q.id}`}
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