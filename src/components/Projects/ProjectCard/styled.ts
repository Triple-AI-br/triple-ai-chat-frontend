import { Card } from "antd";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  transition: all .4 ease-in-out;
  min-width: 180px;
  &:hover {
    transform: translate3D(0,-1px,0) scale(1.03);
    cursor: pointer;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #3e4352;
  justify-content: space-between;
`;

export const PrivateProjectTag = styled.div`
  color: #FF8C00 !important;
  opacity: 0.8;
  font-size: 12px;
  >span {
    margin-right: 4px;
  }
`;