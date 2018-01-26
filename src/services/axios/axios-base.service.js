import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://swapi.co/api/',
});
