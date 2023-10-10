/* eslint-disable indent */
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Clear as DeleteIcon } from "@mui/icons-material";
import { useAppSelector } from "../../../redux/hooks";
import { selectIsSuperUser } from "../../../redux/authenticationSlice";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { LANGUAGE_LOCAL_STORAGE } from "../../../utils/setLanguageToStorage";
import { useTranslation } from "react-i18next";
import { ChatCard } from "./styled";

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
  email,
  subtitle,
  date,
  isSelected,
  anonymous,
  onClick: handleClick,
  onDelete: handleDelete,
}: IChatItemProps) => {
  const { t } = useTranslation();
  const [cardDate, setCardDate] = useState<string>(moment(date).fromNow());
  const isSuperUser = useAppSelector(selectIsSuperUser);
  const selectedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE);

  useEffect(() => {
    if (!selectedLanguage) return;
    moment.defineLocale(selectedLanguage, {
      relativeTime: {
        future: t("global.relativeTime.future"),
        past: t("global.relativeTime.past"),
        s: t("global.relativeTime.s"),
        m: t("global.relativeTime.m"),
        mm: t("global.relativeTime.mm"),
        h: t("global.relativeTime.h"),
        hh: t("global.relativeTime.hh"),
        d: t("global.relativeTime.d"),
        dd: t("global.relativeTime.dd"),
        M: t("global.relativeTime.M"),
        MM: t("global.relativeTime.MM"),
        y: t("global.relativeTime.y"),
        yy: t("global.relativeTime.yy"),
      },
    });

    setCardDate(moment(date).fromNow());
  }, [selectedLanguage]);

  //"#e0e0e0"
  return (
    <ChatCard onClick={() => handleClick({ sessionId: id })} $isSelected={isSelected ? 1 : 0}>
      <ChatBubbleOutlineOutlinedIcon />
      <Box display="flex" flexDirection="column" gap={0} width="100%">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography color="#555">AI Chatbot</Typography>
          <Typography fontSize={12} color="#999">
            {cardDate}
          </Typography>
        </Box>
        {isSuperUser && email ? (
          <Typography fontWeight={600} fontSize={14} color="#888">
            {email}
          </Typography>
        ) : null}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            fontSize={14}
            color="#888"
          >
            {subtitle}
          </Typography>
          {!anonymous ? (
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                handleDelete({ sessionId: id });
              }}
              sx={{
                cursor: "pointer",
                color: "#f88",
                width: 20,
                ml: 3,
              }}
            />
          ) : null}
        </Box>
      </Box>
    </ChatCard>
  );
};

export { ChatItem };
