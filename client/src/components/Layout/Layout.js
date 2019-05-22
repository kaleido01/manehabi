import React, { Component, Fragment } from "react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";

export class Layout extends Component {
	render() {
		return (
			<Fragment>
				<Navbar />

				<SideDrawer />
				<div>{this.props.children}</div>
			</Fragment>
		);
	}
}

export default Layout;
