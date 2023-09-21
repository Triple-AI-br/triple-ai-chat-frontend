import styled from "styled-components";

export const SelectorContainer = styled.div<{ language: number }>`
  display: flex;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  img {
    height: 30px;
    border-bottom: 2px solid transparent;
    padding-bottom: 5px;
    cursor: pointer;
  }
  > img:nth-child(${(props) => props.language}) {
    border-bottom: 2px solid #367cff;
  }
  @media (min-width: 600px) {
    gap: 10px;
    img {
      height: 24px;
    }
  }
`;
