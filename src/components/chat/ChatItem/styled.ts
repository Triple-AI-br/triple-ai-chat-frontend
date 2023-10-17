import { Typography } from "antd";
import styled from "styled-components";

// isSelected 1 for true, isSelected 0 for false
export const ChatCard = styled.div<{ $isSelected?: number; $isSuperUser: number }>`
  width: 100%;
  padding: 17px 10px;
  border-radius: 6px;
  background-color: ${(props) => (props.$isSelected === 1 ? "#eee" : "#fff")};
  cursor: pointer;
  display: flex;
  flex-wrap: ${(props) => (props.$isSuperUser ? "wrap" : "nowrap")};
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  &:hover {
    background-color: #f6f6f6;
    .gradient {
      background: rgb(246, 246, 246);
      background: linear-gradient(90deg, rgba(246, 246, 246, 0) 0%, rgba(246, 246, 246, 1) 50%);
    }
  }
  > .delete_btn {
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ChatTitle = styled(Typography.Text)<{ $isSelected?: number; $isSuperUser: number }>`
  overflow: hidden;
  width: ${(props) => (props.$isSuperUser === 1 ? "calc(100% - 56px)" : "calc(100% - 26px)")};
  white-space: nowrap;
  line-height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  > .gradient {
    position: absolute;
    right: 0;
    top: 0;
    height: 30px;
    width: 40px;
    background: ${(props) =>
      props.$isSelected === 1 ? "rgb(238,238,238);" : "rgb(255, 255, 255);"};
    background: ${(props) =>
      props.$isSelected === 1
        ? "linear-gradient(90deg, rgba(238,238,238,0) 0%, rgba(238,238,238,1) 50%);"
        : "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);"};
  }
`;
