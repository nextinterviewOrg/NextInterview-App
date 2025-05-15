import React, { useState } from "react";
import {
  HintContainer,
  HintTitle,
  HintContent,
  HintButton,
  HintDescription,
  HintBox,
  DropdownWrapper,
  DropdownHeader,
  DropdownText,
  DropdownArrow,
  DropdownContent,
} from "../HintChallenges/HintChallenges.style";
import { useLocation, useNavigate } from "react-router-dom";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

const HintChallenges = ({ hints }) => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const location = useLocation();

  const handleNavigate = () => {
    navigate("/user/mainQuestionBank");
  };

  const toggleHint = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <HintContainer>
      <HintTitle>
        <span role="img" aria-label="info"></span> Hint
      </HintTitle>

      <HintBox>
        {hints && hints.length > 0 ? (
          hints.map((hint, index) => (
            <DropdownWrapper key={index}>
              <DropdownHeader onClick={() => toggleHint(index)}>
                <DropdownText>{hint.hint_text}</DropdownText>
                <DropdownArrow isOpen={expandedIndex === index}>
                  {expandedIndex === index ? <RxChevronUp /> : <RxChevronDown />}
                </DropdownArrow>
              </DropdownHeader>
              {expandedIndex === index && (
                <DropdownContent>
                  {hint.explanation || "No explanation provided"}
                </DropdownContent>
              )}
            </DropdownWrapper>
          ))
        ) : (
          <p>No hints available for this challenge.</p>
        )}
      </HintBox>

      {(!location.pathname.includes("/mainQuestionBank")) &&
        <HintContent>
        <HintDescription>
          <strong>Explore the question bank</strong>
          <p>
            Dive into the question bank to find and solve more exercises like
            this, expanding your skills even further.
          </p>
        </HintDescription>
        <HintButton onClick={handleNavigate}>Question bank</HintButton>
      </HintContent>}
    </HintContainer>
  );
};

export default HintChallenges;