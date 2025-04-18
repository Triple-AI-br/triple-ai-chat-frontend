import { Card, Skeleton, Typography } from "antd";
import { Base } from "../../layouts/Base";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Container, StyledSearch } from "./styled";
import { ISearchResult, searchService } from "../../services";
import { useParams, useSearchParams } from "react-router-dom";
import { SearchResults } from "../../components/Search";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks";
import { actionDisplayNotification } from "../../redux/notificationSlice";
const SearchPage = () => {
  const { id } = useParams() as { id: string };
  const projectId = parseInt(id);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<undefined | ISearchResult[]>();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const { t } = useTranslation();

  const handleSearch = async (value: string) => {
    if (q === "") setResults(undefined);
    if (value === "") return;
    if (value === q) return searchSnippets();
    setSearchParams(
      (prev) => {
        prev.set("q", value);
        return prev;
      },
      { replace: true },
    );
  };

  const searchSnippets = async () => {
    try {
      setIsLoading(true);
      if (!q) return;
      const res = await searchService.searchSnippets({ projectId, q, limit: 25 });
      if (res.length === 0) {
        setResults([]);
        return;
      }
      // Order by descending score
      res.sort((a, b) => (a.score < b.score ? 1 : a.score > b.score ? -1 : 0));
      setResults(res);
    } catch (error) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureRequestMessage")],
          severity: "warning",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await searchSnippets();
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
        {isLoading ? (
          <>
            <Card style={{ width: "85%" }}>
              <Skeleton active />
            </Card>
            <Card style={{ width: "85%" }}>
              <Skeleton active />
            </Card>
            <Card style={{ width: "85%" }}>
              <Skeleton active />
            </Card>
          </>
        ) : (
          <SearchResults results={results} />
        )}
      </Container>
    </Base>
  );
};

export { SearchPage };
