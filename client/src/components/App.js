import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Homepage from "./Homepage/Homepage";
import signin from "./Auth/signin";
import signup from "./Auth/signup";
import Navbar from "./Navbar/Navbar";
import Habit from "./Habit/Habit";
import Profile from "./Profile/Profile";
import HabitDescription from "./Habit/HabitDescription";
import { Layout } from "./Layout/Layout";

export class App extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path="/" component={Homepage} />
				</Switch>
				<Layout>
					<Route
						path="/(.+)"
						render={() => (
							<div>
								<Navbar />
								<Container className="main">
									<Switch>
										<Route path="/signup" component={signup} />
										<Route path="/signin" component={signin} />
										<Route path="/habit/:id" component={HabitDescription} />
										<Route path="/habit" component={Habit} />
										<Route path="/profile/:id" component={Profile} />
										<Redirect component="habit" />
									</Switch>
								</Container>
							</div>
						)}
					/>
				</Layout>
			</Fragment>
		);
	}
}

export default App;
