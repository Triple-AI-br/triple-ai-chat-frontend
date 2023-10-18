import { Typography } from "antd";
import { Base } from "../../layouts/Base";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Container, StyledSearch } from "./styled";
import { ISearchResult, searchService } from "../../services";
import { useParams, useSearchParams } from "react-router-dom";
import { SearchResults } from "../../components/Search";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const { id } = useParams() as { id: string };
  const projectId = parseInt(id);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<undefined | ISearchResult[]>();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const { t } = useTranslation();

  const handleSearch = async (value: string) => {
    if (q === "") setResults(undefined);
    setSearchParams(
      (prev) => {
        prev.set("q", value);
        return prev;
      },
      { replace: true },
    );
  };

  useEffect(() => {
    if (!q) return;
    (async () => {
      setIsLoading(true);
      const res = await searchService.searchSnippets({ projectId, q, limit: 25 });
      res.reverse();
      setResults(res);
      setIsLoading(false);
    })();
  }, [q]);

  return (
    <Base title="Search">
      <Typography.Title>{t("pages.search.searchDocuments")}</Typography.Title>
      <Container>
        <StyledSearch
          size="large"
          prefix={<SearchOutlined />}
          enterButton={t("global.search")}
          placeholder={t("pages.search.searchDocuments")}
          onSearch={handleSearch}
          loading={isLoading}
          autoFocus
          defaultValue={q ?? ""}
        />
        <SearchResults results={results} />
      </Container>
    </Base>
  );
};

export { SearchPage };
