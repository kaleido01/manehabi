import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Button } from "semantic-ui-react";
import Signout from "../Auth/Signout";
import "./SideDrawer.css";
import { UserContext } from "./../../index";

const SideDrawer = ({ onSide, onHide }) => {
	const currentUser = useContext(UserContext);
	return (
		<Sidebar
			as={Menu}
			animation="overlay"
			visible={onSide}
			icon="labeled"
			onHide={() => onHide(false)}
			vertical
			direction="top"
			inverted>
			<Menu.Item as="a">
				<Icon name="home" />
				home
			</Menu.Item>
			{currentUser ? (
				<Menu.Item>
					<Signout />
				</Menu.Item>
			) : (
				<Menu.Item>
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
				</Menu.Item>
			)}
		</Sidebar>
	);
};

export default SideDrawer;
