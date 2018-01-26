import axios from '../axios/axios-base.service';
import { wookieeToEnglish } from '../data/data.service.js';


export const specieService = (specie, page, format = 'wookiee') => axios.get(`species/?search=${specie}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    if (response &&
                response.data &&
                response.data.results
    ) {
      return response.data;
    }
    return false;
  }, (error) => {
    console.log(error);
    return false;
  });

