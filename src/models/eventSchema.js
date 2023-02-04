const createStikiEvent = (
  constructor = { title: "", category: "", date: "", url: "", img: "" }
) => {
  if (
    !constructor.title ||
    !constructor.category ||
    !constructor.date ||
    !constructor.url ||
    !constructor.img
  )
    return null;

  const stikiEvent = { ...constructor };

  return stikiEvent;
};

export default createStikiEvent;
