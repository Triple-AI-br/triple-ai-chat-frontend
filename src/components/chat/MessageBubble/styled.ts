import styled from "styled-components";

export const BubbleContainer = styled.div`
  width: 100%;
  display: inline-block;
  padding: 20px 0;
  position: relative;
`;

export const BubbleContent = styled.div<{ $owner: "bot" | "user" }>`
  max-width: 75%;
  background-color: ${(props) => (props.$owner === "user" ? "rgba(0, 24, 53, 0.06)" : "#0F82FF")};
  border-radius: 20px;
  border-bottom-right-radius: ${(props) => (props.$owner === "user" ? "0" : "20")};
  border-top-left-radius: ${(props) => (props.$owner === "user" ? "20" : "0")};
  color: ${(props) => (props.$owner === "user" ? "#3E4352" : "#FFF")};
  float: ${(props) => (props.$owner === "user" ? "right" : "left")};
  position: relative;
  margin-left: none;
  a {
    color: ${(props) => (props.$owner === "user" ? "#3E4352" : "#FFF")};
    text-decoration: underline;
  }
  > .message_time {
    position: absolute;
    height: 20px;
    bottom: -20px;
    right: ${(props) => (props.$owner === "user" ? "0" : "auto")};
    left: ${(props) => (props.$owner === "user" ? "auto" : "0")};
  }
  > .bot_avatar {
    display: none;
  }
  @media (min-width: 800px) {
    margin-left: ${(props) => (props.$owner === "user" ? "none" : "55px")};
    padding: 5px 3px;
    > .bot_avatar {
      display: block;
    }
  }
`;
