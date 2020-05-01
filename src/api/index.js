const KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const baseURL = `https://api.unsplash.com/photos/`;

const fetchImages = async (page) => {
  const response = await fetch(`${baseURL}?client_id=${KEY}&per_page=6&page=${page}`);
  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.errors);
  }

  return data;
};

export { fetchImages };
