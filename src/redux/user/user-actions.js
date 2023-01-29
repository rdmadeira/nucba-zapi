export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const TOGGLE_USERMENU_HIDDEN = 'TOGGLE_USERMENU_HIDDEN';

export const setCurrentuser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const toggleUserMenuHidden = () => ({
  type: TOGGLE_USERMENU_HIDDEN,
});
