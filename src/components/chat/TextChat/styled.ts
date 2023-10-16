import styled from "styled-components";

export const TextChatContainer = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 0;
  background: rgb(248, 252, 255);
  padding: 40px 20px 20px 20px;
  background: linear-gradient(
    0deg,
    rgba(248, 252, 255, 1) 0%,
    rgba(248, 252, 255, 1) 50%,
    rgba(248, 252, 255, 0) 100%
  );
`;
