import styled from "styled-components";
import { Input } from "antd";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const { Search } = Input;
export const StyledSearch = styled(Search)`
  width: 70%;
  height: 100px;
  .ant-input-affix-wrapper-lg {
    height: 50px;
  }
  .ant-btn {
    height: 50px;
  }
  input {
    margin-left: 7px;
  }
`;

export const SearchResultItem = styled.div;
