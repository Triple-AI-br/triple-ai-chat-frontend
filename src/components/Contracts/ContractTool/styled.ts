import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    width: 40%;
    flex: 1;
  }
`;

export const ToolContent = styled.div`
  width: 100%;
  padding: 32px 0;
`;

export const FileNameContainer = styled.div`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;
