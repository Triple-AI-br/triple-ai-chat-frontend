import styled from "styled-components";

// isSelected 1 for true, isSelected 0 for false
export const ChatCard = styled.div<{ $isSelected?: number }>`
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => (props.$isSelected === 1 ? "#eee" : "#fff")};
  cursor: pointer;
  :hover {
    background-color: #f6f6f6;
  }
`;
