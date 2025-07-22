import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import AddFlashCard from "./AddFlashCard/AddFlashCard";
import EditFlashCard from "./EditFlashCard/EditFlashCard";
import DeleteModule from "../DeleteModule/DeleteModule";
import { RiDeleteBinLine } from "react-icons/ri";
import { SearchBarWrapper } from "./FlashcardsComponents.styles";
import { IoSearch } from "react-icons/io5";
import { message } from "antd";

import { ShimmerText, ShimmerTitle } from "react-shimmer-effects";
import Slider from "react-slick";
import {
  FlashcardContainer,
  Flashcard,
  ActionButton,
  InteractionStats,
  AddButton,
  SearchBar,
  Header,
  FlashContainer,
  Image
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

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const data = await getFlashcards();
      const response = data.map((item, index) => {
        const createdAt = new Date(item.createdAt);
        const formattedDate = createdAt.toLocaleDateString("en-GB");

        return {
          id: index + 1,
          text: item.cardContent,
          backgroundImage: item.backgroundImage,
          createdAt: formattedDate,
          know: item.cardKnown || 0,
          dontKnow: item.cardUnknown || 0,
          sharedCount: item.sharedCount || 0,
          peopleInteractionCount: item.peopleInteractionCount,
          _id: item._id,
        };
      });
      setFlashcards(response);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      message.error("Failed to load flashcards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleEdit = (id) => {
    const cardToEdit = flashcards.find((card) => card.id === id);
    setCurrentCard(cardToEdit);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentCard(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFlashcard(currentCard);
      message.success("Flashcard deleted successfully!");
      setFlashcards(flashcards.filter(card => card._id !== currentCard));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      message.error("Failed to delete flashcard");
    } finally {
      setDeleteModalVisible(false);
      setCurrentCard(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setCurrentCard(null);
  };

  const handleAddFlashcard = async (newFlashcard) => {
    try {
      const submissionData = {
        cardContent: newFlashcard.text,
        sharedCount: 0,
        peopleInteractionCount: 0,
        cardKnown: newFlashcard.know,
        cardUnknown: newFlashcard.know,
        date: "",
        backgroundImage: newFlashcard.backgroundImage
      };
      
      const response = await addFlashcard(submissionData);
      
      // Create the new card with the response data from the server
      const newCard = {
        id: flashcards.length + 1,
        text: response.data.cardContent,
        backgroundImage: response.data.backgroundImage,
        createdAt: new Date(response.data.createdAt).toLocaleDateString("en-GB"),
        know: response.data.cardKnown || 0,
        dontKnow: response.data.cardUnknown || 0,
        sharedCount: response.data.sharedCount || 0,
        peopleInteractionCount: response.data.peopleInteractionCount,
        _id: response.data._id
      };
      
      // Add the new card to the beginning of the flashcards array
      setFlashcards([newCard, ...flashcards]);
      message.success("Flashcard added successfully!");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding flashcard:", error);
      message.error("Failed to add flashcard");
    }
  };

  const handleSaveEdit = async (updatedCard) => {
    try {
      const response = await updateFlashcard(updatedCard._id, {
        cardContent: updatedCard.text,
      });
      
      setFlashcards(flashcards.map(card =>
        card._id === updatedCard._id ? { ...card, text: updatedCard.text } : card
      ));
      message.success("Flashcard updated successfully!");
    } catch (error) {
      console.error("Error updating flashcard:", error);
      message.error("Failed to update flashcard");
    } finally {
      setIsEditing(false);
      setCurrentCard(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredFlashcards = flashcards.filter((card) =>
    card?.text?.toLowerCase().includes(searchTerm)
  );

  return (
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
        <div className="loading-cards" style={{ marginLeft: "60px" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="loading-card">
              <ShimmerTitle width="80%" height="20px" style={{ marginLeft: "60px", marginBottom: "5px" }} />
              <ShimmerText width="90%" height="15px" style={{ marginLeft: "60px", marginBottom: "5px" }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredFlashcards.map((card) => (
            <FlashContainer key={card._id}>
              <Flashcard>
                <h4>Flash Card - {card.id}</h4>
                {/* <Image src={card.backgroundImage} /> */}
                <p>{card.text}</p>
                <p>{card.createdAt}</p>
                <InteractionStats>
                  <span>No. of people interacted - {card.peopleInteractionCount}</span>
                  <div>
                    <span>I know - {card.know}%</span>
                    <span>I don't know - {card.dontKnow}%</span>
                  </div>
                </InteractionStats>
                <div className="actions">
                  <ActionButton onClick={() => handleDeleteClick(card._id)} delete>
                    <RiDeleteBinLine />
                  </ActionButton>
                </div>
              </Flashcard>
            </FlashContainer>
          ))}
        </div>
      )}

      {deleteModalVisible && (
        <DeleteModule
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </FlashcardContainer>
  );
};

export default FlashcardsComponents;