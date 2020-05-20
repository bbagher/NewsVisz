export const countWords = (array, attr) => {
  const freqMap = {};
  array.forEach((d) => {
    if (typeof d[attr] === "object") d[attr] = d[attr].join(",");
    const matches = d[attr].matchAll(/\w+/g);
    for (const match of matches)
      freqMap[match[0]] ? (freqMap[match[0]] += 1) : (freqMap[match[0]] = 1);
  });
  const entries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
  const wordData = [];
  entries.forEach((d) => {
    wordData.push({ word: d[0], freq: +d[1] });
  });

  return wordData;
};

export const getDataPair = (array, number, date) => {
  const dataPairArray = [];
  array.forEach((d) => {
    dataPairArray.push({ [number]: +d[number], date: new Date(d[date]) });
  });
  console.log(dataPairArray);
  return dataPairArray;
};
