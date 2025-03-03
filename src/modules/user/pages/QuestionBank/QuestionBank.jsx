import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../../../theme/Theme";
import { Link } from "react-router-dom";
import {
  Container,
  QuestionCard,
  QuestionText,
  MetaInfo,
  Topic,
  Difficulty,
  Type,
  Status,
  MoreFilters,
  DropdownContainer,
  FilterSection,
  ApplyButton,
  ClearButton,
  CheckboxLabel,
  FilterHeader,
  CloseFilterButton,
  SubText,
  SearchInput,
} from "../QuestionBank/QuestionBank.styles";
import { IoClose } from "react-icons/io5"; // Close icon
import { RiArrowDropDownLine } from "react-icons/ri";
import { getQuestionBank } from "../../../../api/questionBankApi"; // Adjust the API path
import { getModuleCode } from "../../../../api/addNewModuleApi"; // Adjust the API path

const QuestionBank = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    solved: false,
    unsolved: false,
    easy: false,
    medium: false,
    hard: false,
    topic: null, // Updated to hold only one topic at a time
  });

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [moduleCodes, setModuleCodes] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionBank();
        console.log("Question data:", response.data);
        setFilteredQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchModuleCodes = async () => {
      try {
        const response = await getModuleCode();
        setModuleCodes(response.data);
        console.log("Fetching Modules:", response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchDifficultyLevels = async () => {
      try {
        const response = await getQuestionBank();
        console.log("Question data:", response.data);
        const levels = response.data.map((question) => question.level);
        const uniqueLevels = [...new Set(levels)];
        setDifficultyLevels(uniqueLevels);
      } catch (error) {
        console.error("Error fetching difficulty levels:", error);
      }
    };

    fetchQuestions();
    fetchModuleCodes();
    fetchDifficultyLevels();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleDifficultyChange = (level) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      easy: false,
      medium: false,
      hard: false,
      [level]: true,
    }));
  };

  const handleTopicChange = (topicName) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      topic: prevFilters.topic === topicName ? null : topicName, // Toggle selection
    }));
  };

  const applyFilters = async () => {
    const filters = {
      module_code: "",
      level: [],
      topic_code: "",
      question_type: "",
      subtopic_code: "",
    };

    console.log("selectedFilters:", selectedFilters);

    if (selectedFilters.easy) filters.level.push("easy");
    if (selectedFilters.medium) filters.level.push("medium");
    if (selectedFilters.hard) filters.level.push("hard");

    if (selectedFilters.topic) {
      const selectedModule = moduleCodes.find(
        (module) => module.module_name === selectedFilters.topic
      );
      if (selectedModule) {
        filters.module_code = selectedModule.module_code;
      }
    }

    if (selectedFilters.topic_code) filters.topic_code = selectedFilters.topic_code;
    if (selectedFilters.subtopic_code) filters.subtopic_code = selectedFilters.subtopic_code;
    if (selectedFilters.question_type) filters.question_type = selectedFilters.question_type;

    const levelFilter = filters.level.length ? filters.level.join(",") : "";

    try {
      console.log("updated filters", filters);
      const response = await getQuestionBank(
        filters.module_code,
        filters.topic_code,
        filters.subtopic_code,
        filters.question_type,
        levelFilter
      );

      setFilteredQuestions(response.data);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const clearFilters = async () => {
    setSelectedFilters({
      solved: false,
      unsolved: false,
      easy: false,
      medium: false,
      hard: false,
      topic: null,
    });

    try {
      const response = await getQuestionBank();
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getModuleName = (moduleCode) => {
    const module = moduleCodes.find((module) => module.module_code === moduleCode);
    return module ? module.module_name : "Unknown Module";
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <MoreFilters onClick={toggleDropdown}>
            More filters <RiArrowDropDownLine style={{ fontSize: "25px" }} />
          </MoreFilters>
        </div>

        {isDropdownOpen && (
          <DropdownContainer>
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
                    checked={selectedFilters[level.toLowerCase()]}
                    onChange={() => handleDifficultyChange(level.toLowerCase())}
                  />{" "}
                  {level}
                </CheckboxLabel>
              ))}
            </FilterSection>

            <FilterSection>
              <SubText>Topics</SubText>
              {moduleCodes
                .filter((module) => module.module_name.toLowerCase().includes(filterSearchQuery))
                .map((module) => (
                  <CheckboxLabel key={module.module_code}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.topic === module.module_name}
                      onChange={() => handleTopicChange(module.module_name)}
                    />{" "}
                    {module.module_name}
                  </CheckboxLabel>
                ))}
            </FilterSection>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <ClearButton onClick={clearFilters}>Clear all</ClearButton>
              <ApplyButton onClick={applyFilters}>Apply filter</ApplyButton>
            </div>
          </DropdownContainer>
        )}

        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item, index) => (
            <Link
              to={`/user/questionBank/${item._id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <QuestionCard key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <QuestionText>
                    {index + 1}. {item.question}
                  </QuestionText>
                  <MetaInfo>
                    <Topic>Module Name - {getModuleName(item.module_code)}</Topic>
                    <Difficulty>Level - {item.level}</Difficulty>
                    <Type>Type - {item.question_type}</Type>
                  </MetaInfo>
                </div>
                <Status>{item.status}</Status>
              </QuestionCard>
            </Link>
          ))
        ) : (
          <p>No questions match the selected filters.</p>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default QuestionBank;
