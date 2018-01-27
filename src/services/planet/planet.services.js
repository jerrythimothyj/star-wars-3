import axiosInstance from '../axios/axios-base.service';
import wookieeToEnglish from '../data/data.service';
import * as actions from '../../actions';

const planetService = (planet, page, format = '') => dispatch => axiosInstance.get(`planets/?search=${planet}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    dispatch(actions.searchPlanetsAC(
      planet,
      response.data.results,
      response.data.previous,
      response.data.next,
      page,
      format,
    ));
  }, () => {
    dispatch(actions.searchPlanetsFailed());
  });

export default planetService;
