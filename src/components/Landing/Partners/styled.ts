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
    gap: 40px;
    margin-bottom: 80px;
  }
  @media (min-width: 1280px) {
    margin: 40px auto;
    padding: 40px 32px;
  }
`;

export const List = styled.ul`
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  > li {
    list-style: none;
    width: 100%;
    max-width: 150px;
    > img {
      width: 100%;
    }
  }
  @media (min-width: 600px) {
    max-width: 600px;
    flex-direction: row;
    justify-content: space-evenly;
    > li {
      list-style: none;
      width: 30%;
      max-width: 120px;
      > img {
        width: 100%;
      }
    }
  }
`;
