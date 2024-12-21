import { render } from 'solid-js/web';
import { insertAfter } from './utils';
import {
  calculateSeries,
  getButtonRootElements,
  getTitleAndYear,
} from './netflix/utils';
import Csfd from './components/Csfd';
import { CSFDMovie } from 'node-csfd-api/types/interfaces/movie.interface';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'sendingUrl') {
    if (request.url.includes('jbv=') || request.url.includes('/title/')) {
      (async () => {
        try {
          const { title, year } = await getTitleAndYear();

          if (title && year) {
            const isSeries = calculateSeries();
            console.log('CSFD – searching for', {
              url: `https://www.csfd.cz/hledat/?q=${encodeURIComponent(
                title + ' ' + year
              )}`,
              isSeries,
            });

            sendResponse({ title, year, isSeries });
          } else {
            console.error('CSFD – title or year not found', title, year);
            sendResponse(null);
          }
        } catch (error) {
          console.error('Error fetching title and year:', error);
          sendResponse(null);
        }
      })();

      return true; // Keep the messaging channel open for async response
    }
  }

  if (request.message === 'movieFound') {
    console.log('CSFD – movie found', request.movie);
    renderTemplate(request.movie);
  }
});

const renderTemplate = (movie: CSFDMovie | null): void => {
  const { root, placingNode } = getButtonRootElements();
  if (root && placingNode) {
    insertAfter(placingNode, root);
    console.warn('CSFD rendering:', movie);
    render(() => (movie?.id ? <Csfd {...movie} /> : 'Not found...'), root);
  }
};
