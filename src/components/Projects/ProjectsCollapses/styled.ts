import { Collapse } from "antd";
import styled from "styled-components";

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 15px;
  margin: 15px 0;
  @media (min-width: 800px) {
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    border-radius: 14px;
    /* background-color: red; */
  }
  .ant-collapse-content-box {
    background: white;
  }
`;
