import React from "react";
import { SideBar } from "./SideBar.js";

export default function NewsCard(props) {
  return (
    <body>
      <div className="title-block">
        <h1>Feednews</h1>
      </div>
      {!props.articles[0] && (
        <h2 style={{ display: "flex", "justify-content": "center" }}>
          No articles found!
        </h2>
      )}
      <div className="body-container">
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
        <SideBar
          dates={props.dates}
          checkbox={props.checkbox}
          searchInput={props.searchInput}
          handleDates={props.handleDates}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleClick={props.handleClick}
        />
      </div>
    </body>
  );
}
