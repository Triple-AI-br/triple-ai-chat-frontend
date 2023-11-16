import { Button, Modal, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { ISource, sourcesService } from "../../../services";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DownloadOutlined } from "@ant-design/icons";
import { DocContainer } from "./styled";
import { useTranslation } from "react-i18next";

type ShowDocumentModalProps = {
  open: boolean;
  handleClose: () => void;
  projectId?: number;
  file?: ISource | false;
};

const ShowDocumentModal: React.FC<ShowDocumentModalProps> = ({
  open,
  file,
  projectId,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [path, setPath] = useState<Blob>();
  const docs = [{ uri: path ? URL.createObjectURL(path) : "" }];

  const handleDownload = async () => {
    try {
      setLoadingDownload(true);
      if (!file || !projectId) {
        handleClose();
        return;
      }
      const downloadUrl = await sourcesService.getSourceSignedUrl({ projectId, sourceId: file.id });
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = file.file_name;
      // Adicione o link ao corpo do documento
      document.body.appendChild(downloadLink);
      // Execute o clique no link para iniciar o download
      downloadLink.click();
      // Remova o link do corpo do documento
      document.body.removeChild(downloadLink);
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          severity: "warning",
          messages: ["Não foi possível fazer o download do documento, tente novamente mais tarde."],
        }),
      );
    } finally {
      setLoadingDownload(false);
    }
  };

  useEffect(() => {
    if (!file || !projectId) {
      handleClose();
      return;
    }
    (async () => {
      try {
        setLoadingFile(true);
        const getFilePathParams = {
          projectId: projectId,
          sourceId: file.id as number,
        };
        const filePath = await sourcesService.getUploadUrl(getFilePathParams);
        setPath(filePath);
      } catch (err) {
        dispatch(
          actionDisplayNotification({
            severity: "warning",
            messages: ["Não foi possível ler o documento, tente novamente mais tarde."],
          }),
        );
        handleClose();
      } finally {
        setLoadingFile(false);
      }
    })();
  }, [file, projectId]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={file ? file.file_name : ""}
      style={{ minWidth: "none" }}
      footer={[
        <Button
          key="download"
          loading={loadingDownload}
          icon={<DownloadOutlined />}
          type="primary"
          onClick={async () => await handleDownload()}
        >
          Download
        </Button>,
        <Button key="back" onClick={handleClose}>
          {t("global.close")}
        </Button>,
      ]}
    >
      <DocContainer>
        {loadingFile ? (
          <Skeleton
            active
            paragraph={{
              rows: 20,
              width: Array.from(Array(20)).map(
                () => `${Math.floor(Math.random() * (100 - 85 + 1)) + 85}%`,
              ),
            }}
          />
        ) : path ? (
          <DocViewer
            config={{ header: { disableFileName: true } }}
            documents={docs}
            pluginRenderers={DocViewerRenderers}
          />
        ) : null}
      </DocContainer>
    </Modal>
  );
};

export { ShowDocumentModal };
