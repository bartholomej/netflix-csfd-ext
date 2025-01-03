export const getTitleAndYear = async (): Promise<{ title: string | null; year: string | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const title = (document.querySelector('.storyArt.detail-modal img') as HTMLImageElement)?.alt ?? null;
      const year = document.querySelector('.year')?.textContent ?? null;
      resolve({ title, year });
    }, 500); // This is a hack to wait for the DOM to load
  });
}

export const calculateSeries = (): boolean | undefined => {
  const duration = document?.querySelector(".videoMetadata--container .duration")?.textContent;

  const isSeries =
    duration?.includes("Seasons") ||
    duration?.includes("Episodes") ||
    duration?.includes("Series") ||
    duration?.includes("Parts") ||
    duration?.includes("Volumes");
  return isSeries;
}

export const getButtonRootElements = (): { root: HTMLElement, placingNode: Element | null } => {
  // const placingNode = document.querySelector(".buttonControls--container");
  const placingNode = document.querySelector(".preview-modal-synopsis");
  const root = document.createElement("div");
  root.id = "csfd-ext";
  return { root, placingNode };
}
