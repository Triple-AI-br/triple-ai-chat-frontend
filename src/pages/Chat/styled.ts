import styled from "styled-components";

export const ScrollChats = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 190px);
  border-bottom: 1px solid rgba(124, 124, 124, 20%);
  overflow-y: scroll;

  /* Hide scrollbar of anonymous chats for IE, Edge and Firefox */
  > ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* ===== Chats Scrollbar CSS ===== */
  /* Firefox */
  & {
    scrollbar-width: thin;
    scrollbar-color: #545454 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
  @media (min-width: 800px) {
    max-height: calc(100% - 140px);
  }
`;

export const HistoricContainer = styled.section`
  width: 100%;
  height: calc(100svh - 0px);
  overflow-y: auto;
  background-color: #f8fcff;
  position: relative;
`;

export const MainMessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  max-width: 880px;
  padding: 0 16px;
  position: relative;
  @media (min-width: 800px) {
    margin: 0 auto;
  }
`;
