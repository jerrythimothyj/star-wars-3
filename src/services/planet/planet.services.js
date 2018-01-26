import { axiosInstance } from '../axios/axios-base.service';
import { wookieeToEnglish } from '../data/data.service';

export const planetService = (planet, page, format = '') => dispatch => axiosInstance.get(`planets/?search=${planet}&page=${page}&format=${format}`)
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
