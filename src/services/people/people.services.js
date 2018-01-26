import axiosInstance from '../axios/axios-base.service';
import wookieeToEnglish from '../data/data.service';
import * as actions from '../../actions';

export const peopleService = (people, page, format = '') => dispatch => axiosInstance.get(`people/?search=${people}&page=${page}&format=${format}`)
  .then((response) => {
    response.data = wookieeToEnglish(response.data);
    if (response &&
                response.data &&
                response.data.results
    ) {
      dispatch(actions.searchPeoplesAC(people, response.data.results, response.data.previous, response.data.next, page, format));
    } else { dispatch(actions.searchPeoplesFailed()); }
    // return false;
  }, (error) => {
    console.log(error);
    dispatch(actions.searchPeoplesFailed());
  });

export default peopleService;

