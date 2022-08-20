export const getContent: (code: string) => string = (code: string) => {
  const tag = document.createElement("div");
  tag.innerHTML = code;
  return tag.textContent as string;
};
