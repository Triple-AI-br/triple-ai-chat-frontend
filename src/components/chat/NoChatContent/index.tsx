import { Typography } from "antd";
import { IProject } from "../../../services";
import { ChatBar } from "../ChatBar";
import { NoChatContainer, PromptCard, PromptsContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { AppstoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IPrompt, promptsService } from "../../../services/prompts";

type NoChatContentProps = {
  project?: IProject;
  isDesktop: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoChatContent: React.FC<NoChatContentProps> = ({ project, setCollapsed, isDesktop }) => {
  const { t } = useTranslation();
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

  useEffect(() => {
    (async () => {
      const topPrompts = await promptsService.getTop();
      setPrompts(topPrompts);
    })();
  }, []);
  return (
    <>
      <ChatBar project={project} setCollapsed={setCollapsed} isDesktop={isDesktop} />
      <NoChatContainer>
        <Typography.Title level={3}>{t("pages.chat.selectAChat")}</Typography.Title>
        {prompts.length ? (
          <PromptsContainer>
            <Typography.Text>
              <AppstoreOutlined style={{ fontSize: "50px" }} />
            </Typography.Text>
            <Typography.Text style={{ fontSize: "16px" }}>
              Alguns prompts da sua equipe
            </Typography.Text>
            {prompts.slice(0, 3).map((prompt) => (
              <PromptCard key={prompt.id}>
                <Typography.Title className="prompt_title" level={5}>
                  {prompt.title}
                </Typography.Title>
                <Typography.Text>{prompt.prompt}</Typography.Text>
              </PromptCard>
            ))}
          </PromptsContainer>
        ) : null}
      </NoChatContainer>
    </>
  );
};

export { NoChatContent };
