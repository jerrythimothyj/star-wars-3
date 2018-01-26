import axios from '../axios/axios-base.service';
import wookieeToEnglish from '../data/data.service';
import * as actions from '../../actions';


const planetService = (planet, page, format = '') => dispatch => axios.get(`planets/?search=${planet}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    if (response &&
                response.data &&
                response.data.results
    ) {
      dispatch(actions.searchPlanetsAC(planet, response.data.results, response.data.previous, response.data.next, page, format));
    } else { dispatch(actions.searchPlanetsFailed()); }
  }, (error) => {
    console.log(error);
    dispatch(actions.searchPlanetsFailed());
  });

export default planetService;
