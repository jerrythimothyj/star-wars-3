export const setSessionStorageItem = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key) => {
  window.sessionStorage.removeItem(key);
};

export const getSessionStorageItem = key => window.sessionStorage.getItem(key);
