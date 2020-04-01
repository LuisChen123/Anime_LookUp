import { CHANGE_USER_LOGIN, STORE_USER_INFO } from './actionType';

export const getUserLogin = value => ({
  type: CHANGE_USER_LOGIN,
  value
});

export const handleStoreUserInfo = value => ({
  type: STORE_USER_INFO,
  value
});
