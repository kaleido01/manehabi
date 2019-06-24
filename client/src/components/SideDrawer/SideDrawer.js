import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, Icon, Button, Responsive } from "semantic-ui-react";
import Signout from "../Auth/Signout";
import "./SideDrawer.css";
import { UserContext } from "./../../index";

const SideDrawer = () => {
	const currentUser = useContext(UserContext);
	return (
		<Responsive maxWidth={767}>
			<Sidebar
				as={Menu}
				animation="overlay"
				visible={true}
				icon="labeled"
				direction="bottom"
				size="mini"
				fluid
				widths={currentUser ? 6 : 3}
				inverted>
				<Menu.Item as={NavLink} to="/habits">
					<Icon name="home" />
					Habits
				</Menu.Item>
				{currentUser ? (
					<Fragment>
						<Menu.Item as={NavLink} to="/myhabits">
							<Icon name="tasks" />
							MyHabits
						</Menu.Item>
						<Menu.Item as={NavLink} to="/favorites">
							<Icon name="star" />
							Favorites
						</Menu.Item>
						<Menu.Item as={NavLink} to="/newhabit">
							<Icon name="pencil alternate" />
							New
						</Menu.Item>
						<Menu.Item as={NavLink} to="/profile">
							<Icon name="user" />
							Profile
						</Menu.Item>
						<Signout color="black" inverted={true} />
					</Fragment>
				) : (
					<Fragment>
						<Menu.Item as={NavLink} to="/signin">
							<Icon name="sign-in" />
							Signin
						</Menu.Item>
						<Menu.Item as={NavLink} to="/signup">
							<Icon name="signup" />
							Signup
						</Menu.Item>
					</Fragment>
				)}
			</Sidebar>
		</Responsive>
	);
};

export default SideDrawer;
