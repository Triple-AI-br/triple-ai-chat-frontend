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

const DESKTOP_WIDTH = 600;

function FirstSection() {
  const { width } = useWindowSize();

  const [openVideo, setOpenVideo] = useState(false);

  const isDesktop = width >= DESKTOP_WIDTH;

  return (
    <FirstSectionContainer id="first-section">
      <VectorImage src={isDesktop ? "/VectorDesktop.svg" : "/Vector.svg"} alt="vector image" />
      <LeftContainer>
        <Title>
          CRIE O <span>CHATGPT</span> DA SUA EMPRESA
        </Title>
        <Subtitle>
          Automatize tarefas operacionais e torne sua empresa mais eficiente com o nosso copiloto
          inteligente.
        </Subtitle>
        <ActionButton
          text="Quero falar com um especialista!"
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>
      </LeftContainer>
      <BrowserWindow openvideo={openVideo}>
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
