import styled from "styled-components";

export const ContractContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1000px) {
    width: 50%;
    padding: 0 32px;
  }
`;

export const Page = styled.div`
  min-width: 100%;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 16px;
  overflow-y: auto;
  height: 500px;
  @media (min-width: 1000px) {
    height: 800px;
    padding: 16px 32px;
  }
`;

export const AnalysisContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const SelectedTextContainer = styled.div`
  width: 100%;
  padding: 16px;
`;
