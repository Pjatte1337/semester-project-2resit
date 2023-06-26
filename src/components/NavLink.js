// Import React
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = (props) => (
  <RouterNavLink
    {...props}
    activeclassname="active"
    className="nav-link"
    exact={props.exact ? "true" : undefined}
  />
);

export default NavLink;
