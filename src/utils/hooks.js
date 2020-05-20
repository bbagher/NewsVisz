import { useEffect } from "react";

export const useFetch = (url, params, setter, check = true) => {
  useEffect(() => {
    check &&
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((d) => d.json())
        .then((d) => {
          setter(d.hits.hits.map((e) => e._source));
        });
  }, [check]);
};
