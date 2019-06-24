import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Button, Responsive, Image } from "semantic-ui-react";
import logo from "../../image/logo.png";

import Signout from "../Auth/Signout";
import { UserContext } from "./../../index";
import "./Navbar.css";

const Navbar = () => {
	const currentUser = useContext(UserContext);

	return currentUser ? <AuthNav /> : <UnAuthNav />;
};

const AuthNav = () => {
	return (
		<Menu color="orange" inverted className="Navbar">
			<Menu.Item>
				<Image src={logo} size="mini" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habits" />
				<Menu.Item link as={NavLink} to="/myhabits" name="my habits" />
				<Menu.Item link as={NavLink} to="/favorites" name="my favorites" />
				<Menu.Item link as={NavLink} to="/newhabit" name="newHabit" />
				<Menu.Item link as={NavLink} to="/profile" name="profile" />
				<Menu.Item>
					<Signout />
				</Menu.Item>
			</Responsive>
		</Menu>
	);
};

const UnAuthNav = ({ onSide }) => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<Image src={logo} size="mini" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habit" />
				<Menu.Item>
					<Button as={Link} to="/signin" inverted>
						Signin
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Button as={Link} to="/signup" inverted>
						Signup
					</Button>
				</Menu.Item>
			</Responsive>
		</Menu>
	);
};
export default Navbar;
