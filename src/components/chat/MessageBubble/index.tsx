import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment";
import { Avatar, Button, Typography } from "antd";
import { BubbleContainer, BubbleContent, MessageBox, ReferenceContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LOCAL_STORAGE } from "../../../utils/setLanguageToStorage";
interface IMessageBubbleProps {
  markdownText: string;
  float?: "left" | "right";
  references?: string[];
  date_time?: string;
}

const MessageBubble = ({ references, float, markdownText, date_time }: IMessageBubbleProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showReferences, setShowReferences] = useState(false);
  const selectedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE);
  const { t } = useTranslation();

  const maxSteps = references?.length || 0;
  const isLeftDisabled = activeStep === 0;
  const isRightDisabled = activeStep === maxSteps - 1;
  const isBotBubble = float === "left" ? "bot" : "user";

  const handleClickLeft = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) return prevActiveStep;
      return prevActiveStep - 1;
    });
  };

  const handleClickRight = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === maxSteps - 1) return prevActiveStep;
      return prevActiveStep + 1;
    });
  };

  useEffect(() => {
    if (!selectedLanguage) return;
    moment.updateLocale(selectedLanguage, {
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
  }, [selectedLanguage]);

  return (
    <BubbleContainer>
      <BubbleContent $owner={isBotBubble}>
        {isBotBubble === "bot" ? (
          <Avatar
            src="/white-logo.png"
            className="bot_avatar"
            style={{
              backgroundColor: "#0F82FF",
              width: "50px",
              height: "50px",
              position: "absolute",
              left: "-55px",
              top: 0,
              zIndex: 90,
            }}
          />
        ) : null}
        <MessageBox>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </MessageBox>
        {references && references.length ? (
          <ReferenceContainer>
            <div
              onClick={() => setShowReferences((prev) => !prev)}
              style={{
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography color="#606060" style={{ color: "606060" }}>
                {showReferences ? "Hide Sources" : "View Sources"}{" "}
                {showReferences ? `(${activeStep + 1}/${maxSteps})` : null}
              </Typography>
              <InfoOutlinedIcon fontSize="small" sx={{ color: "#999" }} />
            </div>

            {references && references.length && showReferences ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Button
                  icon={
                    <KeyboardArrowLeft
                      sx={{
                        color: isLeftDisabled ? "#ccc" : "#888",
                        cursor: "pointer",
                      }}
                    />
                  }
                  onClick={handleClickLeft}
                  disabled={isLeftDisabled}
                ></Button>
                <Typography.Text strong color="#888">
                  {references?.[activeStep]}
                </Typography.Text>
                <Button
                  icon={
                    <KeyboardArrowRight
                      sx={{
                        color: isRightDisabled ? "#ccc" : "#888",
                        cursor: "pointer",
                      }}
                    />
                  }
                  onClick={handleClickRight}
                  disabled={isRightDisabled}
                ></Button>
              </div>
            ) : null}
          </ReferenceContainer>
        ) : null}
        {date_time && (
          <Typography.Text className="message_time" type="secondary" style={{ fontSize: 12 }}>
            {moment(date_time).fromNow()}
          </Typography.Text>
        )}
      </BubbleContent>
    </BubbleContainer>
  );
};

export { MessageBubble };
