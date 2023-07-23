import { useState } from "react";
import { sourcesService } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { Box, Button, Chip, CircularProgress } from "@mui/material";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { useParams } from "react-router-dom";

interface IUploadProps {
    uploadCallback(_: File[], __: string[]): void;
}

const Upload = ({ uploadCallback }: IUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, serIsUploading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(Array.from(event.target.files || []));
    };

    const onFileUpload = async () => {
        if (!selectedFiles.length) return;
        serIsUploading(true);
        try {
            const paths = await sourcesService.uploadSources({
                files: selectedFiles,
                projectId: id as string,
            });
            dispatch(
                actionDisplayNotification({
                    messages: ["Uploaded file successfully!"],
                    severity: "success",
                })
            );
            setSelectedFiles([]);
            uploadCallback && uploadCallback(selectedFiles, paths);
        } catch (error) {
            console.error(error);
            dispatch(
                actionDisplayNotification({
                    messages: ["There was an error uploading the file!"],
                })
            );
        }
        serIsUploading(false);
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <input
                multiple
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={onFileChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                    Upload new Files
                </Button>
            </label>

            <Box
                maxWidth="70%"
                sx={{ overflowX: "scroll" }}
                display="flex"
                gap={1}
                flexWrap="wrap"
            >
                {selectedFiles.map(file => {
                    const name =
                        file.name.length > 20
                            ? file.name.slice(0, 20) + "..."
                            : file.name;
                    return <Chip key={file.name} label={name} />;
                })}
            </Box>

            {Boolean(selectedFiles.length) && (
                <Button
                    disabled={isUploading}
                    variant="contained"
                    color="primary"
                    onClick={onFileUpload}
                >
                    Upload
                </Button>
            )}
            {isUploading && <CircularProgress />}
        </Box>
    );
};

export { Upload };
