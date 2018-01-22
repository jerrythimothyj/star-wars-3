import axios from '../axios/axios-base.service';


export const planetService = (planet, page) =>  {
    return axios.get('planets/?search=' + planet  + '&page=' + page)
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