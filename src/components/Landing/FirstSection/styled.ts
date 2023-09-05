import { Button } from "antd";
import styled from "styled-components";

export const FirstSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  margin-bottom: 30px;
  @media(min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 32px;
  }
  @media(min-width: 1280px) {
    position: relative;
    overflow: hidden;
  }
`;

export const Title = styled.h1`
    span {
      color: #367CFF;
    }
    color: #3E4352;
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
  @media(min-width: 375px) {
    color: #3E4352;
    font-size: 67px;
    width: 376px;
    height: 269px;
    flex-shrink: 0;
  }
  @media(min-width: 600px) {
    text-align: start;
  }
  @media(min-width: 1280px) {
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
  @media(min-width: 600px) {
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
  @media(min-width: 600px) {
    flex-shrink: 0;
    right: 0;
    width: 50%;
    left: auto;
    top: 100px;
  }
  @media(min-width: 1280px) {
    top: -30px;
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
  @media(min-width: 375px) {
    font-size: 18px;
    width: 377px;
    height: 92px;
  }
  @media(min-width: 600px) {
    text-align: start;
  }
`;

export const ActionButton = styled(Button)`
		display: inline-block;
		border-radius: 50px;
		border: none;
		background: linear-gradient(180deg, rgba(56, 93, 255, 0.80) 0%, rgba(134, 156, 252, 0.80) 100%);
    width: fit-content;
    margin: 0 auto;
	@media(min-width: 600px) {
    margin: 0;
	}
`;

export const PlataformGif = styled.div`
  width: 336.686px;
  max-width: 100%;
  height: 300px;
  background: url('https://cdn.discordapp.com/attachments/888025163139002382/1148380750614380676/image_1.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 20px;
  @media(min-width: 600px) {
    width: 336.686px;
    height: 300px;
  }
  @media(min-width: 1280px) {
    width: 40%;
  }
`;