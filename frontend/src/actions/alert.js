import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  // Quitar el mensaje despues de 5s
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};