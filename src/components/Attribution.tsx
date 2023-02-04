import type { Component } from "solid-js";
import { ATTRIBUTION_URL } from "../vars";
import "./Attribution.scss";

const Attribution: Component = () => {
  return (
    <a
      href={ATTRIBUTION_URL}
      target="_blank"
      class="csfd-ext-attribution"
      title={chrome.i18n.getMessage("notOfficial")}
    >
      {chrome.i18n.getMessage("attribution")}
    </a>
  );
};

export default Attribution;
