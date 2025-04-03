import React, { useState } from "react";
import {
  Container,
  Header,
  ContentWrapper,
  FlashcardLabel,
  FlashcardNumber,
  TextArea,
  Footer,
  UploadButton,
  CloseButton,
  ModalWrapper,
  ImagePreview,
  FileInputWrapper,
} from "./AddFlashCard.styles";
import { message } from "antd";
import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase"; // Assuming path is correct

const AddFlashCard = ({ onClose, onSave, flashcardCount }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // State to store the background image
  const [imagePreview, setImagePreview] = useState(null); // State to show preview of the image
  const [error, setError] = useState(false);

  // Handle image upload and store the image URL from Firebase
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      try {
        const imageURL = await uploadFileToFirebase(file, "flashcard");
        setImage(imageURL);
        message.success("Image uploaded successfully!");
      } catch (error) {
        message.error("Failed to upload image");
      }
    } else {
      message.error("Please upload a valid image file.");
    }
  };

  const handleSave = () => {
    if (content.trim() === "") {
      setError(true);
      return;
    }

    if (!image) {
      message.error("Please upload a background image.");
      return;
    }

    console.log("Saving Flashcard with image:", image); // Debugging

    onSave({
      id: flashcardCount + 1,
      text: content,
      know: 0,
      dontKnow: 0,
      backgroundImage: image, // Ensure this contains the base64 string or image URL
    });
    onClose();
  };

  return (
    <ModalWrapper>
      <Container>
        <Header>
          Add flash card
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <ContentWrapper>
          <FlashcardLabel>
            <div style={{ marginBottom: "10px" }}>Add flash card content</div>
            <FlashcardNumber>Flash Card - {flashcardCount + 1}</FlashcardNumber>
          </FlashcardLabel>
          <TextArea
            placeholder="Type here"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError(false);
            }}
            maxLength={50}
            style={{
              borderColor: error ? "red" : "#ccc",
              outline: error ? "1px solid red" : "none",
            }}
          />
          {error && (
            <div style={{ color: "red", marginTop: "5px" }}>
              Please fill the above field.
            </div>
          )}

          <FileInputWrapper>
            <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
              <div className="upload-button" style={{ padding: "10px", backgroundColor: "#f1f1f1", borderRadius: "5px", textAlign: "center" }}>
                Choose an image
              </div>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {imagePreview && (
              <ImagePreview>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: "15px",
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </ImagePreview>
            )}
          </FileInputWrapper>
        </ContentWrapper>
        {/* <span style={{ marginLeft: "160px" }}>{content.length}/50</span> */}
        <Footer>
          <UploadButton onClick={handleSave}>Save</UploadButton>
        </Footer>
      </Container>
    </ModalWrapper>
  );
};

export default AddFlashCard;
