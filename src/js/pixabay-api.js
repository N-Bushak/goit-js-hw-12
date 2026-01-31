import axios from "axios";

const API_KEY = '54451252-acf2605b3a5875783ea2964a1'; 
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return axios.get(BASE_URL, { params: searchParams })
    .then(response => response.data); 
}