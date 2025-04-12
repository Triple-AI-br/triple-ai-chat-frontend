import styled from "styled-components";

export const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #3e4352;
  margin-bottom: 30px;
  @media (min-width: 600px) {
    margin-bottom: 60px;
    > div:nth-child(1) {
      > div:nth-child(1) {
        width: 35%;
      }
    }
    > div:nth-child(1) {
      > div:nth-child(2) {
        width: 65%;
      }
    }
    > div:nth-child(2) {
      > div:nth-child(1) {
        width: 65%;
      }
    }
    > div:nth-child(2) {
      > div:nth-child(2) {
        width: 35%;
      }
    }
  }
  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
    padding: 40px 32px;
  }
`;

export const Card = styled.div`
  border-radius: 27px;
  background: #edeff7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  h2 {
    z-index: 1;
    align-self: flex-start;
  }
  @media (min-width: 600px) {
    text-align: start;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const WorksContainer = styled.div`
  background-color: #f1f2f9;
  border: 1px solid #e3e4ea;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 19px;
  text-align: start;
  > div {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 8px;
  }
  > div:nth-child(2) {
    background-color: #e4e6ed;
    border-radius: 19px;
  }
`;

export const SecurityContainer = styled.div`
  background-color: #f1f2f9;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 19px;
  gap: 10px;
  border: 1px solid #e3e4ea;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: start;
    padding: 10px;
    gap: 15px;
    > h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
    }
    > img {
      height: 50px;
      width: 50px;
      object-fit: contain;
      background-color: #edeff7;
      border-radius: 50px;
      padding: 10px;
      background-color: #fff;
    }
  }
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    > div {
      flex-direction: column;
      align-items: center;
      height: 100%;
      text-align: center;
    }
  }
`;

export const IconsSession = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  rotate: -30deg;
  bottom: 10px;
  right: -60px;
  grid-gap: 5px;
  > img {
    width: 100px;
  }
  @media (min-width: 600px) {
    display: none;
  }
  @media (min-width: 1000px) {
    display: grid;
  }
`;

export const ScreenShotImage = styled.img`
  margin: 0 auto;
  z-index: 1;
  margin-top: 20px;
  margin-bottom: 260px;
  width: 65%;
  border-radius: 5px;
  @media (min-width: 600px) {
    margin-bottom: 0;
    width: 220px;
  }
  @media (min-width: 1000px) {
    width: 180px;
    margin-left: 10%;
    margin-right: auto;
    margin-bottom: 0;
  }
`;

export const Circle = styled.div`
  width: 90%;
  aspect-ratio: 1 / 1;
  position: absolute;
  border-radius: 50%;
  background-color: rgba(56, 93, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  top: 120px;
  z-index: 0;
  > div {
    width: 80%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: rgba(134, 156, 252, 0.7);
  }
  @media (min-width: 1000px) {
    width: auto;
    height: 75%;
    margin: 0;
    left: 5%;
  }
`;

export const DottedBackground = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  background-image: radial-gradient(#d2d6db 1px, transparent 1px);
  background-position:
    0 0,
    1px 1px;
  background-size: 10px 10px;
  z-index: 0;
`;

export const PromptImg = styled.img`
  width: 100%;
  z-index: 1;
  border-radius: 12px;
  border: 1px solid #edeff7;
  margin-bottom: 30px;
  @media (min-width: 600px) {
    width: 100%;
    background-color: red;
  }
`;
