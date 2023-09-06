import { Button } from "antd";
import styled from "styled-components";

export const FirstSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  margin-bottom: 120px;
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 32px;
    gap: 5px;
  }
  @media (min-width: 1280px) {
    position: relative;
    /* overflow: hidden; */
  }
`;

export const Title = styled.h1`
  span {
    color: #367cff;
  }
  color: #3e4352;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 67.5px;
  letter-spacing: -0.67px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0;
  width: 298px;
  height: 249px;
  @media (min-width: 375px) {
    color: #3e4352;
    font-size: 67px;
    width: 376px;
    height: 269px;
    flex-shrink: 0;
  }
  @media (min-width: 900px) {
    text-align: start;
  }
  @media (min-width: 1280px) {
    text-align: start;
    width: 565px;
    height: 130px;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  @media (min-width: 900px) {
    align-items: flex-start;
  }
`;

export const VectorImage = styled.img`
  position: absolute;
  z-index: 0;
  left: -88.5px;
  width: 535px;
  height: 526px;
  overflow: hidden;
  @media (min-width: 600px) {
    left: 0;
    width: 100%;
    /* height: 600px; */
    margin: 0 auto;
  }
  @media (min-width: 900px) {
    flex-shrink: 0;
    right: 0;
    width: 50%;
    left: auto;
    top: 100px;
  }
  @media (min-width: 1280px) {
    top: 10px;
    width: 60%;
  }
`;

export const Subtitle = styled.span`
  color: #535354;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 166.667% */
  letter-spacing: 0.18px;
  width: 288px;
  height: 62px;
  flex-shrink: 0;
  @media (min-width: 375px) {
    font-size: 18px;
    width: 377px;
    height: 92px;
  }
  @media (min-width: 600px) {
    text-align: start;
  }
`;

export const ActionButton = styled(Button)`
  display: inline-block;
  border-radius: 50px;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(56, 93, 255, 0.8) 0%,
    rgba(134, 156, 252, 0.8) 100%
  );
  width: fit-content;
  margin: 0 auto;
  font-size: 16px;
  line-height: 100%;
  @media (min-width: 600px) {
    margin: 0;
  }
`;

export const BrowserWindow = styled.div<{ openvideo: boolean }>`
  max-width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 12px;
  border: 1px solid #e4e6ed;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
  > svg {
    background-color: #367cff;
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    color: #fff;
    border-radius: 50px;
    margin-right: auto;
    z-index: 30;
    cursor: pointer;
    opacity: 0.8;
    opacity: 0;
    transition: 0.5s;
  }
  &:hover {
    > svg {
      display: ${props => (props.openvideo ? "none" : "block")};
      opacity: 1;
    }
  }
  > div:nth-child(1) {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: #c9cbd4;
  }
  > div:nth-child(2) {
    position: absolute;
    top: 10px;
    left: 25px;
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: #c9cbd4;
  }
  > div:nth-child(3) {
    position: absolute;
    top: 10px;
    left: 35px;
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: #c9cbd4;
  }
  > img {
    display: ${props => (props.openvideo ? "none" : "block")};
  }
  > video {
    display: ${props => (props.openvideo ? "block" : "none")};
  }
  @media (min-width: 600px) {
    min-width: min-content;
    margin-right: 0;
  }
  @media (min-width: 1280px) {
    width: 50%;
  }
`;

export const Player = styled.video`
  width: 95%;
  margin: 20px auto 5px auto;
  border-radius: 10px;
  border: none;
  border: 1px solid #e4e6ed;
  z-index: 2;
`;

export const PlataformGif = styled.img`
  width: 95%;
  margin: 15px auto 0px auto;
  border-radius: 10px;
  border: 1px solid #e4e6ed;
  z-index: 2;
  cursor: pointer;
`;
