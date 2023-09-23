import styled, { keyframes } from "styled-components";

const typing = keyframes`
  40%, 60%{
    left: 100%;
  }
  100%{
    left: 0;
  }
`;

const slide = keyframes`
  100% {
    top: -160px;
  }
`;

export const Container = styled.section`
  width: 100%;
  background-color: #343f4f;
  display: flex;
  align-items: center;
`;

export const ExamplesContainer = styled.div`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 32px;
  }
`;

export const StaticMessage = styled.h2`
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  line-height: 40px;
  height: 40px;
`;

export const MessageList = styled.ul`
  margin-left: 15px;
  line-height: 40px;
  height: 40px;
  overflow: hidden;
  > li {
    color: #fc6d6d;
    list-style: none;
    font-weight: 500;
    font-size: 30px;
    top: 0;
    position: relative;
    animation: ${slide} 14s steps(4) infinite;
    display: flex;
    align-items: flex-end;
  }
  > li span {
    position: relative;
  }
  > li span::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    border-left: 2px solid #fc6d6d;
    left: 0;
    top: 0;
    background-color: #343f4f;
    animation: ${typing} 3.5s steps(108) infinite;
  }
`;
