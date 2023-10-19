import styled from "styled-components";

export const ScrollPage = styled.section`
  background-color: #f8fcff;
  height: calc(100% - 52px);
  padding: 0 16px;
  overflow-x: hidden;

  @media (min-width: 600px) {
    padding: 16px;
    overflow: visible;
  }

  @media (min-width: 940px) {
    min-height: calc(100svh - 341px);
    padding: 24px 120px;
    overflow: visible;
  }
  @media (min-width: 1280px) {
    padding: 0;
    overflow: visible;
  }
`;
