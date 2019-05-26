import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ApolloConsumer } from "react-apollo";

const handleLogout = (client, history) => {
	localStorage.removeItem("token");
	client.resetStore();
	history.push("/signin");
};

const Signout = ({ history }) => {
	return (
		<ApolloConsumer>
			{client => {
				return (
					<Button color="purple" onClick={() => handleLogout(client, history)}>
						Logout
					</Button>
				);
			}}
		</ApolloConsumer>
	);
};

export default withRouter(Signout);
