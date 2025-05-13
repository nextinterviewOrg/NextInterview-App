import React, { useState } from "react";
import {
  HintContainer,
  HintTitle,
  HintContent,
  HintButton,
  HintDescription,
  DropdownIcon,
  HintBox,
  CarouselWrapper,
  Arrow,
} from "../HintChallenges/HintChallenges.style";
import { useNavigate } from "react-router-dom";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

const HintChallenges = ({ hints }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleNavigate = () => {
    navigate("/user/questionbank");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePrev = () => {
    setCurrentHintIndex((prev) => (prev > 0 ? prev - 1 : hints.length - 1));
  };

  const handleNext = () => {
    setCurrentHintIndex((prev) => (prev < hints.length - 1 ? prev + 1 : 0));
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
         <CarouselWrapper>
           {hints.length > 1 && (
             <Arrow
               onClick={handlePrev}
               disabled={currentHintIndex === 0}
             >
               &lt;
             </Arrow>
           )}
     
           <HintContent>
             <strong>{hints[currentHintIndex].hint_text}</strong>
             <br />
             {hints[currentHintIndex].explanation || "No explanation provided"}
           </HintContent>
     
           {hints.length > 1 && (
             <Arrow
               onClick={handleNext}
               disabled={currentHintIndex === hints.length - 1}
             >
               &gt;
             </Arrow>
           )}
         </CarouselWrapper>
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
