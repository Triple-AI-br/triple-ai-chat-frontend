import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ContractsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
  }
`;
