export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentuser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
