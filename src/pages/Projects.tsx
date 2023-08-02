import { Box, Typography } from "@mui/material";
import { Base } from "../layouts/Base";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ProjectsItem } from "../components/Projects";
import { routesManager } from "../routes/routesManager";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../services";
import { Spinner } from "../components/loaders";
import { useAppSelector } from "../redux/hooks";
import { selectIsSuperUser } from "../redux/authenticationSlice";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<IProject[]>();
    const isSuperuser = useAppSelector(selectIsSuperUser);

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
                            <ProjectsItem
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
                                title={
                                    isSuperuser
                                        ? `AI Chatbot - ${project.customer_name}`
                                        : "AI Chatbot"
                                }
                                description={project.description}
                                id={project.id}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </Base>
    );
};

export { ProjectsPage };
