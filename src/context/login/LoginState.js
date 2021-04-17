import React, { useReducer } from 'react';
import { LOGIN } from '../types';
import { LoginContext } from './loginContext';
import { loginReducer } from './loginReducer';
import axios from 'axios';
import { getCookieValue } from '../../helpers';
import { API_URL, developer } from '../../constants';

export const LoginState = ({ children }) => {
  const logined = getCookieValue('logined') === 'true' ? true : false;
  const initialState = {
    status: logined,
    token: logined ? getCookieValue('token') : '',
  }
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const loginRequest = async (requestData) => {
    const form = new FormData();

    form.append('username', requestData.username);
    form.append('password', requestData.password);

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/login?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      });
      
      const payload = {
        status: res.data.status === 'ok',
        token: res.data.message.token,
      }
      
      dispatch({ type: LOGIN, payload })
      return res;
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return (
    <LoginContext.Provider value={{
      loginRequest,
      status: state.status,
      token: state.token
    }}>
      {children}
    </LoginContext.Provider>
  );
}