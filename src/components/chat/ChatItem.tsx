/* eslint-disable indent */
import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Clear as DeleteIcon } from "@mui/icons-material";
import { useAppSelector } from "../../redux/hooks";
import { ICustomerData, selectIsSuperUser } from "../../redux/authenticationSlice";
import { LANGUAGE_LOCAL_STORAGE } from "../../utils/setLanguageToStorage";
import { useTranslation } from "react-i18next";

interface IChatItemProps {
  id: number;
  email?: string;
  subtitle: string;
  date: string;
  isSelected: boolean;
  onClick({ sessionId }: { sessionId: number }): void;
  onDelete({ sessionId }: { sessionId: number }): Promise<void>;
  customerData?: ICustomerData | null;
}

const ChatItem = ({
  id,
  email,
  subtitle,
  date,
  isSelected,
  onClick: handleClick,
  onDelete: handleDelete,
  customerData,
}: IChatItemProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [cardDate, setCardDate] = useState<string>(moment(date).fromNow());
  const isSuperUser = useAppSelector(selectIsSuperUser);
  let backgroundColor: string;
  const selectedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE);

  if (isSelected) backgroundColor = "#eee";
  else if (isHovered) backgroundColor = "#f6f6f6";
  else backgroundColor = "#fff";

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
    <Box
      display="flex"
      px={3.5}
      py={2}
      gap={2}
      marginBottom="5px"
      borderBottom="1px solid #e5e5e5"
      borderRadius="4px"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => handleClick({ sessionId: id })}
      sx={{ backgroundColor, cursor: "pointer" }}
    >
      <Avatar
        src={customerData?.logo_url}
        sx={{
          backgroundColor: customerData?.main_color,
          width: 45,
          height: 45,
          border: "1px solid #e5e5e5",
        }}
      />
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
          <DeleteIcon
            onClick={
              isHovered
                ? (e) => {
                    e.stopPropagation();
                    handleDelete({ sessionId: id });
                  }
                : undefined
            }
            sx={{
              cursor: isHovered ? "pointer" : undefined,
              color: isHovered ? "#f88" : backgroundColor,
              width: 20,
              ml: 3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { ChatItem };
