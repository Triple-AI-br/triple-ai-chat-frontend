import styled from "styled-components";

export const ContractContainer = styled.div`
  width: 100%;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 16px;
  overflow-y: auto;
  @media (min-width: 800px) {
    width: 50%;
    height: 800px;
    padding: 16px 32px;
  }
`;
