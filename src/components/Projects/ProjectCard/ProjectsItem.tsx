import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { Tooltip, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CardContainer, TitleContainer } from "./styled";
import { IProject } from "../../../services";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/authenticationSlice";
import { useTranslation } from "react-i18next";

interface IProjectProps {
  onClick(): void;
  onEdit(arg: IProject): void;
  project: IProject;
  confirmRemoveProjectModal: (id: number | string, title: string) => void;
}

const ProjectsItem = ({ project, onClick, onEdit, confirmRemoveProjectModal }: IProjectProps) => {
  const { t } = useTranslation();
  const userData = useAppSelector(selectUserData);
  const navigate = useNavigate();

  const { id, title, description, is_public, user_owner } = project;
  const isOwner = userData?.id === user_owner.id;
  const isSuperUser = userData?.is_superuser;

  const { Paragraph } = Typography;

  return (
    <CardContainer
      onClick={onClick}
      size="small"
      bordered={true}
      actions={[
        <Tooltip title={t("global.settings")} key="setting" placement="bottom">
          <SettingOutlined
            onClick={(e) => {
              e.stopPropagation();
              navigate(routesManager.getSourcesRoute(id));
            }}
          />
        </Tooltip>,
        <Tooltip title={t("global.edit")} key="edit" placement="bottom">
          <EditOutlined
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
          />
        </Tooltip>,
        <Tooltip title={t("global.search")} key="search" placement="bottom">
          <SearchOutlined
            onClick={(e) => {
              e.stopPropagation();
              navigate(routesManager.getSearchRoute(id));
            }}
          />
        </Tooltip>,
        ...(isOwner || isSuperUser
          ? [
              <Tooltip title={t("global.delete")} key="delete" placement="bottom">
                <DeleteOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmRemoveProjectModal(id, title);
                  }}
                />
              </Tooltip>,
            ]
          : []),
      ]}
      type="inner"
      title={
        <TitleContainer>
          <Tooltip title={title}>
            <h4>{title}</h4>
          </Tooltip>
          {!is_public ? (
            <Tooltip title={t("global.private")} placement="top">
              <LockOutlined />
            </Tooltip>
          ) : null}
        </TitleContainer>
      }
    >
      <Paragraph ellipsis={{ rows: 2 }} style={{ height: "2.5rem", color: "#3e4352" }}>
        {description}
      </Paragraph>
    </CardContainer>
  );
};
export { ProjectsItem };
