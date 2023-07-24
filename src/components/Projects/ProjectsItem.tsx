import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
    QuestionAnswerOutlined as QuestionAnswerOutlinedIcon,
    SettingsOutlined as SettingsOutlinedIcon,
} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";

interface IProjectProps {
    id: number;
    title: string;
    description: string;
    onClick(): void;
}

const ProjectsItem = ({ id, title, description, onClick }: IProjectProps) => {
    const defaultShadow = "5px 5px 15px 2px rgba(0, 0, 0, 0.12)";
    const hoverShadow = "5px 5px 15px 8px rgba(0, 0, 0, 0.12)";
    const [shadow, setShadow] = useState(defaultShadow);
    const navigate = useNavigate();

    const onMouseOver = () => setShadow(hoverShadow);
    const onMouseOut = () => setShadow(defaultShadow);

    return (
        <Grid xs={4}>
            <Box
                minWidth={200}
                onClick={onClick}
                display="flex"
                p={3}
                border="1px solid #bbb"
                gap={2}
                alignItems="center"
                boxShadow={shadow}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                sx={{
                    backgroundColor: "#fafafa",
                    borderRadius: 3,
                    cursor: "pointer",
                    position: "relative",
                }}
            >
                <QuestionAnswerOutlinedIcon
                    sx={{ color: "#777", fontSize: 40 }}
                />
                <Box display="flex" flexDirection="column">
                    <Typography
                        variant="h6"
                        component="h2"
                        color="#777"
                        fontWeight={500}
                    >
                        {title}
                    </Typography>
                    <Typography fontSize={12} color="#777">
                        {description}
                    </Typography>
                </Box>
                <Tooltip arrow title="Project settings" placement="top">
                    <IconButton
                        onClick={e => {
                            e.stopPropagation();
                            navigate(routesManager.getSourcesRoute(id));
                        }}
                        sx={{
                            color: "#777",
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    >
                        <SettingsOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Grid>
    );
};
export { ProjectsItem };
