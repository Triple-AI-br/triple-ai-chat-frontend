import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import {  Typography } from "antd";
import { EditOutlined, SafetyOutlined, SettingOutlined } from "@ant-design/icons";
import { CardContainer, PrivateProjectTag, TitleContainer } from "./styled";
import { IProject } from "../../../services";

interface IProjectProps {
    onClick(): void;
    onEdit(arg: IProject): void;
    project: IProject;
}

const ProjectsItem = ({ project, onClick, onEdit }: IProjectProps) => {
  const {id, title, description, is_public} = project;

  const { Paragraph } = Typography;
  const navigate = useNavigate();

  return (
    <CardContainer
      onClick={onClick}
      size="small"
      actions={[
        <SettingOutlined
          key="setting"
          onClick={e => {
            e.stopPropagation();
            navigate(routesManager.getSourcesRoute(id));
          }}
        />,
        <EditOutlined key="edit"  onClick={(e) =>{
          e.stopPropagation();
          onEdit(project);
        }} />,
      ]}
      type="inner"
      title={
        <TitleContainer>
          {title}
          {
            !is_public ? (
              <PrivateProjectTag>
                <SafetyOutlined />
                <span>Private</span>
              </PrivateProjectTag>
            ) : null
          }
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
