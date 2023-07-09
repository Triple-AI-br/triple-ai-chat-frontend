import { useEffect, useState } from "react";
import { ISources, sourcesService } from "../services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Base } from "../layouts/Base";

const SourcesPage = () => {
    const [data, setDate] = useState<ISources>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await sourcesService.listSources({ projectId: 4328 });
            setDate(data);
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
                    width="100%"
                    overflow="scroll"
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
                                <Button
                                    startIcon={<DeleteIcon />}
                                    variant="outlined"
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </Box>
                        ))}
                </Box>
            )}
        </Base>
    );
};

export { SourcesPage };
