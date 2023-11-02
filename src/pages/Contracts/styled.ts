import styled from "styled-components";

export const TabContainer = styled.div``;

export const ContractsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #3e4352;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
`;
