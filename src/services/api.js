import axios from "axios";
import axiosRetry from "axios-retry";
import pLimit from "p-limit";

const api = axios.create({
  baseURL: "https://sw-api.starnavi.io/",
  timeout: 10000,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) =>
    error.response &&
    (error.response.status === 429 || error.response.status >= 500),
});

const limit = pLimit(1);

const cache = new Map();

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await limit(() => api.get(url));
    cache.set(url, response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPeople = (page = 1) => fetchWithCache(`/people/?page=${page}`);
export const getFilm = (id) => fetchWithCache(`/films/${id}/`);
export const getStarship = (id) => fetchWithCache(`/starships/${id}/`);

export default api;
