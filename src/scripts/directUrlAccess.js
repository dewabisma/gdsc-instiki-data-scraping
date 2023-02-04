const fetchSiteHTML = async (url = "") => {
  if (!url) return null;

  try {
    const response = await fetch(url);
    const data = await response.text();

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export { fetchSiteHTML };
