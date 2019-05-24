import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";

const Navbar = () => {
	return <AuthNav />;
};

const AuthNav = props => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Menu.Item link as={NavLink} to="/habits" name="habit" />
			<Menu.Item link as={NavLink} to="/profile" name="profile" />
			<Menu.Item>
				<Button color="purple">Logout</Button>
			</Menu.Item>
		</Menu>
	);
};

const UnAuthNav = () => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Menu.Item link as={NavLink} to="/habits" name="habit" />
			<Menu.Item link as={NavLink} to="/profile" name="profile" />
			<Menu.Item>
				<Button color="purple">Signin</Button>
			</Menu.Item>
			<Menu.Item>
				<Button color="purple">Signup</Button>
			</Menu.Item>
		</Menu>
	);
};
export default Navbar;
