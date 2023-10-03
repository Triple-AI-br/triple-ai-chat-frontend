import { PopupButton } from "react-calendly";
import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0%{
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
  }

  100%{
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
  }

`;

export const LoginPageBackground = styled.main`
  background: url("/loggin_background.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.section`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  max-width: 800px;
  max-height: 600px;
  display: flex;
  > div:nth-child(1) {
    display: none;
  }
  @media (min-width: 800px) {
    > div:nth-child(1) {
      display: inline-block;
    }
  }
`;

export const LeftVisualContainer = styled.div`
  width: 50%;
  height: 100%;
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  position: relative;
  border-radius: 4px 0 0 4px;
`;

export const Circles = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: ${animate} 25s linear infinite;
    bottom: -150px;
  }

  > li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  > li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  > li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  > li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  > li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  > li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  > li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  > li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  > li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  > li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }
`;

export const LeftCallToAction = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  h3 {
    font-size: 24px;
    color: #fff;
    opacity: 0.8;
  }
  span {
    color: #f9f9f9;
    opacity: 0.9;
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
  background: linear-gradient(180deg, rgba(255, 93, 255, 0.8) 0%, rgba(134, 156, 252, 0.8) 100%);
  width: fit-content;
  font-size: 16px;
`;
