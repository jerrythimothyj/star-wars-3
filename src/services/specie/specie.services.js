import axios from '../axios/axios-base.service';


export const specieService = (specie, page) =>  {
    return axios.get('species/?search=' + specie  + '&page=' + page)
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