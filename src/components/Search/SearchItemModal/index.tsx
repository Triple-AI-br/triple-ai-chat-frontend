import { Button, Modal, Typography } from "antd";
import { ISearchResult } from "../../../services";
import { useTranslation } from "react-i18next";

const SearchItemModal = ({
  handleClose,
  isOpen,
  item,
}: {
  handleClose(): void;
  isOpen: boolean;
  item: ISearchResult;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      centered
      closable
      title={item.file_name}
      onOk={handleClose}
      onCancel={handleClose}
      width={"90%"}
      style={{ maxWidth: "700px" }}
      footer={[
        <Button key="back" onClick={handleClose}>
          Ok
        </Button>,
      ]}
    >
      <Typography.Text style={{ color: "#999" }}>
        {t("global.similarity")}: {`${Math.round(item.score * 100)}%`}
      </Typography.Text>
      <Typography.Paragraph>{item.text}</Typography.Paragraph>
    </Modal>
  );
};

export { SearchItemModal };
