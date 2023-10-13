/* eslint-disable indent */
// import { TextareaAutosize, TextareaAutosizeProps } from "@mui/base";

import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { TypeContent, TypeTextArea } from "./styled";

type TextAreaComponentProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<Element>) => void;
  handleSendMessage: () => Promise<void>;
  value: string;
};

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  onChange,
  onKeyDown,
  handleSendMessage,
  value,
}) => {
  const { t } = useTranslation();

  const chatInput = document.querySelector("#chat-input") as HTMLTextAreaElement | null;
  const initialInputHeight = 50;

  chatInput?.addEventListener("input", () => {
    chatInput.style.height = `${initialInputHeight}px`;

    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  return (
    <TypeContent>
      <TypeTextArea>
        <textarea
          id="chat-input"
          onKeyDown={onKeyDown}
          rows={1}
          onChange={(e) => onChange(e)}
          value={value}
          autoFocus={true}
          placeholder={t("pages.chat.components.inputPlaceHolder")}
        ></textarea>
        <Button
          onClick={handleSendMessage}
          className="send_icon"
          icon={<SendOutlined style={{ color: "#8E8EA0" }} />}
          type="text"
        ></Button>
      </TypeTextArea>
    </TypeContent>
  );
};

export { TextAreaComponent };
