import React from "react";
import styled from "styled-components";

const Loader = styled.span`
  position: relative;
  width: 64px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  transform: rotate(45deg);
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    inset: 8px;
    margin: auto;
    background: black;
  }
  &:before {
    content: "";
    position: absolute;
    inset: -15px;
    margin: auto;
    background: #1677ff;
    animation: diamondLoader 1s linear infinite;
  }
  @keyframes diamondLoader {
    0%,
    10% {
      transform: translate(-64px, -64px) rotate(-45deg);
    }
    90%,
    100% {
      transform: translate(0px, 0px) rotate(-45deg);
    }
  }
`;

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        zIndex: 1000,
      }}>
      <Loader />
    </div>
  );
};

export default Loading;
