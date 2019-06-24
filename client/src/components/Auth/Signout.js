import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Responsive, Icon, Menu } from "semantic-ui-react";
import { ApolloConsumer } from "react-apollo";

const handleLogout = (client, history) => {
	localStorage.removeItem("token");
	client.resetStore();
	history.push("/signin");
};

const Signout = ({ history, color, inverted }) => {
	return (
		<ApolloConsumer>
			{client => {
				return (
					<Fragment>
						<Responsive as={Menu.Item} minWidth={768}>
							<Button
								color={color ? color : "purple"}
								inverted={inverted}
								onClick={() => handleLogout(client, history)}>
								Logout
							</Button>
						</Responsive>
						<Responsive
							as={Menu.Item}
							maxWidth={767}
							inverted={inverted}
							onClick={() => handleLogout(client, history)}>
							<Icon name="external alternate" />
							Logout
						</Responsive>
					</Fragment>
				);
			}}
		</ApolloConsumer>
	);
};

export default withRouter(Signout);
