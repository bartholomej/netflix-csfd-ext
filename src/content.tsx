import { render } from "solid-js/web";
import { insertAfter } from "./utils";
import { CSFDMovie } from "node-csfd-api/types/interfaces/movie.interface";
import {
  calculateSeries,
  getButtonRootElements,
  getTitleAndYear,
} from "./netflix/utils";
import Csfd from "./components/Csfd";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Listen for messages sent from background.js
  if (request.message === "sendingUrl") {
    if (request.url.includes("jbv=") || request.url.includes("/title/")) {
      const { title, year } = getTitleAndYear();
      if (title && year) {
        const isSeries = calculateSeries();

        console.log(
          "CSFD – searching for",
          `https://www.csfd.cz/hledat/?q=${encodeURIComponent(
            title + " " + year
          )}`,
          isSeries
        );

        sendResponse({ title, year, isSeries });
      } else {
        console.error("CSFD – title or year not found", title, year);
      }
    }
  }

  if (request.message === "movieFound") {
    renderTemplate(request.movie);
  }
});

const renderTemplate = (movie: CSFDMovie | null): void => {
  const { root, placingNode } = getButtonRootElements();
  if (root && placingNode) {
    insertAfter(placingNode, root);
    console.warn("CSFD rendering:", movie);
    render(() => (movie?.id ? <Csfd {...movie} /> : "Not found..."), root);
  }
};
