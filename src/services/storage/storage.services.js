export const setSessionStorageItem = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const removeSessionStorageItem = (key) => {
    sessionStorage.removeItem('loggedInUser')
}

export const getSessionStorageItem = (key) => {
    return sessionStorage.getItem('loggedInUser')
}