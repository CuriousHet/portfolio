import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledWrapper>
      {isVisible && (
        <button onClick={scrollToTop} aria-label="Back to Top">
          <svg
            strokeWidth={2.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </StyledWrapper>
  );
};

// Styled Component
const StyledWrapper = styled.div`
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;

  button {
    width: 70px;
    height: 70px;
    border: none;
    background: #efdfbb;
    color: black;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;
  }

  button:hover {
    background: #d4c09b;
    transform: scale(1.1);
  }

  .arrow-icon {
    width: 28px;
    height: 28px;
    transition: transform 0.2s ease-out;
    transform: rotate(180deg)
  }

  button:hover .arrow-icon {
    transform: rotate(-90deg);
  }

  /* Responsive for mobile */
  @media (max-width: 768px) {
    right: 20px;
    button {
      width: 60px;
      height: 60px;
    }
    .arrow-icon {
      width: 24px;
      height: 24px;
    }
  }
`;

export default BackToTop;
