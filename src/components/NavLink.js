import React from 'react';
import { Link } from 'react-router-dom';


const NavLink = (props) => (
  <Link
    {...props}
    getProps={() => ({})}
    className="nav-link"
  />
);

export default NavLink;
