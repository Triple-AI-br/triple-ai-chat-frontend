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

export const AnalysisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
