import React, { useState, Fragment } from "react";
import { Sidebar } from "semantic-ui-react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
	const [onSide, setOnSide] = useState(false);
	return (
		<Fragment>
			<Navbar onSide={setOnSide} />
			<div className="Layout">{children}</div>
			<SideDrawer onSide={onSide} onHide={setOnSide} />
		</Fragment>
	);
};

export default Layout;
