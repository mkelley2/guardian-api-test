import React, { FC, useState, useRef, useEffect, Children } from "react";
import "./styles.scss";
import { Article, SearchBar } from "../../components";
import { SearchResponse } from "../../types";
import { search } from "../../services";
import { Container } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HomeScreenProps {}

export const HomeScreen: FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const isMounted = useRef(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<SearchResponse>();

  const { response } = data || {};
  const { results = [], pages } = response || {};

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const submit = async (pageNumber: number) => {
    if (searchValue.length === 0) {
      setError("Required");
    } else {
      setIsLoading(true);
      const { data, code, message } = await search(searchValue, pageNumber);

      if (isMounted.current) {
        setIsLoading(false);
        setHasSearched(true);
        if (code === 200) {
          setError("");
          if (data) {
            setData(data);
          }
        } else {
          setError(message);
        }
      }
    }
  };

  const renderList = () => {
    return (
      <>
        {pages && (
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={pages}
            onChange={(pageNumber) => {
              console.log(pageNumber);
              setPage(pageNumber);
              submit(pageNumber);
            }}
            hideFirstLastPages={true}
          />
        )}
        <div className="articleList">
          {Children.toArray(results.map((a) => <Article article={a} />))}
        </div>
        {pages && (
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={pages}
            onChange={(pageNumber) => {
              console.log(pageNumber);
              setPage(pageNumber);
              submit(pageNumber);
            }}
            hideFirstLastPages={true}
          />
        )}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <div className="loading">
        <FontAwesomeIcon size="2x" icon="spinner" spin={true} />
      </div>
    );
  };

  return (
    <Container className="HomeScreenContainer">
      <h1>Guardian Articles</h1>
      <SearchBar
        submit={() => submit(page)}
        error={error}
        value={searchValue}
        onChange={setSearchValue}
        isLoading={isLoading}
      />
      {isLoading ? (
        renderLoading()
      ) : results.length > 0 ? (
        renderList()
      ) : (
        <h6>
          {hasSearched ? "No Articles match search" : "Search to get articles"}
        </h6>
      )}
    </Container>
  );
};
