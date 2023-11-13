import { Modal, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { sourcesService } from "../../../services";

type ShowDocumentModalProps = {
  open: boolean;
  handleClose: () => void;
  projectId?: number;
  fileId?: string | false;
};

const ShowDocumentModal: React.FC<ShowDocumentModalProps> = ({
  open,
  fileId,
  projectId,
  handleClose,
}) => {
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [path, setPath] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fileId || !projectId) {
      handleClose();
      return;
    }
    (async () => {
      try {
        setLoadingFile(true);
        const getFilePathParams = {
          projectId: projectId,
          sourceIds: [fileId],
        };
        const filePath = await sourcesService.getUploadUrl(getFilePathParams);
        console.log(filePath);
        setPath(`${filePath[0].url}${filePath[0].fields.key}`);
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
  }, [fileId, projectId]);

  return (
    <Modal open={open} onCancel={handleClose} style={{ minWidth: "90svw", minHeight: "100svh" }}>
      {loadingFile ? <Skeleton active /> : path ? <iframe height="600" src={path} /> : null}
    </Modal>
  );
};

export { ShowDocumentModal };
