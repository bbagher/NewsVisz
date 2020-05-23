import React, { useState } from "react";
import Visz from "./components/Visz.js";
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
  
  const passData = (d) => {
    const data = d.hits.hits.map((e) => e._source)
    setCurrentData(data) 
    setPositiveCommonWords(countWords(data , "positive").slice(0, 20));
    setNegativeCommonWords(countWords(data , "negative").slice(0, 20));
    setSentimentScore(getDataPair(data, "score", "date").slice(0, 80));
  } 

  useFetch(url, getAllArticles, passData);
  useFetch(url, getWatchlistArticles("msft"), passData, checkbox);
  useFetch(url, getSearchArticles(searchInput), passData, searchInput);
  useFetch(url, getBetweenDatesArticles(dates), passData, dates);


  const handleClick = (value) => {
    setCheckbox(value);
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (input) => {
    setSearchInput(input);
  };

  const handleDates = (value) => {
    setDates(value);
  };

  return (
      <div>
      <Nav route={route} setRoute={setRoute} />
        {route ? (
          <Visz
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
  );
}

export default App;