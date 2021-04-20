import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_URL, developer } from '../constants';
import { getCookieValue } from '../helpers';
import { hideAlert, loginRequest, showAlert } from '../redux/actions';

export const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const [logined, setLogined] = useState(getCookieValue('logined'));
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleShowLogin = event => {
    event.preventDefault();

    setShowLogin(!showLogin);
  }

  const submitHandler = event => {
    event.preventDefault();

    if (formData.username.trim() && formData.password.trim()) {
      const form = new FormData();

      form.append('username', formData.username);
      form.append('password', formData.password);

      axios({
        method: "post",
        url: `${API_URL}/login?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => {
        if (res.data.status !== 'error') {
          dispatch(showAlert('You`re logined', 'success'))
          setShowLogin(false);
          setLogined(true);
          dispatch(loginRequest(res));

          const timestamp = new Date().getTime();
          const expires = timestamp + (3600 * 24 * 1000);

          document.cookie = `logined=true; expires=${expires}`;
          document.cookie = `token=${res.data.message.token}; expires=${expires}`;

          setTimeout(() => {
            dispatch(hideAlert())
          }, 3000);
        } else {
          dispatch(showAlert('Wrong username or password', 'danger'));

          setTimeout(() => {
            dispatch(hideAlert())
          }, 3000);
        }
      });

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);

      setFormData({
        username: '',
        password: '',
      });
    } else if (!formData.username.trim()) {
      dispatch(showAlert('Please enter username'));

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);
    } else {
      dispatch(showAlert('Please enter password'));

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);
    }
  }

  const handleLogout = event => {
    event.preventDefault();

    document.cookie = 'logined=;';
    document.cookie = 'token=';

    const form = new FormData();

    form.append('username', '');
    form.append('password', '');

    axios({
      method: "post",
      url: `${API_URL}/login?${developer}`,
      data: form,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    }).then(res => {
      setShowLogin(true);
      setLogined(false);
      dispatch(loginRequest(res));
    })
      .catch(() => {
        dispatch(showAlert('Something went wrong', 'danger'));
      })
  }

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container d-flex justify-content-between">
          <div className="navbar-brand">
            Tasks App
          </div>
          { !logined ?
            <button type="button" onClick={handleShowLogin} className="btn btn-outline-light">Login</button> :
            <button type="button" onClick={handleLogout} className="btn btn-outline-light">Logout</button>
          }
        </div>
      </nav>
      { showLogin &&
        <div className="container pt-3">
          <h2>Auth</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })} />
            </div>
            <div className="form-group">
              <input type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn btn-outline-success">Login</button>
            <hr />
          </form>
        </div>
      }
    </>
  )
}