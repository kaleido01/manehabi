import React, { Component, Fragment } from "react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";

export class Layout extends Component {
	render() {
		const currentUser = this.props.session.getCurrentUser
			? this.props.session.getCurrentUser
			: null;

		return (
			<Fragment>
				<Navbar currentUser={currentUser && currentUser} />

				<SideDrawer currentUser={currentUser} />
				<div>{this.props.children}</div>
			</Fragment>
		);
	}
}

export default Layout;
