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
`;

export const PromptsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PromptCard = styled.div`
  width: 300px;
  height: 100px;
  padding: 15px 10px;
  background-color: #f5f5f5;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
`;
