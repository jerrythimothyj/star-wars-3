import axios from '../axios/axios-base.service';

export const planetService = (planet) =>  {
    return axios.get('planets/?search=' + planet)
        .then(response => {
            if(response && 
                response.data && 
                response.data.results
            ) {
                return response.data.results;
            } else {
                return false;
            }
        }, error => {
            console.log(error);
            return false;
        })
}