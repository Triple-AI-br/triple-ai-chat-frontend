import { Collapse } from "antd";
import styled from "styled-components";

export const CollapseStyled = styled(Collapse)<{ $length: number }>`
  height: 100%;
  > .ant-collapse-item {
    position: sticky;
    background-color: #f5f5f5 !important;
  }
  > .ant-collapse-item:nth-child(1) {
    top: 0 !important;
  }
  > .ant-collapse-item:nth-child(2) {
    bottom: 0 !important;
  }
  .ant-collapse-item-active {
    max-height: ${(props) => (props.$length === 1 ? "100%" : "50%")};
    padding-bottom: 40px;
    overflow-y: scroll;
    position: relative;
    /* This will work in Chrome / Edge / Safari / Opera. Firefox doesn't support scroll styling. Hope it helps! */
    &::-webkit-scrollbar {
      width: 10px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      width: 15px;
      background-color: transparent !important;
    }
    &::-webkit-scrollbar-track {
      width: 15px;
      background-color: transparent !important;
    }
    &:hover {
      &::-webkit-scrollbar {
        width: 10px;
        opacity: 1;
      }
      &::-webkit-scrollbar-thumb {
        width: 15px;
        background-color: gray !important;
        border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        width: 15px;
        background-color: transparent !important;
      }
    }
    > .ant-collapse-header:nth-child(n) {
      position: sticky;
      top: 0;
      border-radius: 12px;
      background-color: #f5f5f5;
      z-index: 90;
    }
  }
`;

export const ChatsScroll = styled.div``;
