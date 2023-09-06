import styled from "styled-components";

export const LandingPageContainer = styled.main`
  background-color: #F8FCFF;
  overflow: hidden;
  @media (min-width: 600px) {
    overflow: visible;
  }
  `;

export const ScrollPage = styled.section`
  height: calc(100% - 52px);
  padding: 0 16px;
  overflow: hidden;

  @media (min-width: 600px) {
    padding: 16px;
    overflow: visible;
  }

  @media (min-width: 940px) {
    min-height: calc(100vh - 341px);
    padding: 24px 120px;
    overflow: visible;

  }
  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
    padding: 24px 32px;
    overflow: visible;

  }
`;
