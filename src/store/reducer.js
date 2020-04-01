import { CHANGE_USER_LOGIN, STORE_USER_INFO } from './actionType';

const defaultState = {
  isLogin: false,
  userInfo: {}
};

export default (state = defaultState, action) => {
  if (action.type === CHANGE_USER_LOGIN) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.isLogin = action.value;
    return newState;
  }
  if (action.type === STORE_USER_INFO) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.userInfo = action.value;
    return newState;
  }
  return state;
};
