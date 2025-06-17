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
import { getModuleCode } from '../../../../api/addNewModuleApi';
import { getAllCategory } from '../../../../api/categoryApi';
import { getAllQuestionsUsingUserId, getQuestionByCategoryIdandUserId } from '../../../../api/questionBankApi';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';

const difficultyLevels = ['Easy', 'Medium', 'Hard'];

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const { user } = useUser();
  const [userId, setUserId] = useState(null);

  const emptyFilterState = {
    easy: false,
    medium: false,
    hard: false,
    modules: [],
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

  // Load initial data (categories, modules and questions)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!userId) return;

      try {
        // Fetch categories first
        const categoriesRes = await getAllCategory();
        if (categoriesRes?.success) {
          setCategories(categoriesRes.data || []);
        }

        // Then fetch modules
        const modulesRes = await getModuleCode();
        if (modulesRes?.success) {
          setModules(modulesRes.data || []);
        }

        // Then fetch all questions
        const questionsRes = await getAllQuestionsUsingUserId(userId);
        if (questionsRes?.success && Array.isArray(questionsRes.data)) {
          const mappedQuestions = questionsRes.data.map(q => ({
            id: q._id,
            module_code: q.module_code || "Other",
            module_name: modulesRes?.data?.find(m => m.module_code === q.module_code)?.module_name || q.module_code || "Other",
            category: q.questionbankCategoryRef?.[0] || null,
            difficulty: q.level ? q.level.charAt(0).toUpperCase() + q.level.slice(1) : "Easy",
            text: q.question || "Untitled",
            type: q.question_type || "text",
            completed: q.attempted || false,
            description: q.description || '',
            topics: q.topics?.map(t => t.topic_name) || [],
            solution: q.output || ''
          }));
          
          setAllQuestions(mappedQuestions);
          setQuestions(mappedQuestions);
        }
      } catch (err) {
        console.error("Error loading initial data", err);
      }
    };

    loadInitialData();
  }, [userId]);

  // Filter questions when activeTab changes
  useEffect(() => {
    if (activeTab === 'all') {
      setQuestions(allQuestions);
    } else {
      // Check if activeTab is a category ID
      const isCategory = categories.some(cat => cat._id === activeTab);
      if (isCategory) {
        const filtered = allQuestions.filter(q => q.category === activeTab);
        setQuestions(filtered);
      } else {
        // Otherwise treat it as a module code
        const filtered = allQuestions.filter(q => q.module_code === activeTab);
        setQuestions(filtered);
      }
    }
  }, [activeTab, allQuestions, categories]);

  const toggleDropdown = () => {
    setTempFilters(selectedFilters);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const toggleModule = (moduleCode) => {
    setTempFilters(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleCode)
        ? prev.modules.filter(m => m !== moduleCode)
        : [...prev.modules, moduleCode]
    }));
  };

  const toggleStatus = (statusType) => {
    setTempFilters(prev => ({
      ...prev,
      status: {
        ...prev.status,
        [statusType]: !prev.status[statusType]
      }
    }));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesDifficulty =
      (!selectedFilters.easy && !selectedFilters.medium && !selectedFilters.hard) ||
      selectedFilters[q.difficulty.toLowerCase()];
    
    const matchesModule =
      selectedFilters.modules.length === 0 || 
      selectedFilters.modules.includes(q.module_code);
    
    const matchesStatus =
      (!selectedFilters.status.solved && !selectedFilters.status.unsolved) ||
      (selectedFilters.status.solved && q.completed) ||
      (selectedFilters.status.unsolved && !q.completed);
    
    return matchesDifficulty && matchesModule && matchesStatus;
  });

  const getModuleName = (moduleCode) => {
    const module = modules.find(m => m.module_code === moduleCode);
    return module ? module.module_name : moduleCode;
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c._id === categoryId);
    return category ? category.category_name : "Other";
  };

  return (
    <Container>
      <FilterBar>
        <FilterButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All
        </FilterButton>

        {/* Show categories in the filter bar */}
        {categories.map(category => (
          <FilterButton
            key={category._id}
            active={activeTab === category._id}
            onClick={() => setActiveTab(category._id)}
          >
            {category.category_name}
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
                placeholder="Search modules..."
                value={filterSearchQuery}
                onChange={(e) => setFilterSearchQuery(e.target.value.toLowerCase())}
              />
              <CloseFilterButton onClick={closeDropdown}>
                <IoClose size={22} />
              </CloseFilterButton>
            </FilterHeader>

            <FilterSection>
              <SubText>Difficulty Level</SubText>
              {difficultyLevels.map(level => (
                <CheckboxLabel key={level}>
                  <input
                    type="checkbox"
                    checked={tempFilters[level.toLowerCase()]}
                    onChange={() =>
                      setTempFilters(prev => ({
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
              <SubText>Modules</SubText>
              {modules
                .filter(module =>
                  module.module_name.toLowerCase().includes(filterSearchQuery) ||
                  module.module_code.toLowerCase().includes(filterSearchQuery)
                )
                .map(module => (
                  <CheckboxLabel key={module.module_code}>
                    <input
                      type="checkbox"
                      checked={tempFilters.modules.includes(module.module_code)}
                      onChange={() => toggleModule(module.module_code)}
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

      {filteredQuestions.map((q, index) => (
        <Link
          key={index}
          to={`/user/mainQuestionBank/questionbank/${q.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <QuestionCard>
            <Icon>
              {q.completed ? <FaCheck color="green" /> : q.type === 'coding' ? 
                <HiOutlineCode color="purple" /> : <LuPencil color="darkblue" />}
            </Icon>
            <Content>
              <TagsRow>
                <Tag>{q.category ? getCategoryName(q.category) : getModuleName(q.module_code)}</Tag>
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