import { CSFDMovie } from "node-csfd-api/types/interfaces/movie.interface";
import type { Component } from "solid-js";
import "./Button.scss";

const Button: Component<CSFDMovie> = (movie) => {
  const urlUnknown = `https://www.csfd.cz/?q=${movie.title} ${movie.year}`;
  return (
    <a
      href={movie.url ?? urlUnknown}
      target="_blank"
      title={movie.title}
      class={"rating rating-" + movie.colorRating}
    >
      {movie.rating ?? "?"} %
    </a>
  );
};

export default Button;
