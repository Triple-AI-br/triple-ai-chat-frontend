import styled from "styled-components";

export const BenefitsContainer = styled.section`
  margin: 0 auto;
  background-color: #6C88FF;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  align-self: stretch;
  padding: 16px;
  text-align: center;
  margin-bottom: 40px;
  @media(min-width: 600px) {
    flex-direction: row;
    padding: 32px;
    gap: 20px;
    align-items: flex-start;
    text-align: start;
  }
`;

export const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0rem;
  max-width: 100%;
  >h2 {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 140% */
    letter-spacing: 0.2px;
  }
  >svg {
    width: 40px;
    height: 40px;
  }
  >span {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
    letter-spacing: 0.16px;
  }
  @media(min-width: 600px) {
    align-items: flex-start;
    max-width: 24%;
    text-align: start;
  }
`;