import styled from "styled-components";

export const DrawerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`;

export const Navigator = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  > button {
    width: 100%;
    font-size: 18px;
    border-radius: 3px;
    background-color: rgba(120, 120, 120, 0.1);
    height: fit-content;
    padding: 0px 20px 0 40px;
    border-left: 4px solid #367cff;
  }
`;

export const RightsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1b1b1b59;
`;
