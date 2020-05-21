import { useEffect } from "react";

export const useFetch = (url, params, setter, state = true) => {
  useEffect(() => {
    state &&
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((d) => d.json())
        .then((d) => {
          console.log('hits', d)
          !d.error && setter(d.hits.hits.map((e) => e._source));
        });
  }, [state]);
};
