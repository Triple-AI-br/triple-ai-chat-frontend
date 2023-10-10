import styled from "styled-components";

// LeftTopBar

export const LeftTopBarContainer = styled.div<{ $customerColor?: string }>`
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.$customerColor};
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 15px;
  .customer_container {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 10px;
  }
`;
