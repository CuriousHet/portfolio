import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="bar">
        <div className="ball" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Full-screen loader */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black; /* Adjust based on your site's background */
  z-index: 1000; /* Ensure it appears above everything */

  .bar {
    width: 200px;
    height: 12.5px;
    background: #FFDAAF;
    border-radius: 30px;
    transform: rotate(-15deg);
    animation: up-down 3s ease-in-out 1s infinite alternate;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .ball {
    top: -50px;
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    animation: ball-move 3s ease-in-out 1s infinite alternate;
  }

  @keyframes up-down {
    from {
      transform: rotate(-15deg);
    }
    to {
      transform: rotate(15deg);
    }
  }

  @keyframes ball-move {
    from {
      left: calc(100% - 40px);
      transform: rotate(360deg);
    }
    to {
      left: calc(0% - 20px);
      transform: rotate(0deg);
    }
  }
`;

export default Loader;
