import { useTranslation } from "react-i18next";
import {
  Container,
  ExamplesContainer,
  MessageList,
  SendMessageIllustration,
  StaticMessage,
} from "./styled";
import TypewriterComponent from "typewriter-effect";

const ExamplesUsage: React.FC = () => {
  const { t } = useTranslation();
  const userParagraph = t("pages.landing.components.examples.prompts", {
    returnObjects: true,
  }) as string[];
  return (
    <Container>
      <ExamplesContainer>
        <MessageList>
          <StaticMessage>{t("pages.landing.components.examples.canYouHelpWith")}</StaticMessage>
          <TypewriterComponent
            options={{
              strings: userParagraph,
              autoStart: true,
              loop: true,
              deleteSpeed: 15,
              delay: 20,
            }}
          />
        </MessageList>
        <SendMessageIllustration src="/send_message_illustration.svg" alt="illustration" />
      </ExamplesContainer>
    </Container>
  );
};

export { ExamplesUsage };
