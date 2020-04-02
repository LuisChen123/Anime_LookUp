import { fromJS } from 'immutable';
import { CHANGE_USER_LOGIN, STORE_USER_INFO } from './actionType';

const defaultState = fromJS({
  isLogin: true,
  userInfo: {}
});

export default (state = defaultState, action) => {
  if (action.type === CHANGE_USER_LOGIN) {
    return state.set('isLogin', action.value);
  }
  if (action.type === STORE_USER_INFO) {
    return state.set('userInfo', action.value);
  }
  return state;
};
