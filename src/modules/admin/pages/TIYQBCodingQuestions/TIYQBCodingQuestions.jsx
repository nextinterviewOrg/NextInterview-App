import React, { useState, useEffect, useCallback } from "react";
import { FiEdit } from "react-icons/fi";
import AddChallenge from "../../components/Challenges/AddChallenge/AddChallenges";
import EditChallenge from "../../components/Challenges/EditChallenge/EditChallenge";
import { getChallenges } from "../../../../api/challengesApi";
import {
    Container,
    SearchBar,
    FilterRow,
    Dropdown,
    TableContainer,
    TableHeader,
    RowContainer,
    Type,
    Question,
    Answer,
    Action,
    IconButton,
    AddButton,
    StatusMessage,
    LoadingMessage
} from "./TIYQBCodingQuestions.styles";
import { Select } from 'antd';
import { getModuleCode } from "../../../../api/addNewModuleApi";
import { getAllQBCodingQuestions, getAllTIYCodingQuestions, getAllTiyQbCodingQuestions, softDeleteTiyQbCodingQuestion } from "../../../../api/tiyQbCodingQuestionApi";
import AddCodingQuestion from "../../components/AddCodingQuestion/AddCodingQuestion";
import EditCodingQuestion from "../../components/EditCodingQuestion/EditCodingQuestion";
import { RiDeleteBinLine } from "react-icons/ri";

const TIYQBCodingQuestions = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModule, setSelectedModule] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [moduleOptions, setModuleOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([
        { value: 'tiy', label: 'Try It Yourself' },
        { value: 'qb', label: 'Question Bank' },
    ]);
    const [selectedModuleCode, setSelectedModuleCode] = useState(null);
    const [selectedTypeOption, setSelectedTypeOption] = useState(null);
    // const moduleOptions = ["All", "Module 1", "Module 2", "Module 3"];
    // const typeOptions = ["All", "TIY", "QB"];

    const fetchChallenges = useCallback(async () => {
        try {
            setLoading(true);
            const moduleCodesData = await getModuleCode();
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) });
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            setSelectedTypeOption('tiy');
            const response = await getAllTiyQbCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch questions.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChallenges();
    }, [fetchChallenges]);

    useEffect(() => {
        let filtered = [...challenges];

        if (searchQuery.trim()) {
            filtered = filtered.filter(q =>
                q.QuestionText.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedModule !== "All") {
            filtered = filtered.filter(q => q.module === selectedModule);
        }

        if (selectedType !== "All") {
            filtered = filtered.filter(q =>
                selectedType === "TIY" ? q.isTiyQuestion : q.isQbQuestion
            );
        }

        setFilteredChallenges(filtered);
    }, [searchQuery, selectedModule, selectedType, challenges]);

    const handleOpenAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handleOpenEditModal = (challenge) => {
        setCurrentChallenge(challenge);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setCurrentChallenge(null);
    };

    const handleChallengeAdded = useCallback(async (newChallenge) => {
        try {
            setLoading(true);
            const moduleCodesData = await getModuleCode();
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) });
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            setSelectedTypeOption('tiy');
            
            const response = await getAllTiyQbCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch questions.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        const apiCaller = async () => {
           if(selectedTypeOption === 'tiy'){
            const response = await getAllTIYCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
           }
           else if(selectedTypeOption === 'qb'){
            const response = await getAllQBCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
           }
        }
        apiCaller();
    },[selectedTypeOption])

    const handleChallengeUpdated = useCallback(async (updatedChallenge) => {
        try {
            setLoading(true);
            const moduleCodesData = await getModuleCode();
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) });
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            setSelectedTypeOption('tiy');
            const response = await getAllTiyQbCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch questions.");
        } finally {
            setLoading(false);
        }
    }, []);
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await softDeleteTiyQbCodingQuestion(id);
            const moduleCodesData = await getModuleCode();
            const preparedModuleOptions = moduleCodesData.data.map((module) => { return ({ value: module.module_code, label: module.module_name }) });
            setModuleOptions(preparedModuleOptions);
            setSelectedModuleCode(preparedModuleOptions.length > 0 ? preparedModuleOptions[0].value : null);
            setSelectedTypeOption('tiy');
            const response = await getAllTiyQbCodingQuestions();
            setChallenges(response);
            setFilteredChallenges(response);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch questions.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <LoadingMessage>Loading questions...</LoadingMessage>;

    return (
        <Container>
            {error && <StatusMessage error>{error}</StatusMessage>}
            {successMessage && <StatusMessage success>{successMessage}</StatusMessage>}

            <FilterRow>
                <AddButton onClick={handleOpenAddModal}>Add Question</AddButton>
                <SearchBar
                    placeholder="Search for a question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select
                    showSearch
                    placeholder="Select a module"
                    filterOption={(input, option) => {
                        var _a;
                        return (
                            (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                _a !== void 0
                                ? _a
                                : ''
                        )
                            .toLowerCase()
                            .includes(input.toLowerCase());
                    }}
                    options={moduleOptions}
                    value={selectedModuleCode}
                    onChange={(e) => { setSelectedModuleCode(e) }}
                />
                <Select
                    showSearch
                    placeholder="Select a type of question"
                    filterOption={(input, option) => {
                        var _a;
                        return (
                            (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                _a !== void 0
                                ? _a
                                : ''
                        )
                            .toLowerCase()
                            .includes(input.toLowerCase());
                    }}
                    value={selectedTypeOption}
                    options={typeOptions}
                    onChange={(e) => { setSelectedTypeOption(e) }}
                />
            </FilterRow>

            <TableContainer>
                <TableHeader>
                    <div>Type</div>
                    <div>Question</div>
                    {/* <div>Description</div> */}
                    <div>Action</div>
                </TableHeader>

                {filteredChallenges.length > 0 ? (
                    filteredChallenges.map((item) => (
                        <RowContainer key={item._id}>
                            <Type>{item.programming_language}</Type>
                            <Question>{item.QuestionText}</Question>
                            {/* <Answer>{item.description?.slice(0, 32)}...</Answer> */}
                            <Action>
                                <IconButton onClick={() => handleOpenEditModal(item)}>
                                    <FiEdit />
                                </IconButton>
                                <IconButton onClick={() => {
                                    handleDelete(item._id)
                                }}>
                                    <RiDeleteBinLine color="#dc3545" />
                                </IconButton>
                            </Action>
                        </RowContainer>
                    ))
                ) : (
                    <RowContainer>
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
                            No matching questions found.
                        </div>
                    </RowContainer>
                )}
            </TableContainer>

            {showAddModal && (
                <AddCodingQuestion
                    onClose={handleCloseAddModal}
                    onChallengeAdded={handleChallengeAdded}
                />
            )}

            {showEditModal && currentChallenge && (
                <EditCodingQuestion
                    questionId={currentChallenge._id}
                    questionData={currentChallenge}
                    onClose={handleCloseEditModal}
                    onQuestionUpdated={handleChallengeUpdated}
                />
            )}
        </Container>
    );
};

export default TIYQBCodingQuestions;
