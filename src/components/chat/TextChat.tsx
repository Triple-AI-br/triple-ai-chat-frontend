import { Box } from "@mui/material";
import { TextArea } from "./TextArea";
import { Forward as SendIcon } from "@mui/icons-material";
import { ICustomerData } from "../../redux/authenticationSlice";

interface ITextChatProps {
    currentMessage: string;
    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    handleEnterPressed(e: React.KeyboardEvent<Element>): void;
    handleSendMessage(): Promise<void>;
    customerData?: ICustomerData;
}
const TextChat = ({
  currentMessage,
  handleChange,
  handleEnterPressed,
  handleSendMessage,
  customerData,
}: ITextChatProps) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      sx={{
        backgroundColor: "white",
        borderTop: "1px solid #ccc",
      }}
    >
      <TextArea
        autoFocus
        value={currentMessage}
        onChange={handleChange}
        onKeyDown={handleEnterPressed}
      />
      <Box
        onClick={handleSendMessage}
        sx={{
          borderRadius: 1,
          backgroundColor: customerData?.main_color,
          cursor: "pointer",
          p: 1.5,
          my: 1,
          mr: 1,
        }}
      >
        <SendIcon
          sx={{
            transform: "rotate(-90deg)",
            color: "#fff",
          }}
        />
      </Box>
    </Box>
  );
};
export { TextChat };
