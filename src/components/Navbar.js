import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from "./functions";
import AppContext from "./context/AppContext";
import logoImage from "../assets/img/logo.png";

const Navbar = () => {
  const [store, setStore] = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('useName');

    setStore({
      ...store,
      token: '',
      useName: ''
    });
    window.location.href = '/';
  };

  return (
    <nav className="navbar my-navbar navbar-expand-lg main-navbar">
      <NavLink to="/" exact className="navbar-brand">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </NavLink>
      <ul className="navbar-nav my-navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        {isLoggedIn() ? (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-primary mb-3" type="submit">Logout</button>
            </li>
          </React.Fragment>
        ) : (
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
