import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { addBR, lolliPopRenderSVG, lineChartRenderSVG } from "./utils.js";
import { select, set } from "d3";
import "./App.scss";
import Example from './DateRange.js'



function init(initValue) {
  return initValue
}


function reducer(state, action) {
  console.log('THIS IS REDUCER', state, action)
  switch (action.type) {
    case 'change':
      return {...state, inputValue: action.payload}
    case 'SET_SENTIMENT_SCORE':
      return {...state, sentimentScore: action.payload}
    default:
      throw new Error()
  }
  
}





const SideBar = (props) => {
  const [input, setInput] = useState(props.inputValue)

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  

  return (       
          <div className="side-bar">
          <div className="widget">
            <h2>Filter:</h2>
            <div className="search-container">
              <ul>
                <input
                  type="text"
                  placeholder="Search.."
                  name="search"
                  className="search"
                  value={input}
                  onChange={handleChange}
                />
                <button type="submit" onClick={(e) =>{ 

                  props.handleSubmit([e,input])
                  e.preventDefault()
                  }}>
                  <i className="fa fa-search"></i>
                </button>
              </ul>
            </div>
          </div>
          <div className="widget">
            <h2>Watchlist:</h2>
            <ul>
              <input
                id="msft-checkbox"
                type="checkbox"
                onClick={props.handleClick}
              />
              <li>MSFT</li>
              <input id="tesla-checkbox" type="checkbox" />
              <li>TSLA</li>
            </ul>
          </div>
          <div className="widget">
            <h2>Date Range:</h2>
            <Example handleDates={props.handleDates}/>
          </div>
        </div>)
}

const renderVizs = (visz, props) => {

  for (let i = 0; i < visz.length; i += 1) {
    const svg = select(`#id${i}`);
    console.log('this is svg', svg._groups[0][0])
    if (svg._groups[0][0]){

      const svg2 = select(`#pid${i}`);
      const svg3 = select(`#nid${i}`);
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      lineChartRenderSVG(props.sentimentScore, svg, width, height);
      
      lolliPopRenderSVG(
        "Top Positive Word Frequency",
        props.positiveCommonWords,
        svg2,
        width,
        height
        );
        lolliPopRenderSVG(
          "Top Negative Word Frequency",
        props.negativeCommonWords,
        svg3,
        width,
        height
        );
      }
      }    
}

function Vizs(props) {
  const [visz, setVisz] = useState([0]);


  useEffect(() => {
    renderVizs(visz, props) 
    
    return () => {
      
      select('svg').remove()
      select('svg').remove()
      select('svg').remove()
      select(".vizs").append("svg").attr("width", 1100).attr("height", 700).attr('id', 'id0')
      }
    

  }, [visz]);


  return (
    <body>

    <div className="title-block">
      <h1>Visualizations</h1>
          </div>
      <div className="container">
        <div className="vizs">
          {visz.map((e, i) => {
            return (
              <>
                <svg id={`id${i}`} width="1100" height="700"></svg>
                <svg id={`pid${i}`} width="1100" height="700"></svg>
                <svg id={`nid${i}`} width="1100" height="700"></svg>
              </>
            );
          })}
        </div>
        <SideBar inputValue={props.inputValue} handleDates={props.handleDates} handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleClick={props.handleClick}/>
    </div>
   </body>
  );
}

function NewsCard(props) {
  console.log('this is newscard props', props)
  return (
    <body>
      <div className="title-block">
        <h1>Feednews</h1>
      </div>
      <div className="container">
        <div className="article-list">
          {props.articles.map((d) => (
            <div className="article-card">
              {d.img_url === "null" ? (
                <img
                  src={
                    "//s3.reutersmedia.net/resources/r/?m=02&d=20200227&t=2&i=1495838996&r=LYNXNPEG1Q0EJ&w=500"
                  }
                />
              ) : (
                <img
                  src={d.img_url.substring(0, d.img_url.length - 3) + "=500"}
                />
              )}
              <div className="article">
                <div className="article-title">{d.title}</div>
                <div className="article-meta">
                  <p>Ticker : {d.ticker}</p>
                  <p>Date : {new Date(d.date).toDateString()}</p>
                </div>
                <div className="article-content">{d.content}</div>
                <a href={d.base_url}>Read More</a>
              </div>
            </div>
          ))}
        </div>
        <SideBar inputValue={props.inputValue} handleDates={props.handleDates} handleSubmit={props.handleSubmit} handleChange={props.handleChange} handleClick={props.handleClick}/>
      </div>
    </body>
  );

}




