import React, { useState } from "react";
import {
  HintContainer,
  HintTitle,
  HintContent,
  HintButton,
  HintDescription,
  DropdownIcon,
  HintBox,
} from "../HintChallenges/HintChallenges.style";
import { useNavigate } from "react-router-dom";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

const HintChallenges = ({ hints }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    navigate("/user/questionbank");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HintContainer>
      <HintTitle onClick={toggleDropdown}>
        <span role="img" aria-label="info"></span> Hint
        <DropdownIcon>
          {isOpen ? <RxChevronUp /> : <RxChevronDown />}
        </DropdownIcon>
      </HintTitle>

      {isOpen && (
        <HintBox>
          {hints && hints.length > 0 ? (
            <ul>
              {hints.map((hint, index) => (
                <li key={index}>
                  <strong>{hint.hint_text}:</strong>{" "}
                  {hint.explanation || "No explanation provided"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hints available for this challenge.</p>
          )}
        </HintBox>
      )}

      <HintContent>
        <HintDescription>
          <strong>Explore the question bank</strong>
          <p>
            Dive into the question bank to find and solve more exercises like
            this, expanding your skills even further.
          </p>
        </HintDescription>
        <HintButton onClick={handleNavigate}>Question bank</HintButton>
      </HintContent>
    </HintContainer>
  );
};

export default HintChallenges;
