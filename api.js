// api.js
let API_KEY = "";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export const initAPI = async () => {
  const res = await fetch("config.json");
  const config = await res.json();
  API_KEY = config.TMDB_API_KEY;
};

export const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "ko-KR");

  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }

  const options = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
};
