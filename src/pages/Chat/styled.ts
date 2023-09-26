import styled from "styled-components";

export const LeftContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  min-width: 300px;
  max-width: 32%;
  border-right: 1px solid #ccc;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  > :hover {
    ::-webkit-scrollbar {
      display: block !important;
    }
    scrollbar-width: auto; /* Firefox */
  }
`;
