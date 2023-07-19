import { useEffect, useState } from "react";
import { ISources, sourcesService } from "../services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Base } from "../layouts/Base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectIsAdmin } from "../redux/authenticationSlice";
import { useParams } from "react-router-dom";
import { actionDisplayNotification } from "../redux/notificationSlice";

const SourcesPage = () => {
    const isAdmin = useAppSelector(selectIsAdmin);
    const [data, setData] = useState<ISources>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const handleDelete = async (fileId: number) => {
        if (!confirm("Are you sure you'd like to delete this source?")) return;

        const response = await sourcesService.deleteSource({
            projectId: id as string,
            sourceId: fileId,
        });
        if (response.success) {
            dispatch(
                actionDisplayNotification({
                    messages: ["Source deleted successfully"],
                    variant: "filled",
                    severity: "success",
                    anchorOrigin: { horizontal: "center", vertical: "top" },
                })
            );
            setData(prev => {
                if (!prev) return;
                const newPages = prev.uploads.pages.filter(
                    file => file.id !== fileId
                );
                prev.uploads.pages = newPages;
                return { ...prev };
            });
        } else {
            dispatch(
                actionDisplayNotification({
                    messages: ["Error deleting source"],
                    variant: "filled",
                    severity: "error",
                    anchorOrigin: { horizontal: "center", vertical: "top" },
                })
            );
        }
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await sourcesService.listSources({ projectId: 1 });
            setData(data);
            setIsLoading(false);
        })();
    }, []);

    return (
        <Base title="View your Data">
            {isLoading ? (
                <Box m="auto">
                    <CircularProgress sx={{ color: "#999" }} />
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    border="1px solid #aaa"
                    borderRadius={3}
                    overflow="scroll"
                    sx={{ backgroundColor: "white" }}
                >
                    {data &&
                        data.uploads.pages.map(file => (
                            <Box
                                display="flex"
                                key={file.filename}
                                sx={{
                                    borderTop: "1px solid #dedede",
                                    backgroundColor: "white",
                                }}
                                p={2}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography color="#656565">
                                    {file.filename}
                                </Typography>

                                {isAdmin && (
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        variant="outlined"
                                        color="error"
                                        onClick={async () => {
                                            await handleDelete(file.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        ))}
                </Box>
            )}
        </Base>
    );
};

export { SourcesPage };
