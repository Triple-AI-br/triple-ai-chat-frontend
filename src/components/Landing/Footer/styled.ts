import { Button } from "antd";
import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  @media(min-width: 600px) {
    align-items: stretch;
    order: 0;
    >:nth-child(1) {
      display: none;
    }
  }
`;

export const ActionButton = styled(Button)<{actiontype: string}>`
		display: inline-block;
		font-weight: 600;
		font-size: 16px;
    line-height: 100%;
		border-radius: 50px;
		border: none;
    color: ${props => props.actiontype === "secondary" ? "#000" : "#fff" };
		background: ${props => props.actiontype === "secondary" ? "linear-gradient(180deg, rgba(206, 215, 254, 0.80) 0%, rgba(209, 209, 209, 0.80) 100%)" : "linear-gradient(180deg, rgba(56, 93, 255, 0.80) 0%, rgba(134, 156, 252, 0.80) 100%)"};
`;

export const SocialMidias = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
  >svg {
    width: 40px;
    height: 40px;
    color: #6c88ff;
    cursor: pointer;
  }
  @media(min-width: 600px) {
    order: 2;
    margin: 0;
	}
`;

export const LogoImg = styled.img`
	height: 45px;
	@media(min-width: 600px) {
    order: 1;
	}
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #565B58;
  opacity: 0.4;
  margin: 20px 0;
  @media(min-width: 600px) {
    display: none;
	}
`;

export const RightsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  >span {
    color: #1B1B1B59;
    @media(min-width: 600px) {
    order: 0;
	  }
  }
  >span:nth-child(2) {
    color: #7B827D;
    @media(min-width: 600px) {
    order: 2;
	  }
  }
  @media(min-width: 600px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin: 30px 0;
    >div {
      height: 1px;
      flex-grow: 1;
      background-color: #565B58;
      opacity: 0.4;
      margin: 20px 0;
    }
	}
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media(min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;