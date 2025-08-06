import React, { useState } from "react";
import {
  Container,
  Modal,
  ModalContent,
  Dropdown,
  Button,
  CloseButton,
  TextBox,
  Title,
  // ErrorMessage, // Import ErrorMessage for validation messages
} from "../../components/SupportQuery/SupportQuery.style";
import { createSupportQuery } from "../../../../api/supportQueryApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { message } from "antd";
import "react-toastify/dist/ReactToastify.css";

const SupportQuery = ({ isOpen, onClose }) => {
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Content");
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({ category: "", query: "" }); // Error state for validation
  const { user } = useUser();

  // ✅ Validation function to check required fields
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check if category is selected
    if (!category) {
      formErrors.category = "Please select a category.";
      isValid = false;
    }

    // Check if query is filled
    if (!query.trim()) {
      formErrors.query = "Please describe your issue.";
      isValid = false;
    }

    setErrors(formErrors); // Update error state
    return isValid; // Return form validity
  };

  // ✅ Handle form submission with validation
  // ✅ Handle form submission with validation
  const handleSend = async () => {
    // Validate fields before submission
    if (!validateForm()) {
      return; // Prevent submission if invalid
    }

    // Close the modal immediately
    onClose();

    try {
      // Get user details using Clerk ID
      const userData = await getUserByClerkId(user.id);

      // Submit the query if validation passes (runs in the background now)
      createSupportQuery({
        user_id: userData.data.user._id,
        priority,
        category,
        status: "Created",
        query_description: query,
      })
        .then(() => {
          // Show success message after query submission
          message.success("Query submitted successfully!");
        })
        .catch(() => {
          // Show error message if submission fails
          message.error("Failed to submit query. Please try again.");
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  return (
    <Container isOpen={isOpen}>
      <Modal>
        <Title>Raise a Query</Title>
        <ModalContent>
          {/* Category Selection */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "15px",
            }}
          >
            <label>Select Issue Category</label>
            <Dropdown
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Content">Content</option>
              <option value="Billing">Billing</option>
              <option value="General">General</option>
              <option value="Technical">Technical</option>
            </Dropdown>
            {/* Show error if category is not selected */}
            {errors.category && <div>{errors.category}</div>}
          </div>

          {/* Query Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "15px",
            }}
          >
            <label>Issue Summary Field</label>
            <TextBox
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your issue..."
              maxLength={1000}
            />
            {/* Show error if query is empty */}
            {errors.query && <div>{errors.query}</div>}
          </div>
          <div style={{ marginLeft: "20px" }}>You will receive an email regarding the update on this query</div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginLeft: "20px",
            }}
          >
            <Button
              onClick={handleSend}
              style={{ backgroundColor: "#2390ac", marginRight: "10px" }}
            >
              Submit
            </Button>
          </div>
        </ModalContent>

        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Modal>
    </Container>
  );
};

export default SupportQuery;
