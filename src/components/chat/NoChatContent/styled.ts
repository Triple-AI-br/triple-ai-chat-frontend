import styled from "styled-components";

export const NoChatContainer = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #f8fcff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 16px;
  text-align: center;
  h3 {
    font-size: 16px;
  }
  @media (min-width: 800px) {
    h3 {
      font-size: 20px;
    }
  }
`;

export const PromptsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  svg {
    font-size: 32px;
  }
  > .initial_text {
    font-size: 14px;
  }
  @media (min-width: 800px) {
    svg {
      font-size: 50px;
    }
    > .initial_text {
      font-size: 16px;
    }
  }
`;

export const PromptCard = styled.div`
  width: 100%;
  height: 60px;
  padding: 4px 5px;
  background-color: #f5f5f5;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  cursor: pointer;
  > span {
    display: block;
    width: 100% !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > .prompt_title {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #3e4352;
  }
  @media (min-width: 800px) {
    width: 300px;
    height: 100px;
    padding: 15px 10px;
    gap: 10px;
  }
`;
