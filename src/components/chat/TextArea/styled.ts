import styled from "styled-components";

export const TypeContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const TypeTextArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  textarea {
    width: 100%;
    min-height: 50px;
    max-height: 200px;
    border: none;
    resize: none;
    color: #3e4352;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    padding: 15px 45px 15px 20px;
    line-height: 1;
    /* ===== Chats Scrollbar CSS ===== */
    /* Firefox */
    & {
      scrollbar-width: thin;
      scrollbar-color: #545454 #ffffff;
    }

    /* Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background: #ffffff;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #808080;
      border-radius: 10px;
      border: 3px solid #ffffff;
    }
    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }
    &::placeholder {
      color: #3e435270;
    }
  }
  > .send_icon {
    width: 50px;
    height: 50px;
    position: absolute;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 5px;
    bottom: 0;
    svg {
      font-size: 30px;
      width: 30px;
      height: 30px;
    }
  }
`;
