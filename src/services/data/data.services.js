import axios from 'axios';

export const getData = (apiPath) => {
    return axios.get(apiPath)
                .then(response => {
                    if(response && 
                        response.data
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

export const getValue = (apiPath, key) => {
    return getData(apiPath).then(response => {
        return response
    })
    .then(function(parsedData) {
        return parsedData[key];
    });
}