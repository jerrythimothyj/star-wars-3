import axios from '../axios/axios-base.service';


export const peopleService = (people, page) =>  {
    return axios.get('people/?search=' + people  + '&page=' + page)
        .then(response => {
            if(response && 
                response.data && 
                response.data.results
            ) {
                return response.data
            } else {
                return false;
            }
        }, error => {
            console.log(error);
            return false;
        })
}