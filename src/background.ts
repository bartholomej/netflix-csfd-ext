import { csfd } from 'node-csfd-api';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // console.log('CSFD URL changed to: ', tab.url, tabId)
    chrome.tabs.sendMessage(tabId, {
      message: 'sendingUrl',
      url: tab.url,
      type: 'URL_CHANGE'
    }, res => {
      const searchQuery = res.title + (res.isSeries ? '' : ' ' + res.year);

      csfd
        .search(searchQuery)
        .then((response) => {
          console.warn('CSFD movie found:', response, res.isSeries);
          if (res.isSeries) {
            return response.tvSeries[0];
          } else {
            return response.movies[0];
          }
        })
        .then(movie => csfd.movie(movie.id))
        .then(movie => {
          chrome.tabs.sendMessage(tabId, {
            message: 'movieFound',
            movie,
            type: 'MOVIE_FOUND',
          })
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  }
});
