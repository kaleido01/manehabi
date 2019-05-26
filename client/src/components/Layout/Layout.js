import React, { Fragment, useState } from "react";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Navbar from "./../Navbar/Navbar";

const Layout = ({ session, children }) => {
	const [onSide, setOnSide] = useState(false);
	const currentUser = session ? session.getCurrentUser : null;

	return (
		<Fragment>
			<Navbar currentUser={currentUser} onSide={setOnSide} />

			<SideDrawer
				currentUser={currentUser}
				onSide={onSide}
				onHide={setOnSide}
			/>
			<div>{children}</div>
		</Fragment>
	);
};

export default Layout;
