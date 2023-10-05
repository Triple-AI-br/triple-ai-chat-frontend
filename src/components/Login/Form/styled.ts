import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 100%;
    .ant-input-affix-wrapper-focused {
      border: 1px solid #367cff !important;
    }
    button {
      background-color: #367cff;
    }
  }
  @media (min-width: 800px) {
    width: 50%;
    padding: 48px;
  }
`;

export const Logo = styled.img`
  width: 160px;
  align-self: center;
  margin-bottom: 40px;
`;
