import axiosInstance from '../axios/axios-base.service';
import wookieeToEnglish from '../data/data.service';
import * as actions from '../../actions';

const peopleService = (people, page, format = '') => dispatch => axiosInstance.get(`people/?search=${people}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    dispatch(actions.searchPeoplesAC(
      people,
      response.data.results,
      response.data.previous,
      response.data.next,
      page,
      format,
    ));
  }, () => {
    dispatch(actions.searchPeoplesFailed());
  });

export default peopleService;

