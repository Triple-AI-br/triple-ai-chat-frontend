import { Empty } from "antd";
import { ISearchResult } from "../../../services";
import { SearchItem } from "../SearchItem";
import { useTranslation } from "react-i18next";

const SearchResults = ({ results }: { results: ISearchResult[] | undefined }) => {
  const { t } = useTranslation();

  return (
    <>
      {results === undefined ? null : results.length === 0 ? (
        <Empty description={t("global.searchNoResult")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        results.map((r) => {
          return <SearchItem key={r.id} {...r} />;
        })
      )}
    </>
  );
};

export { SearchResults };
