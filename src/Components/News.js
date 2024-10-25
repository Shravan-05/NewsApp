import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const News = (props) => {
  const [state, setState] = useState({
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0,
    notFound: false,
    error: null,
  });

  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateNews(); // Fetch news on initial load
    } else {
      history("/login");
    }
  }, [history]);

  const buildUrl = (page) => {
    const query = props.text ? `&q=${encodeURIComponent(props.text)}` : "";
    return `https://newsapi.org/v2/top-headlines?country=us&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}${query}`;
  };

  const updateNews = async () => {
    const url = buildUrl(1); // Always reset to page 1 for new search
    setState((prevState) => ({ ...prevState, loading: true, notFound: false }));
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const parsedData = await response.json();
      const filteredArticles = parsedData.articles.filter((article) => {
        return article.title && article.urlToImage; // Only check title and urlToImage
      });
      if (filteredArticles.length === 0) {
        setState((prevState) => ({
          ...prevState,
          articles: [],
          loading: false,
          notFound: props.text ? true : false,
        }));
      } else {
        setState({
          articles: filteredArticles,
          loading: false,
          totalResults: parsedData.totalResults,
          page: 1,
          notFound: false,
        });
      }
    } catch (error) {
      console.error("Error fetching news articles:", error);
      setState({
        articles: [],
        loading: false,
        error: "Failed to fetch news articles. Please try again later.",
      });
    }
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      page: 1,
      articles: [],
      notFound: false,
    }));
    updateNews();
  }, [props.text, props.category]);

  const fetchMoreData = async () => {
    if (state.loading || state.articles.length >= state.totalResults) return; // Prevent fetch if already loading or all articles are loaded
    const newPage = state.page + 1;
    const url = buildUrl(newPage);
    setState((prevState) => ({ ...prevState, loadingMore: true })); // Set loading to true while fetching more data
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      const filteredArticles = parsedData.articles.filter(
        (article) => article.title && article.urlToImage
      );
      setState((prevState) => ({
        articles: [...prevState.articles, ...filteredArticles],
        page: newPage,
        totalResults: parsedData.totalResults,
        loadingMore: false, // Set loadingMore to false after fetching
      }));
    } catch (error) {
      console.error("Error while fetching more data:", error);
      setState((prevState) => ({ ...prevState, loadingMore: false })); // Ensure loadingMore is reset on error
    }
  };

  return (
    <div className="container my-3">
      <h2 style={{ marginTop: "90px" }}>
        Top Headlines - Today's News (category - {props.category})
      </h2>
      {state.loading && state.page === 1 && <Spinner />}
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      {!state.loading && state.notFound && (
        <div className="alert alert-warning" role="alert">
          No results found for "{props.text || "default news"}".
        </div>
      )}
      {!state.loading && !state.notFound && (
        <InfiniteScroll
          dataLength={state.articles.length}
          next={fetchMoreData}
          hasMore={state.articles.length < state.totalResults} // Ensure this condition is correct
          loader={state.loadingMore && <Spinner />} // Show loader if loading new data
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more articles to show</b>
            </p>
          }
        >
          <div className="row">
            {state.articles.map((e, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 my-3" key={index}>
                <NewsItem
                  title={e.title}
                  description={e.description || "No description available."}
                  imagetoUrl={e.urlToImage}
                  imageurl={e.url}
                  author={e.author}
                  time={e.publishedAt}
                  source={e.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default News;
