import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Button, Responsive } from "semantic-ui-react";

import Signout from "../Auth/signout";

const Navbar = ({ currentUser }) => {
	return currentUser ? <AuthNav /> : <UnAuthNav />;
};

const AuthNav = props => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habit" />
				<Menu.Item link as={NavLink} to="/profile" name="profile" />
				<Menu.Item>
					<Signout />
				</Menu.Item>
			</Responsive>
			<Responsive
				as={Menu.Item}
				position="right"
				icon="bars"
				{...Responsive.onlyMobile}
			/>
		</Menu>
	);
};

const UnAuthNav = () => {
	return (
		<Menu color="orange" inverted>
			<Menu.Item>
				<img src="#" alt="Logo" />
			</Menu.Item>
			<Responsive
				as={Menu.Menu}
				position="right"
				minWidth={Responsive.onlyTablet.minWidth}>
				<Menu.Item link as={NavLink} to="/habits" name="habit" />
				<Menu.Item link as={NavLink} to="/profile" name="profile" />
				<Menu.Item>
					<Button color="purple" as={Link} to="/signin">
						Signin
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Button color="purple" as={Link} to="/signup">
						Signup
					</Button>
				</Menu.Item>
			</Responsive>
			<Responsive
				as={Menu.Item}
				position="right"
				icon="bars"
				{...Responsive.onlyMobile}
			/>
		</Menu>
	);
};
export default Navbar;
