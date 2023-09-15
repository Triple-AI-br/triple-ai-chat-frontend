import styled from "styled-components";

export const PartnersListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 24px;
  gap: 20px;
  margin-bottom: 40px;
  h2 {
    color: #3e4352;
    font-size: 24px;
  }
  @media (min-width: 600px) {
    background-color: #fff;
    gap: 40px;
    margin-bottom: 80px;
  }
  @media (min-width: 1280px) {
    margin: 0 auto;
    padding: 24px 32px;
  }
`;

export const List = styled.ul`
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > li {
    list-style: none;
    width: 30%;
    max-width: 120px;
    > img {
      width: 100%;
    }
  }
  @media (min-width: 600px) {
    max-width: 600px;
    justify-content: space-evenly;
  }
`;
