export const url = "http://localhost:9200/news/_search?pretty";

export const getAllArticles = {
  from: 0,
  size: 40,
  query: {
    match_all: {},
  },
  sort: [{ date: "desc" }],
};

export const getWatchlistArticles = (name) => {
  return {
    from: 0,
    size: 40,
    query: {
      match_phrase: { ticker: name },
    },
    sort: [{ date: "desc" }],
  };
};

export const getSearchArticles = (input) => {
  return {
    from: 0,
    size: 40,
    query: {
      bool: {
        must: [{ match: { title: input } }, { match: { content: input } }],
      },
    },
    sort: [{ date: "desc" }],
  };
};

export const getBetweenDatesArticles = (dates) => {
  return {
    from: 0,
    size: 40,
    query: {
      range: {
        date: {
          time_zone: "+01:00",
          gte: dates[0],
          lte: dates[1],
        },
      },
    },
    sort: [{ date: "desc" }],
  };
};
