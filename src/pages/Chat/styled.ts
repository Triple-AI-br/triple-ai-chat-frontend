import styled from "styled-components";

export const ScrollChats = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 190px);
  border-bottom: 1px solid rgba(124, 124, 124, 20%);
  overflow-y: scroll;
  @media (min-width: 800px) {
    max-height: calc(100% - 140px);
  }
`;

export const HistoricContainer = styled.section`
  width: 100%;
  height: calc(100vh - 0px);
  overflow-y: scroll;
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
