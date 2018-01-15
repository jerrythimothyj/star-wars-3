import axios from '../axios/axios-base.service';

export const loginService = (username, password) =>  {
    return axios.get('people/?search=' + username)
        .then(response => {
            if(response && 
                response.data && 
                response.data.results && 
                response.data.results.length === 1 && 
                response.data.results[0].name === username && 
                response.data.results[0].birth_year === password
            ) {
                sessionStorage.setItem('loggedInUser', response.data.results[0].name);
                return true;
            } else {
                return false;
            }
        }, error => {
            console.log(error);
            return false;
        })
}

export const logout = () => {
    sessionStorage.removeItem('loggedInUser')
}