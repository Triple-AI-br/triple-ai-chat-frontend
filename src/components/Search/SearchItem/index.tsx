import { Button, Card, Typography } from "antd";
import { ISearchResult } from "../../../services";
import { useState } from "react";
import { SearchItemModal } from "../SearchItemModal";
import { useTranslation } from "react-i18next";

const SearchItem = (item: ISearchResult) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Card
      title={item.file_name}
      extra={
        <Button type="link" block onClick={handleOpen}>
          {t("global.more")}
        </Button>
      }
      style={{ width: "85%" }}
    >
      <SearchItemModal handleClose={handleClose} item={item} isOpen={isOpen} />
      <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ color: "#434752" }}>
        {item.text}
      </Typography.Paragraph>
      <Card.Meta description={`${t("global.similarity")}: ${Math.round(item.score * 100)}%`} />
    </Card>
  );
};

export { SearchItem };
