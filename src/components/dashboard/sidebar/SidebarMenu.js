import React, { useContext } from 'react';
import NavLink from "../../NavLink";
import AppContext from "../../context/AppContext";
import PostMenu from "./menus/PostMenu";

const SidebarMenu = () => {

	const [ store ] = useContext( AppContext );

	return (

			<nav id="sidebar" className={ store.sidebarActive ? 'active' : '' }>
				<div className="sidebar-header">
					<NavLink to={ `/dashboard ` }>Semester Project</NavLink>
				</div>

				<ul className="list-unstyled components">
					<PostMenu/>
				</ul>
			</nav>

	)
};

export default SidebarMenu;