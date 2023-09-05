import { Box, Typography } from "@mui/material";
import { Base } from "../layouts/Base";
import { ProjectsItem } from "../components/Projects";
import { routesManager } from "../routes/routesManager";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../services";
import { Spinner } from "../components/loaders";
import { Col, Row } from "antd";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<IProject[]>();

	useEffect(() => {
		(async () => {
			const _projects = await projectService.listProjects();
			setProjects(_projects);
		})();
	}, []);

	return (
		<Base title={"Your AI Chatbots"}>
			<Box
				flex={1}
				px={3}
				py={4}
				display="flex"
				flexDirection="column"
				gap={5}
			>
				{projects === undefined ? (
					<Spinner />
				) : projects === null ? (
					<Typography>
                        We haf a problem finding your projects
					</Typography>
				) : projects.length === 0 ? (
					<Typography>
                        You don&apos;t have any projects yet
                    </Typography>
                ) : (
                    <Row gutter={[24, 24]} align="middle">
                        {projects.map(project => (
                            <Col
                                key={project.id}
                                className="gutter-row"
                                xs={24}
                                sm={24}
                                md={12}
                                lg={8}
                                xl={8}
                            >
                                <ProjectsItem
                                    onClick={() =>
                                        window.open(
                                            `${
                                                process.env
                                                    .REACT_APP_BASE_FRONT_URL
                                            }${routesManager.getChatRoute(
                                                project.id
                                            )}`,
                                            "_blank"
                                        )
                                    }
                                    title={project.title}
                                    description={project.description}
                                    id={project.id}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </Box>
        </Base>
    );
};

export { ProjectsPage };
