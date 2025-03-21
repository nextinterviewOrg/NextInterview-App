import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import AddFlashCard from "./AddFlashCard/AddFlashCard";
import EditFlashCard from "./EditFlashCard/EditFlashCard";
import DeleteModule from "../DeleteModule/DeleteModule";
import { RiDeleteBinLine } from "react-icons/ri";
import { SearchBarWrapper } from "./FlashcardsComponents.styles";
import { IoSearch } from "react-icons/io5";
import { message } from "antd";
import { ShimmerText, ShimmerTitle, ShimmerButton } from "react-shimmer-effects"; // Ensure correct import
import {
  FlashcardContainer,
  Flashcard,
  ActionButton,
  InteractionStats,
  AddButton,
  SearchBar,
  Header,
} from "./FlashcardsComponents.styles";
import {
  addFlashcard,
  deleteFlashcard,
  getFlashcards,
  updateFlashcard,
} from "../../../../api/flashcardApi";

const FlashcardsComponents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const apiCaller = async () => {
    setLoading(true);
    const data = await getFlashcards();
    const response = data.data.map((item, index) => {
      return {
        id: index + 1,
        text: item.cardContent,
        know: item.cardKnown || 0,
        dontKnow: item.cardUnknown || 0,
        sharedCount: item.sharedCount || 0,
        peopleInteractionCount: item.peopleInteractionCount,
        _id: item._id,
      };
    });
    setFlashcards(response);
    setLoading(false);
  };

  useEffect(() => {
    apiCaller();
  }, []);

  const handleEdit = (id) => {
    const cardToEdit = flashcards.find((card) => card.id === id);
    setCurrentCard(cardToEdit);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentCard(id);
    setDeleteModalVisible(true); // Show DeleteModule
  };

  const handleConfirmDelete = async (id) => {
    const response = await deleteFlashcard(currentCard);
    message.success("Flashcard deleted successfully!");
    apiCaller();
    setDeleteModalVisible(false); // Hide DeleteModule after deletion
    setCurrentCard(null);
  };

  const handleCancelDelete = () => {
    message.error("Flashcard deletion canceled!");
    setDeleteModalVisible(false); // Hide DeleteModule without deletion
    setCurrentCard(null);
  };

  const handleAddFlashcard = async (newFlashcard) => {
    const response = await addFlashcard({ cardContent: newFlashcard.text });
    message.success("Flashcard added successfully!");
    apiCaller();
    setIsAdding(false);
  };

  const handleSaveEdit = async (updatedCard) => {
    const response = await updateFlashcard(updatedCard._id, {
      cardContent: updatedCard.text,
    });
    message.success("Flashcard updated successfully!");
    apiCaller();
    setIsEditing(false);
    setCurrentCard(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredFlashcards = flashcards.filter((card) =>
    card?.text?.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <FlashcardContainer>
        <Header>
          <SearchBarWrapper>
            <IoSearch size={20} />
            <SearchBar
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBarWrapper>
          <AddButton onClick={() => setIsAdding(true)}>Add flashcard</AddButton>
        </Header>

        {isAdding && (
          <AddFlashCard
            onClose={() => setIsAdding(false)}
            onSave={handleAddFlashcard}
            flashcardCount={flashcards.length}
          />
        )}

        {isEditing && currentCard && (
          <EditFlashCard
            card={currentCard}
            onClose={() => setIsEditing(false)}
            onSave={handleSaveEdit}
          />
        )}

        {loading ? (
          <div className="loading-cards">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="loading-card">
                <ShimmerTitle width="80%" height="20px" style={{ margin: "10px 0" }} />
                <ShimmerText width="90%" height="15px" style={{ margin: "5px 0" }} />
                {/* <ShimmerText width="80%" height="15px" style={{ margin: "5px 0" }} /> */}
                {/* /<ShimmerButton width="60%" height="40px" style={{ marginTop: "10px" }} /> */}
              </div>
            ))}
          </div>
        ) : (
          filteredFlashcards.map((card) => (
            <Flashcard key={card.id}>
              <h4>Flash Card - {card.id}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>{card.text}</p>
                <div className="actions">
                  <ActionButton onClick={() => handleEdit(card.id)}>
                    <FiEdit3 />
                  </ActionButton>
                  <ActionButton onClick={() => handleDeleteClick(card._id)} delete>
                    <RiDeleteBinLine />
                  </ActionButton>
                </div>
              </div>
              <InteractionStats>
                <span>Shared with - {card.sharedCount} people</span>
                <span>No. of people interacted - {card.peopleInteractionCount}</span>
                <div>
                  <span
                    style={{
                      color: "#68c184",
                      fontWeight: "bold",
                      backgroundColor: "#f0f8f1",
                      border: "1px solid #defcd6",
                    }}
                  >
                    I know - {card.know}%
                  </span>
                  <span
                    style={{
                      color: "#843838",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      backgroundColor: "#ffebeb",
                      border: "1px solid #fcd6d6",
                    }}
                  >
                    I don't know - {card.dontKnow}%
                  </span>
                </div>
              </InteractionStats>
            </Flashcard>
          ))
        )}
      </FlashcardContainer>

      {deleteModalVisible && (
        <DeleteModule
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default FlashcardsComponents;
