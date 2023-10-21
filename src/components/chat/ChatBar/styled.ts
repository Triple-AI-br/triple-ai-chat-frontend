import styled from "styled-components";

export const ChatBarContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 800px) {
    padding: 20px 10px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: center;
    width: calc(100% - 200px);
    margin: auto;
    :nth-child(1) {
      order: 1;
      margin-right: auto;
      text-align: center;
    }
    :nth-child(2) {
      order: 0;
      margin-right: auto;
      white-space: nowrap;
    }
  }
`;
