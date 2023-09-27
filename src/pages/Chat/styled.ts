import styled from "styled-components";

export const LeftContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  min-width: 300px;
  max-width: 32%;
  border-right: 1px solid #ccc;
  overflow-y: hidden;
`;

export const ScrollChats = styled.div`
  height: 100%;
  overflow-y: scroll;
  /* This will work in Chrome / Edge / Safari / Opera. Firefox doesn't support scroll styling. Hope it helps! */
  &::-webkit-scrollbar {
    width: 10px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    width: 15px;
    background-color: transparent !important;
  }
  &::-webkit-scrollbar-track {
    width: 15px;
    background-color: transparent !important;
  }
  &:hover {
    &::-webkit-scrollbar {
      width: 10px;
      opacity: 1;
    }
    &::-webkit-scrollbar-thumb {
      width: 15px;
      background-color: gray !important;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      width: 15px;
      background-color: transparent !important;
    }
  }
`;
