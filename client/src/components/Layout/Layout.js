import React, { Component, Fragment } from "react";
import SideDrawer from "./../SideDrawer/SideDrawer";

export class Layout extends Component {
	render() {
		return (
			<Fragment>
				<SideDrawer />
				<div>{this.props.children}</div>
			</Fragment>
		);
	}
}

export default Layout;
