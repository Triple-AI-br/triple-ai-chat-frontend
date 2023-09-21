import styled from "styled-components";
import { PopupButton } from "react-calendly";

export const HeaderContainer = styled.section`
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 24px;
  margin: 0 auto;
  z-index: 21;
  @media (min-width: 600px) {
    position: sticky;
    top: 0;
    gap: 20px;
    background: rgba(248, 252, 255, 0.5);
    border-radius: 0 0 16px 16px;
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
    border: 1px solid rgba(248, 252, 255, 0.3);
  }
  @media (min-width: 1280px) {
    width: 1280px;
    margin: 0 auto;
    padding: 24px 32px;
  }
`;

export const LogoImg = styled.img`
  height: 45px;
`;

export const NavElements = styled.ul`
  display: none;
  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    > li {
      cursor: pointer;
      display: block;
      white-space: nowrap;
      > a {
        color: #3e4352;
        text-decoration: none;
      }
    }
  }
`;

export const ActionButton = styled(PopupButton)`
  display: inline-block;
  border-radius: 50px;
  border: none;
  color: #fff;
  font-weight: 600;
  pointer-events: all;
  z-index: 20;
  padding: 10px 15px;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(56, 93, 255, 0.8) 0%, rgba(134, 156, 252, 0.8) 100%);
  width: fit-content;
  margin: 0 auto;
  font-size: 16px;
  line-height: 100%;
  @media (min-width: 600px) {
    margin: 0;
  }
`;

export const ActionContainer = styled.div`
  display: "flex";
  gap: 10;
  align-items: "center";
  > button {
    display: none;
  }
  > svg {
    cursor: pointer;
    display: inline-block;
  }
  :nth-child(3) {
    display: none;
  }
  @media (min-width: 800px) {
    :nth-child(3) {
      white-space: nowrap;
      display: flex;
    }
    > button {
      display: inline-block;
    }
    > svg {
      display: none;
    }
  }
`;
