import { Box, Typography } from "@mui/material";
import { Base } from "../layouts/Base";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ChatInfo } from "../components/Chats";
import { routesManager } from "../routes/routesManager";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../services";
import { Spinner } from "../components/loaders";

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
                    <Grid container width="100%" spacing={2}>
                        {projects.map(project => (
                            <ChatInfo
                                key={project.id}
                                onClick={() =>
                                    window.open(
                                        `${
                                            process.env.REACT_APP_BASE_FRONT_URL
                                        }${routesManager.getChatRoute(
                                            project.id
                                        )}`,
                                        "_blank",
                                        "noreferrer"
                                    )
                                }
                                title="AI Chatbot"
                                description={project.description}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </Base>
    );
};

export { ProjectsPage };
