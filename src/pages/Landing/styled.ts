import styled from "styled-components";

export const LandingPageContainer = styled.main`
  /* overflow-x: hidden; */
  background-color: #F8FCFF;
  `;

export const ScrollPage = styled.section`
  height: calc(100% - 52px);
  padding: 0 16px;
  /* overflow-x: hidden; */
  @media (min-width: 600px) {
    padding: 16px;
  }
  
  @media (min-width: 940px) {
    min-height: calc(100vh - 341px);
    padding: 24px 120px;
  }
  @media(min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
    padding: 24px 32px;
  }
`;