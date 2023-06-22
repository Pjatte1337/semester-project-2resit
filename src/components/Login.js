import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import Loader from '../assets/loader/loader.gif';
import clientConfig from '../client-config';
import AppContext from './context/AppContext';
import "../components/style/Login.css";
import Footer from './Footer';

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
        <div className="center">
          <h1>Welcome Back</h1>
          <p>Login to share your knowledge with the world</p>
        </div>
        <div className="login-card">
          <div className="login-card-body">
            <h4 className="login-card-title mb-4">Login</h4>
            {error && <div className="alert alert-danger" dangerouslySetInnerHTML={createMarkup(error)} />}
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                />
              </div>
              <button className="btn btn-primary mb-3" type="submit">
                Login
              </button>
              {loading && <img className="loader" src={Loader} alt="Loader" />}
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Login;
