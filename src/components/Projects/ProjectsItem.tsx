import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { Card, Tooltip, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";

interface IProjectProps {
    id: number;
    title: string;
    description: string;
    onClick(): void;
}

const ProjectsItem = ({ id, title, description, onClick }: IProjectProps) => {
    const { Paragraph } = Typography;
    const defaultShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.1)";
    const hoverShadow = "0px 4px 12px 5px rgba(0, 0, 0, 0.12)";
    const [shadow, setShadow] = useState(defaultShadow);
    const onMouseOver = () => setShadow(hoverShadow);
    const onMouseOut = () => setShadow(defaultShadow);
    const navigate = useNavigate();

    return (
        <Card
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            actions={[
                <Tooltip title="Settings" key="setting" placement="bottom">
                    <SettingOutlined
                        onClick={e => {
                            e.stopPropagation();
                            navigate(routesManager.getSourcesRoute(id));
                        }}
                    />
                </Tooltip>,
            ]}
            type="inner"
            title={title}
            hoverable
            style={{ boxShadow: shadow, minWidth: 180 }}
        >
            <Paragraph ellipsis={{ rows: 2 }} style={{ height: "2.5rem" }}>
                {description}
            </Paragraph>
        </Card>
    );
};
export { ProjectsItem };
