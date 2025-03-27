// ConceptTooltip.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TooltipWrapper = styled.span`
  position: relative;
  display: inline;
  cursor: pointer;
  color: #2390ac;
  font-weight: bold;
  text-decoration: underline dotted #2390ac;
  text-underline-offset: 3px;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline solid #2390ac;
    color: #1a6a8a;
  }
`;

const TooltipContent = styled.div`
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  width: 300px;
  max-width: 90vw;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  position: absolute;
  z-index: 1000;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  pointer-events: none;
  font-size: 16px;

  /* Basic HTML element styling */
  p {
    margin: 8px 0;
    line-height: 1.5;
  }
  ul,
  ol {
    padding-left: 20px;
    margin: 8px 0;
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
`;

const ConceptTooltip = ({ term, hoverText, popupText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Sanitize and prepare the popup content
  const getPopupContent = () => {
    if (!popupText) return { __html: "No explanation available" };

    // Basic sanitization (in production, use a proper sanitizer library)
    const sanitized = popupText
      .replace(/<script.*?>.*?<\/script>/gi, "")
      .replace(/<style.*?>.*?<\/style>/gi, "");

    return { __html: sanitized };
  };

  return (
    <TooltipWrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      aria-label={`Concept: ${term}`}
      role="tooltip"
      aria-expanded={showTooltip}
    >
      {term.replace(/<[^>]*>?/gm, "")} {/* Remove any HTML tags from term */}
      <TooltipContent $show={showTooltip}>
        {hoverText && (
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#2390ac",
            }}
          >
            {hoverText.replace(/<[^>]*>?/gm, "")}
          </div>
        )}
        <div dangerouslySetInnerHTML={getPopupContent()} />
      </TooltipContent>
    </TooltipWrapper>
  );
};

ConceptTooltip.propTypes = {
  term: PropTypes.string.isRequired,
  hoverText: PropTypes.string,
  popupText: PropTypes.string.isRequired,
};

ConceptTooltip.defaultProps = {
  hoverText: "",
};

export default ConceptTooltip;