function App() {
  
  
  
  
  const [articles, setArticles] = useState([]);
  const [positiveCommonWords, setPositiveCommonWords] = useState([]);
  const [negativeCommonWords, setNegativeCommonWords] = useState([]);
  const [sentimentScore, setSentimentScore] = useState([]);
  const [viz, setViz] = useState(false);
  const [filteredData, setFiltereredData] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [current, setCurrent] = useState([]);
  const [search, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dates, setDates] = useState([])
  const [settingDates, setSettingDates] = useState(false)

  
  const store = {
    articles,
    positiveCommonWords,
    sentimentScore,
    viz,
    filteredData,
    checkbox,
    current,
    search,
    inputValue,
    dates,
    settingDates,
    params: {}
  }
  const [state, dispatch] = React.useReducer(reducer, store, init)
  

  console.log('this is init outside useeffect store', state)
  const StoreContext = React.createContext(store)

  useEffect(() => {

    
    
    (async () => {
      console.log('this is state input', state)
      const url = "http://35.245.165.137:4444/graphql";
      const { data } = await axios.post(url, {
        query: `query { news { _id, title, ticker img_url, base_url, date, content, score, tokens, comparative, calculation, tokens, words, positive, negative } }`,
      });
      console.log(data.data.news);

      data.data.news.sort((a, b) => {
        let c = new Date(a.date).toJSON();
        let d = new Date(b.date).toJSON();
        return d - c;
      });

      setArticles(data.data.news);
      setCurrent(data.data.news);

      let freqMap = {};
      data.data.news.forEach((d) => {
        const matches = d.positive.matchAll(/\w+/g);
        for (const match of matches)
          freqMap[match[0]]
            ? (freqMap[match[0]] += 1)
            : (freqMap[match[0]] = 1);
      });
      let entries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
      let wordData = [];
      entries.forEach((d) => {
        wordData.push({ word: d[0], freq: +d[1] });
      });
      setPositiveCommonWords(wordData.slice(0, 20));

      let negFreqMap = {};
      data.data.news.forEach((d) => {
        const negMatches = d.negative.matchAll(/\w+/g);
        for (const match of negMatches)
          negFreqMap[match[0]]
            ? (negFreqMap[match[0]] += 1)
            : (negFreqMap[match[0]] = 1);
      });
      let negEntries = Object.entries(negFreqMap).sort((a, b) => b[1] - a[1]);
      let negWordData = [];
      negEntries.forEach((d) => {
        negWordData.push({ word: d[0], freq: +d[1] });
      });
      setNegativeCommonWords(negWordData.slice(0, 20));

      let sentimentData = [];
      data.data.news.forEach((d) => {
        sentimentData.push({ score: +d.score, date: new Date(d.date) });
      });
      dispatch({type: 'SET_SENTIMENT_SCORE', payload: sentimentData })
      setSentimentScore(sentimentData.slice(0, 80));
    })();
  }, []);

  useEffect(() => {
    var url = "http://localhost:9200/news/_search?pretty";

    var params = {
      from: 0,
      size: 20,
      query: {
        match_phrase: { ticker: "tsla" },
      },
      sort: [{"date": "desc"}]
    };

    if (checkbox)
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((d) => d.json())
        .then((d) => {
          console.log(d);
          setFiltereredData(d.hits.hits.map((e) => e._source));
        });
  }, [checkbox]);

  useEffect(() => {
    if (checkbox || state.inputValue || settingDates) {
      setCurrent(filteredData);
      let freqMap = {};
      filteredData.forEach((d) => {
          freqMap[d.positive]
            ? (freqMap[d.positive] += 1)
            : (freqMap[d.positive] = 1);
      });
      let entries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
      let wordData = [];
      entries.forEach((d) => {
        wordData.push({ word: d[0], freq: +d[1] });
      });
      setPositiveCommonWords(wordData.slice(0, 20));

      let negFreqMap = {};
      filteredData.forEach((d) => {
          negFreqMap[d.negative]
            ? (negFreqMap[d.negative] += 1)
            : (negFreqMap[d.negative] = 1);
      });
      let negEntries = Object.entries(negFreqMap).sort((a, b) => b[1] - a[1]);
      let negWordData = [];
      negEntries.forEach((d) => {
        negWordData.push({ word: d[0], freq: +d[1] });
      });
      setNegativeCommonWords(negWordData.slice(0, 20));

      let sentimentData = [];
      filteredData.forEach((d) => {
        sentimentData.push({ score: +d.score, date: new Date(d.date) });
      });
      dispatch({type: 'SET_SENTIMENT_SCORE', payload: sentimentData })
      setSentimentScore(sentimentData.slice(0, 80));
      setCheckbox(false)
      setSettingDates(false)
      setSearch(false)
    }
  }, [filteredData]);

  useEffect(() => {
    var url = "http://localhost:9200/news/_search?pretty";

    var params = {
      from: 0,
      size: 20,
      query: {
        bool: {
          must: [
            { match: { title: state.inputValue } },
            { match: { content: state.inputValue } },
          ],
        },
      },
      sort: [{"date":"asc"}]
    };

    if (search)
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((d) => d.json())
        .then((d) => {
          setFiltereredData(d.hits.hits.map((e) => e._source));
        });
  }, [search]);


  useEffect(() => {
    var url = "http://localhost:9200/news/_search?pretty";

    var params = {
      from: 0,
      size: 20,
      "query": {
        "range": {
          "date": {
            "time_zone": "+01:00",
            "gte": dates[0],
            "lte": dates[1]
          }
        }
      },
      sort: [{"date":"asc"}]
    }     

    if (settingDates)
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((d) => d.json())
        .then((d) => {
          setFiltereredData(d.hits.hits.map((e) => e._source));
        });
  }, [settingDates]);


  const handleClick = () => {
    setCheckbox(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = props => {
    const [event, input] = props
    dispatch({type: 'change', payload:input})
    setSearch(true);
    event.preventDefault();
  };

  const handleDates = (value) => {
    console.log(value)
    setSettingDates(true)
    setDates(value)
  }



  return (
    <StoreContext.Provider value={store}>
    <div>
      <header>
        <nav>
          <div class="container">
            <span>
              <a className="logo" onClick={() => setViz(false)}>
                NEWSVIZS
              </a>
            </span>
            <ul>
              <li>
                <a onClick={() => setViz(false)}>News</a>
              </li>
              <li>
                <a onClick={() => setViz(true)}>Vizs</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {viz ? (
        <Vizs
        positiveCommonWords={positiveCommonWords}
        negativeCommonWords={negativeCommonWords}
        sentimentScore={state.sentimentScore}
        handleDates={handleDates}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={state.inputValue}
        />
      ) : (
        <NewsCard
        articles={current}
        handleDates={handleDates}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={state.inputValue}
        />
        )}
    </div>
     </StoreContext.Provider>
  );
}

export default App;
                                         