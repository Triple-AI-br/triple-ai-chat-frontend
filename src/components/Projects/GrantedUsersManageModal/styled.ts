import { Modal } from "antd";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  h4 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
  }
  @media (min-width: 800px) {
    width: 90% !important;
    max-width: 800px;
  }
`;

export const PopoverCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;
