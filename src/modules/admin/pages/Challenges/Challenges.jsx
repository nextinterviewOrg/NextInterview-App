import React, { useState, useEffect, useCallback } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddChallenge from "../../components/Challenges/AddChallenge/AddChallenges";
import EditChallenge from "../../components/Challenges/EditChallenge/EditChallenge";
import DeleteModule from "../../components/DeleteModule/DeleteModule"; // ✅ Import your confirmation modal
import {
  getChallenges,
  softdeleteChallenges
} from "../../../../api/challengesApi";
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
import { message } from "antd";

const Challenges = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [challengeToDelete, setChallengeToDelete] = useState(null);

  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getChallenges();
      const filtered = response.data.filter(ch => !ch.isDeleted);
      setChallenges(filtered);
      setFilteredChallenges(filtered);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch challenges");
      setChallenges([]);
      setFilteredChallenges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

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

  const confirmDeleteChallenge = (challengeId) => {
    setChallengeToDelete(challengeId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await softdeleteChallenges(challengeToDelete);
      setChallenges(prev => prev.filter(ch => ch._id !== challengeToDelete));
      setSuccessMessage("Challenge deleted successfully!");
      message.success("Challenge deleted successfully!");
    } catch (error) {
      console.error("Error deleting challenge:", error);
      setError("Failed to delete challenge");
      message.error("Failed to delete challenge");
    } finally {
      setShowDeleteModal(false);
      setChallengeToDelete(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <LoadingMessage>Loading questions...</LoadingMessage>;

  return (
    <Container>
      {/* Status messages */}
      {error && <StatusMessage error>{error}</StatusMessage>}
      {successMessage && <StatusMessage success>{successMessage}</StatusMessage>}

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <AddButton onClick={handleOpenAddModal}>Add Questions</AddButton>
        <SearchBar
          placeholder="Search for a Question"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table */}
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
              <Type>{item.question_type}</Type>
              <Question>{item.QuestionText}</Question>
              <Answer>{item.question_type === 'coding' ? 'N/A' : item.description}</Answer>
              <Action>
                <IconButton>
                  <FiEdit onClick={() => handleOpenEditModal(item)} />
                  <RiDeleteBin6Line
                    style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}
                    onClick={() => confirmDeleteChallenge(item._id)}
                  />
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
      {showDeleteModal && (
        <DeleteModule
          title="Delete Challenge"
          message="Are you sure you want to delete this challenge?"
          onCancel={() => {
            setShowDeleteModal(false);
            setChallengeToDelete(null);
          }}
          onDelete={handleDeleteConfirmed}
        />
      )}
    </Container>
  );
};

export default Challenges;
