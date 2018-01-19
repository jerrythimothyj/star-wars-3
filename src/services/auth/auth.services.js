import { getSessionStorageItem } from '../storage/storage.services';

export const authUser = () =>  {
    if(!getSessionStorageItem('loggedInUser')) {
        return false
    }
    return true;
}