import styled from "styled-components";

export const ListUserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  h1 {
    align-self: flex-start;
    font-size: 22px;
    color: #3e4352;
  }
`;

export const PermissionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  h2 {
    font-size: 16px;
    color: #3e4352;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const ListFooter = styled.h3`
  font-size: 14px;
  color: #3e4352;
  font-weight: 400;
  span {
    font-weight: 600;
    font-size: 14px;
  }
`;
