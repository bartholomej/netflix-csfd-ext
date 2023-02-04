export const getPageArtefacts = (): { domain: string, page: string | null } => {
  const url = window.location.href.split("/");
  const domain = url[2];
  const page = url[3];
  return { domain, page };
}

export const getCsfdId = (csfdLink: string): string => {
  const csfdParts = csfdLink.split('/');
  return csfdParts[csfdParts.length - 1];
};

export const insertAfter = (
  referenceNode: Element | null,
  newNode: HTMLElement
): void => {
  referenceNode?.parentNode?.insertBefore(
    newNode,
    referenceNode.previousSibling
  );
};
export const getCsfdLink = (): string | undefined => {
  return (
    document.querySelector(
      'a[href*="https://www.csfd.cz/film/"]'
    ) as HTMLAnchorElement | undefined
  )?.href;
}