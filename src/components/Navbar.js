import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/login/loginContext';
import { AlertContext } from '../context/alert/alertContext';
import { getCookieValue } from '../helpers';

export const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [logined, setLogined] = useState(getCookieValue('logined') === 'true' ? true : false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const login = useContext(LoginContext);
  const alert = useContext(AlertContext);

  const handleShowLogin = event => {
    event.preventDefault();

    setShowLogin(!showLogin);
  }

  const submitHandler = event => {
    event.preventDefault();

    if (formData.username.trim() && formData.password.trim()) {
      login.loginRequest({
        username: formData.username.trim(),
        password: formData.password.trim(),
      })
      .then((res) => {
        if (res.data.status !== 'error') {
          alert.show('You`re logined', 'success');
          setShowLogin(false);
          setLogined(true);

          const timestamp = new Date().getTime();
          const expires = timestamp + (3600 * 24 * 1000);

          document.cookie = `logined=true; expires=${expires}`;
          document.cookie = `token=${res.data.message.token}; expires=${expires}`;

          setTimeout(() => {
            alert.hide();
          }, 3000);
        } else {
          alert.show('Wrong username or password', 'danger');

          setTimeout(() => {
            alert.hide();
          }, 3000);
        }
      })
      .catch(() => {
        alert.show('Something went wrong', 'danger');

        setTimeout(() => {
          alert.hide();
        }, 3000);
      })

      setFormData({
        username: '',
        password: '',
      });
    } else if (!formData.username.trim()) {
      alert.show('Please enter username');

      setTimeout(() => {
        alert.hide();
      }, 3000);
    } else {
      alert.show('Please enter password');

      setTimeout(() => {
        alert.hide();
      }, 3000);
    }
  }

  const handleLogout = event => {
    event.preventDefault();

    document.cookie = 'logined=false;';
    document.cookie = 'token=0';

    login.loginRequest({
      username: '',
      password: '',
    }).then(res => {
      setShowLogin(true);
      setLogined(false);
    })
    .catch(() => {
      alert.show('Something went wrong', 'danger');
    })
  }

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
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