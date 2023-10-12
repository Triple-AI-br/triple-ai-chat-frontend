/* eslint-disable indent */
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ChatCard, ChatTitle } from "./styled";
import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/authenticationSlice";

interface IChatItemProps {
  id: number;
  email?: string;
  subtitle: string;
  date: string;
  isSelected: boolean;
  onClick({ sessionId }: { sessionId: number }): void;
  onDelete({ sessionId }: { sessionId: number }): Promise<void>;
  anonymous?: boolean;
}

const ChatItem = ({
  id,
  subtitle,
  isSelected,
  anonymous,
  email,
  onClick: handleClick,
  onDelete: handleDelete,
}: IChatItemProps) => {
  const userData = useAppSelector(selectUserData);
  const isSuperUser = userData && userData.is_superuser;
  return (
    <ChatCard
      onClick={() => handleClick({ sessionId: id })}
      $isSelected={isSelected ? 1 : 0}
      $isSuperUser={isSuperUser ? 1 : 0}
    >
      <ChatBubbleOutlineOutlinedIcon style={{ color: "#3E4352", width: "16px", height: "16px" }} />
      <ChatTitle $isSelected={isSelected ? 1 : 0} $isSuperUser={isSuperUser ? 1 : 0}>
        {subtitle}
        <div className="grandient"></div>
      </ChatTitle>
      {!anonymous && isSelected ? (
        <DeleteOutlined
          className="delete_btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete({ sessionId: id });
          }}
          style={{
            cursor: "pointer",
            color: "#3E4352",
            width: 20,
          }}
        />
      ) : null}
      {isSuperUser ? (
        <Typography.Link style={{ display: "block", width: "100%" }}>{email}</Typography.Link>
      ) : null}
    </ChatCard>
  );
};

export { ChatItem };
