// function for get authors
import { handleResponse, handleError } from "./apiUtils.jsx";
const baseUrl = process.env.API_URL + "/authors/";
// fetch is a promise based api, which is why .then and .catch are used
export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
