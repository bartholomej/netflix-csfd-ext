import { CSFDMovie } from "node-csfd-api/types/interfaces/movie.interface";
import type { Component } from "solid-js";
import Attribution from "./Attribution";
import Button from "./Button";
import "./Csfd.scss";
import { Spinner } from "./Spinner";

const Csfd: Component<CSFDMovie> = (movie) => {
  return (
    <>
      {!movie.id && <Spinner />}
      <div class="csfd-ext-header">
        <h2 class="csfd-ext-title">{movie.title}</h2>
        <Button {...movie}></Button>
      </div>
      <p>
        <em>{movie.genres.join(", ")}</em>
        <br />
        <em>{movie.origins.join(", ")}</em>, <em>{movie.year}</em>
      </p>
      <p class="preview-modal-synopsis previewModal--text">
        {movie.descriptions[0]}
      </p>
      <Attribution />
      <hr />
    </>
  );
};

export default Csfd;
