let apiTimings = [];

export const isSearchAllowedService = () =>  {
    let d = new Date();
    apiTimings.push(d.getTime());
    if(
        apiTimings.length > 15 && 
        sessionStorage.loggedInUser && 
        sessionStorage.loggedInUser !== 'Luke Skywalker' &&  
        ((apiTimings[15] - apiTimings[0])/1000)/60
    ) {
        return false;
    }
    return true
}