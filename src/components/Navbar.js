import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from "./functions";
import AppContext from "./context/AppContext";
import logoImage from "../assets/img/logo.png";
import "../style/Navbar.css";

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
    <nav className="navbar">
      <NavLink to="/" exact className="navbar-brand">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </NavLink>
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        {isLoggedIn() ? (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/profile/posts">All Posts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile/create-post">Create Post</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <a href="/" onClick={handleLogout}>Logout</a>
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
