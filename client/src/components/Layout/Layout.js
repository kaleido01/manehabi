import React, { useState, Fragment } from "react";
import { Sidebar } from "semantic-ui-react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
	return (
		<Fragment>
			<Navbar />
			<div className="Layout">{children}</div>
			<SideDrawer />
		</Fragment>
	);
};

export default Layout;
