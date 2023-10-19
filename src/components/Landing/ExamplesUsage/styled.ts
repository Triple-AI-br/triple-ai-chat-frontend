import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  background-color: #343f4f;
  display: flex;
  align-items: center;
  margin: 40px 0;
`;

export const ExamplesContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 16px 16px 0 16px;
  border-bottom: 1px solid #f0f0f0;
  @media (min-width: 800px) {
    flex-direction: row;
    gap: 30px;
    border-bottom: none;
    padding: 32px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 32px;
  }
`;

export const SendMessageIllustration = styled.img`
  width: 100%;
  @media (min-width: 800px) {
    width: 50%;
    margin-left: auto;
  }
`;

export const StaticMessage = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  @media (min-width: 800px) {
    font-size: 30px;
  }
`;

export const MessageList = styled.ul`
  height: 300px;
  color: #fc9e4f;
  font-size: 22px;
  @media (min-width: 800px) {
    font-size: 1.5rem;
    align-self: center;
    height: 350px;
  }
  @media (min-width: 1280px) {
    font-size: 2rem;
  }
`;
