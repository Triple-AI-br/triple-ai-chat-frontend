import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  @media (min-width: 800px) {
    width: 50%;
  }
`;

export const ToolContent = styled.div`
  width: 100%;
  max-height: 800px;
  overflow-y: auto;
  padding: 32px;
`;
