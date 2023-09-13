import { Card } from "antd";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
    cursor: pointer;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
  }
  width: 100%;
  @media (min-width: 800px) {
    width: calc(20% - 15px);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #3e4352;
  justify-content: space-between;
  h4 {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg {
    color: #ff8c00 !important;
    opacity: 0.9;
    font-size: 13px;
  }
`;
