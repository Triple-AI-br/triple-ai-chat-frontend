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

  .ant-modal-content {
    @media (max-width: 576px) {
      padding: 16px;
    }
  }

  .ant-modal-body {
    @media (max-width: 576px) {
      padding: 12px 0;
    }
  }

  .ant-transfer {
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .ant-transfer-list {
    @media (max-width: 576px) {
      width: 100% !important;
      margin-bottom: 12px;
    }
  }

  .ant-form-inline {
    @media (max-width: 576px) {
      flex-direction: column;

      .ant-form-item {
        width: 100%;
        margin-right: 0;
        margin-bottom: 12px;
      }
    }
  }
`;

export const PopoverCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 576px) {
    justify-content: center;

    .ant-pagination-options {
      display: none;
    }
  }
`;

export const FormContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 576px) {
    margin-top: 10px;
  }
`;
