import { useState, useEffect, useRef } from 'react';
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
  ApplyFilter,
  PaginationContainer,
  PageButton,
  PageInfo
} from './QuestionBank.styles';
import { Link } from 'react-router-dom';
import { HiOutlineCode } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { TfiFilter } from 'react-icons/tfi';
import { LuPencil } from 'react-icons/lu';
import { getModuleCode } from '../../../../api/addNewModuleApi';
import { getAllCategory } from '../../../../api/categoryApi';
import { getAllQuestionsUsingUserId } from '../../../../api/questionBankApi';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';
 
const difficultyLevels = ['Easy', 'Medium', 'Hard'];
const QUESTIONS_PER_PAGE = 10;
 
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dropdownRef = useRef(null);
 
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
        console.log(userData);
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
    if (!userId) {
      console.log('User ID not available yet');
      return;
    }

    try {
      console.log('Fetching categories...');
      const categoriesRes = await getAllCategory();
      console.log('Categories response:', categoriesRes);
      
      if (categoriesRes?.success) {
        setCategories(categoriesRes.data || []);
      } else {
        console.error('Categories API failed:', categoriesRes);
      }

      console.log('Fetching modules...');
      const modulesRes = await getModuleCode();
      console.log('Modules response:', modulesRes);
      
      if (modulesRes?.success) {
        setModules(modulesRes.data || []);
      } else {
        console.error('Modules API failed:', modulesRes);
      }

      console.log(`Fetching questions for user ${userId}...`);
      const questionsRes = await getAllQuestionsUsingUserId(userId);
      console.log('Questions response:', questionsRes);
      
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
        setTotalPages(Math.ceil(mappedQuestions.length / QUESTIONS_PER_PAGE));
      } else {
        console.error('Questions API failed:', questionsRes);
      }
    } catch (err) {
      console.error("Full error loading initial data:", {
        message: err.message,
        stack: err.stack,
        userId,
        timestamp: new Date().toISOString()
      });
    }
  };

  loadInitialData();
}, [userId]);
 
  // Filter questions when activeTab changes
  useEffect(() => {
    if (activeTab === 'all') {
      setQuestions(allQuestions);
      setTotalPages(Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE));
      setCurrentPage(1); // Reset to first page when changing tabs
    } else {
      // Check if activeTab is a category ID
      const isCategory = categories.some(cat => cat._id === activeTab);
      if (isCategory) {
        const filtered = allQuestions.filter(q => q.category === activeTab);
        setQuestions(filtered);
        setTotalPages(Math.ceil(filtered.length / QUESTIONS_PER_PAGE));
        setCurrentPage(1);
      } else {
        // Otherwise treat it as a module code
        const filtered = allQuestions.filter(q => q.module_code === activeTab);
        setQuestions(filtered);
        setTotalPages(Math.ceil(filtered.length / QUESTIONS_PER_PAGE));
        setCurrentPage(1);
      }
    }
  }, [activeTab, allQuestions, categories]);
 
  // Update total pages when filters change
  useEffect(() => {
    const filtered = questions.filter(q => {
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
   
    setTotalPages(Math.ceil(filtered.length / QUESTIONS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedFilters, questions]);
 
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
 
    // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
 
 const getFilteredQuestions = () => {
  return questions.filter(q => {
    const matchesSearch = 
      searchQuery === '' ||
      q.text.toLowerCase().includes(searchQuery) ||
      (q.description && q.description.toLowerCase().includes(searchQuery)) ||
      (q.topics && q.topics.some(topic => topic.toLowerCase().includes(searchQuery)));
    
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
    
    return matchesSearch && matchesDifficulty && matchesModule && matchesStatus;
  });
}; 
  const getPaginatedQuestions = () => {
    const filtered = getFilteredQuestions();
    const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };
 
  const getModuleName = (moduleCode) => {
    const module = modules.find(m => m.module_code === moduleCode);
    return module ? module.module_name : moduleCode;
  };
 
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c._id === categoryId);
    return category ? category.category_name : "Other";
  };
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
          <DropdownContainer ref={dropdownRef}>
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
 
      {getPaginatedQuestions().map((q, index) => (
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
 
      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
       
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
       
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};
 
export default QuestionBank;