import { useState } from "react";
import { sourcesService } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { Box, Button, Chip, CircularProgress } from "@mui/material";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IUploadProps {
  uploadCallback(_: File[], __: string[]): void;
}

const Upload = ({ uploadCallback }: IUploadProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, serIsUploading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files || []));
  };

  const handleDelete = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
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
          messages: [t("global.successUploadMessage")],
          severity: "success",
        }),
      );
      setSelectedFiles([]);
      uploadCallback && uploadCallback(selectedFiles, paths);
    } catch (error) {
      const message = (error as { response: { data: { detail: string } } }).response.data.detail;
      dispatch(
        actionDisplayNotification({
          messages: [message],
          autoHideDuration: 6_000,
        }),
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
          {t("pages.sources.components.uploadFilesBtn")}
        </Button>
      </label>

      <Box maxWidth="70%" sx={{ overflowX: "scroll" }} display="flex" gap={1} flexWrap="wrap">
        {selectedFiles.map((file) => {
          const name = file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
          return <Chip key={file.name} label={name} onDelete={() => handleDelete(file.name)} />;
        })}
      </Box>

      {Boolean(selectedFiles.length) && (
        <Button disabled={isUploading} variant="contained" color="primary" onClick={onFileUpload}>
          Upload
        </Button>
      )}
      {isUploading && <CircularProgress />}
    </Box>
  );
};

export { Upload };
