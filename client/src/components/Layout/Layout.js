import React, { Fragment, useState, useRef } from "react";
import { Sidebar, Ref } from "semantic-ui-react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ session, children }) => {
	const [onSide, setOnSide] = useState(false);
	const segmentRef = useRef();
	return (
		<Sidebar.Pushable>
			<Navbar onSide={setOnSide} />

			<SideDrawer onSide={onSide} onHide={setOnSide} ref={segmentRef} />

			<Ref innerRef={segmentRef}>
				<div className="Layout">{children}</div>
			</Ref>
		</Sidebar.Pushable>
	);
};

export default Layout;
