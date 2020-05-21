import React, { useEffect, useState } from "react";
import Vizs from "./components/Vizs.js";
import NewsCard from "./components/NewsCard.js";
import Nav from "./components/Nav.js";
import { countWords, getDataPair } from "./utils/utils.js";
import { useFetch } from "./utils/hooks.js";
import {
  url,
  getAllArticles,
  getBetweenDatesArticles,
  getSearchArticles,
  getWatchlistArticles,
} from "./es/es_params.js";
import "./App.scss";



function App() {


  const [currentData, setCurrentData] = useState([]);
  const [route, setRoute] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [dates, setDates] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [sentimentScore, setSentimentScore] = useState([]);
  const [positiveCommonWords, setPositiveCommonWords] = useState([]);
  const [negativeCommonWords, setNegativeCommonWords] = useState([]);

  const store = {};

  const StoreContext = React.createContext(store);

  useFetch(url, getAllArticles, setCurrentData);
  useFetch(url, getWatchlistArticles("msft"), setCurrentData, checkbox);
  useFetch(url, getSearchArticles(searchInput), setCurrentData, searchInput);
  useFetch(url, getBetweenDatesArticles(dates), setCurrentData, dates);

  useEffect(() => {
    setPositiveCommonWords(countWords(currentData, "positive").slice(0, 20));
    setNegativeCommonWords(countWords(currentData, "negative").slice(0, 20));
    setSentimentScore(getDataPair(currentData, "score", "date").slice(0, 80));
  }, [currentData]);

  const handleClick = (value) => {
    setCheckbox(value);
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (props) => {
    const [event, input] = props;
    setSearchInput(input);
    event.preventDefault();
  };

  const handleDates = (value) => {
    console.log(value);
    setDates(value);
  };

  return (
    <StoreContext.Provider>
      <Nav route={route} setRoute={setRoute} />
      <div>
        {route ? (
          <Vizs
            positiveCommonWords={positiveCommonWords}
            negativeCommonWords={negativeCommonWords}
            sentimentScore={sentimentScore}
            handleDates={handleDates}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            searchInput={searchInput}
            checkbox={checkbox}
            dates={dates}
            />
            ) : (
              <NewsCard
              dates={dates}
              checkbox={checkbox}
              articles={currentData}
              handleDates={handleDates}
              handleClick={handleClick}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              searchInput={searchInput}
              />
              )}
      </div>
    </StoreContext.Provider>
  );
}

export default App;