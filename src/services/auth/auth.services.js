import { getSessionStorageItem } from '../storage/storage.services';

const authUser = () => {
  if (!getSessionStorageItem('loggedInUser')) {
    return false;
  }
  return true;
};

export default authUser;
