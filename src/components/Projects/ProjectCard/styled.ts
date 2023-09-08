import { Card } from "antd";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  transition: all 0.1s ease-in-out;
  min-width: 180px;
  &:hover {
    transform: translate3D(0,-1px,0) scale(1.03);
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #3e4352;
  justify-content: space-between;
`;

export const PrivateProjectTag = styled.div`
  color: #FF8C00 !important;
  opacity: 0.9;
  font-size: 13px;
  >span {
    margin-right: 4px;
  }
`;