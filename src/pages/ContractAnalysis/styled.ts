import styled from "styled-components";

export const AnalysisContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ContractContainer = styled.div`
  width: 100%;
  display: flex;
  height: 500px;
  flex-direction: column;
  @media (min-width: 1000px) {
    width: 50%;
    height: 90svh;
    padding: 0 32px;
    position: sticky;
    top: 0;
  }
`;

export const Page = styled.div`
  width: 100%;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  @media (min-width: 1000px) {
    padding: 16px 32px;
  }
`;

export const SelectedTextContainer = styled.div`
  width: 100%;
  padding: 16px;
`;
