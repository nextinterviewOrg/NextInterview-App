import React, { useState, useEffect, useCallback } from "react";
import { FiEdit } from "react-icons/fi";
import AddChallenge from "../../components/Challenges/AddChallenge/AddChallenges";
import { getChallenges } from "../../../../api/challengesApi";
import EditChallenge from "../../components/Challenges/EditChallenge/EditChallenge";
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
  AddButton,
  StatusMessage,
  LoadingMessage
} from "./Challenges.styles";

const Challenges = () => {
  // State management
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch challenges from API
  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getChallenges();
      setChallenges(response.data);
      setFilteredChallenges(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch challenges");
      setChallenges([]);
      setFilteredChallenges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  // Filter challenges based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(challenge =>
        challenge.QuestionText.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChallenges(filtered);
    }
  }, [searchQuery, challenges]);

  // Modal handlers
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

  // Data manipulation handlers
  const handleChallengeAdded = useCallback((newChallenge) => {
    setChallenges(prev => [newChallenge, ...prev]);
    setSuccessMessage('Challenge added successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  }, []);

  const handleChallengeUpdated = useCallback((updatedChallenge) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge._id === updatedChallenge._id ? updatedChallenge : challenge
      )
    );
    setSuccessMessage('Challenge updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <LoadingMessage>Loading questions...</LoadingMessage>;

  return (
    <Container>
      {/* Status messages */}
      {error && <StatusMessage error>{error}</StatusMessage>}
      {successMessage && <StatusMessage success>{successMessage}</StatusMessage>}

      {/* Action controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <AddButton onClick={handleOpenAddModal}>Add Questions</AddButton>
        <SearchBar 
          placeholder="Search for a Question" 
          value={searchQuery}
          onChange={handleSearchChange} 
        />
      </div>
      
      {/* Challenges table */}
      <TableContainer>
        <TableHeader>
          <div>Type</div>
          <div>Question</div>
          <div>Description</div>
          <div>Action</div>
        </TableHeader>
        
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((item) => (
            <RowContainer key={item._id}>
              <Type>{item.programming_language}</Type>
              <Question>{item.QuestionText.slice(0,30)}...</Question>
              <Answer>{item.description.slice(0.32)}...</Answer>
              <Action>
                <IconButton 
                  aria-label="Edit challenge"
                  onClick={() => handleOpenEditModal(item)}
                >
                  <FiEdit />
                </IconButton>
              </Action>
            </RowContainer>
          ))
        ) : (
          <RowContainer>
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
              {searchQuery ? 'No questions match your search' : 'No questions available'}
            </div>
          </RowContainer>
        )}
      </TableContainer>

      {/* Modals */}
      {showAddModal && (
        <AddChallenge 
          onClose={handleCloseAddModal} 
          onChallengeAdded={handleChallengeAdded}
        />
      )}

      {showEditModal && currentChallenge && (
        <EditChallenge 
          challenge={currentChallenge}
          onClose={handleCloseEditModal}
          onChallengeUpdated={handleChallengeUpdated}
        />
      )}
    </Container>
  );
};

export default Challenges;