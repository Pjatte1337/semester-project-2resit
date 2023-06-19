import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import Loader from '../assets/loader/loader.gif';
import clientConfig from '../client-config';
import AppContext from './context/AppContext';

const Login = () => {
  const [store, setStore] = useContext(AppContext);

  const [loginFields, setLoginFields] = useState({
    username: '',
    password: '',
    userNiceName: '',
    userEmail: '',
    loading: false,
    error: '',
  });

  const createMarkup = (data) => ({
    __html: data,
  });

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const siteUrl = clientConfig.siteUrl;

    const loginData = {
      username: loginFields.username,
      password: loginFields.password,
    };

    setLoginFields({ ...loginFields, loading: true });

    try {
      const response = await fetch(`${siteUrl}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok || typeof data.token === 'undefined') {
        throw new Error(data.message);
      }

      const { token, user_nicename, user_email } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('userName', user_nicename);

      setStore({
        ...store,
        userName: user_nicename,
        token: token,
      });

      setLoginFields({
        ...loginFields,
        loading: false,
        token: token,
        userNiceName: user_nicename,
        userEmail: user_email,
      });
    } catch (error) {
      setLoginFields({ ...loginFields, error: error.message, loading: false });
    }
  };

  const handleOnChange = (event) => {
    setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
  };

  const { username, password, error, loading } = loginFields;

  if (store.token) {
    return <Navigate to="/dashboard" noThrow />;
  } else {
    return (
      <>
        <Navbar />
        <div style={{ height: '100vh', maxWidth: '400px', margin: '0 auto' }}>
          <h4 className="mb-4">Login</h4>
          {error && <div className="alert alert-danger" dangerouslySetInnerHTML={createMarkup(error)} />}
          <form onSubmit={onFormSubmit}>
            <label className="form-group">
              Username:
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <label className="form-group">
              Password:
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <button className="btn btn-primary mb-3" type="submit">
              Login
            </button>
            {loading && <img className="loader" src={Loader} alt="Loader" />}
          </form>
        </div>
      </>
    );
  }
};

export default Login;
