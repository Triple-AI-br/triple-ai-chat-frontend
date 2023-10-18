import { TextAreaComponent } from "../TextArea";
import { ICustomerData } from "../../../redux/authenticationSlice";
import { TextChatContainer } from "./styled";

interface ITextChatProps {
  currentMessage: string;
  handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
  handleEnterPressed(e: React.KeyboardEvent<Element>): void;
  handleSendMessage(): Promise<void>;
  customerData?: ICustomerData | null;
}
const TextChat = ({
  currentMessage,
  handleChange,
  handleEnterPressed,
  handleSendMessage,
}: ITextChatProps) => {
  return (
    <TextChatContainer>
      <TextAreaComponent
        value={currentMessage}
        onChange={handleChange}
        onKeyDown={handleEnterPressed}
        handleSendMessage={handleSendMessage}
      />
    </TextChatContainer>
  );
};
export { TextChat };
