import styled from "styled-components";

// LeftTopBar

export const LeftTopBarContainer = styled.div<{ $customerColor?: string }>`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.$customerColor};
  display: flex;
  align-items: center;
  padding: 5px 20px;
  .customer_container {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 10px;
  }
  > .back_icon {
    border-radius: 50px;
    padding: 5px;
    transition: ease-in-out 0.2s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  > .card {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    cursor: default;
    border-radius: 6px;
    &:nth-child(1) {
      cursor: pointer;
      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
`;
