import axios from '../axios/axios-base.service';
import wookieeToEnglish from '../data/data.service';
import * as actions from '../../actions';


const specieService = (specie, page, format = '') => dispatch => axios.get(`species/?search=${specie}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    dispatch(actions.searchSpeciesAC(
      specie,
      response.data.results,
      response.data.previous,
      response.data.next,
      page,
      format,
    ));
  }, () => {
    dispatch(actions.searchSpeciesFailed());
  });

export default specieService;
