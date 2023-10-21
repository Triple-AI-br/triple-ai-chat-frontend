import { useState } from "react";
import { useWindowSize } from "../../../utils/useWindowSize";
import {
  ActionButton,
  BrowserWindow,
  Player,
  FirstSectionContainer,
  LeftContainer,
  PlataformGif,
  Subtitle,
  Title,
  VectorImage,
} from "./styled";
import { PlayArrow } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const DESKTOP_WIDTH = 600;

function FirstSection() {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const [openVideo, setOpenVideo] = useState<boolean>(false);

  const isDesktop = width >= DESKTOP_WIDTH;

  return (
    <FirstSectionContainer id="first-section">
      <VectorImage src={isDesktop ? "/VectorDesktop.svg" : "/Vector.svg"} alt="vector image" />
      <LeftContainer>
        <Title
          dangerouslySetInnerHTML={{ __html: t("pages.landing.components.firstSection.title") }}
        ></Title>
        <Subtitle>{t("pages.landing.components.firstSection.subtitle")}</Subtitle>
        <ActionButton
          text={t("pages.landing.components.actionBtn")}
          url="https://calendly.com/eduardotripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>
      </LeftContainer>
      <BrowserWindow $openvideo={openVideo ? 1 : 0} className="hidden hidden_right">
        <div />
        <div />
        <div />
        <Player controls={true}>
          <source src="/videoplataforma.mp4" type="video/mp4" />
        </Player>
        <PlayArrow onClick={() => setOpenVideo((prev) => !prev)} />
        <PlataformGif src="/GIFPlataforma.gif" />
      </BrowserWindow>
    </FirstSectionContainer>
  );
}

export { FirstSection };
