import { Card } from "antd";
import styled from "styled-components";

export const CardStyled = styled(Card)`
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
    cursor: pointer;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
  }
  width: 100%;
  @media (min-width: 800px) {
    width: auto;
  }
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
